<script setup lang="ts">
const props = defineProps({
  idDetail: {
    required: true,
    type: String,
  },
});

const responseMessage = ref("");
const responseId = ref("");
const facName = ref("");

const isFasilitator = ref<boolean>(false);
const isKodeNotFound = ref<boolean>(false);
const isKodeFound = ref<boolean>(false);

const querySearch = ref("");

const route = useRoute();
const submissionId = (route.params as any).id as string;

const foundFasilitator = ref("");

const suratPermohonan = ref(null);
const suratPernyataan = ref(null);

const onSelectFasilitator = (selectedId: string) => {
  if ((isFasilitator.value = selectedId === "Lainnya")) {
    onSearchFasilitator(querySearch.value);
    return;
  }
  isKodeFound.value = false;
};

const getDownloadForm = async (docName: string) => {
  const result: any = await $api(
    `/self-declare/submission/${submissionId}/file`,
    {
      method: "get",
      query: {
        document: docName,
      },
    }
  );

  if (result.code === 2000) {
    if (docName === "surat-permohonan") {
      suratPermohonan.value = result.data.file;
      return result;
    } else {
      suratPernyataan.value = result.data.file;
      return result;
    }
  }
};
const responseType = computed(() => {
  return responseMessage.value == "Kode Fasilitasi dapat digunakan"
    ? "success"
    : "error";
});

const responseColor = computed(() => {
  return responseMessage.value == "Kode Fasilitasi dapat digunakan"
    ? "#5CB338"
    : "#FB4141";
});

const submissionDetail = reactive({
  id_reg: null,
  jenis_pengajuan: null,
  id_jenis_pengajuan: null,
  tanggal_buat: null,
  nama_pj: null,
  alamat_pu: null,
  jabatan_pj: null,
  nomor_kontak_pj: null,
  nama_pu: null,
});

const onSearchFasilitator = async () => {
  try {
    facName.value = "";
    const kode = querySearch.value;

    const response: any = await $api("/self-declare/submission/kode", {
      method: "post",
      body: {
        kode,
        id_reg: submissionId,
      },
    });

    if (response.message === "Kode Fasilitasi dapat digunakan") {
      isKodeFound.value = true;
      isKodeNotFound.value = false;
      responseMessage.value = "";
      responseId.value = response.data[0].id;
      facName.value = response.data[0].name;
      console.log("ressponde id", response.data[0].id);
      console.log("responseId ", responseId);
      // formData.id_fasilitator = responseId.value;
      console.log("id fasilitator ", formData.id_fasilitator);
    } else if (response.message === "Kuota habis") {
      facName.value = response.data[0].name;
    } else {
      responseMessage.value = response.message;
      isKodeFound.value = false;
      isKodeNotFound.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

const formData = reactive({
  id_reg: null,
  jenis_pendaftaran: null,
  id_jenis_pengajuan: null,
  kode_daftar: null,
  no_mohon: null,
  tgl_surat_permohonan: null,
  tgl_mohon: null,
  jenis_layanan: null,
  jenis_produk: null,
  id_jenis_layanan: null,
  id_jenis_produk: null,
  id_fasilitator: null,
  nama_pu: null,
  area_pemasaran: null,
  lokasi_pendamping: "Provinsi",
  lembaga_pendamping: null,
  id_lembaga_pendamping: null,
  pendamping: null,
  id_pendamping: null,
  asal_usaha: null,
});
const facId = ref("");
const getDetail = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${submissionId}/detail-pengajuan`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      const { data } = response || {};
      const {
        tgl_daftar,
        nama_pj,
        nomor_kontak_pj,
        id_jenis_layanan,
        nama_pu,
        pendamping,
        area_pemasaran,
        id_lembaga_pendamping,
        id_product,
        lokasi_pendamping,
        jenis_pendaftaran,
        fac_id,
        no_surat_permohonan,
        id_pendamping,
      } = data || {};
      facId.value = response.data.fac_id;
      submissionDetail.id_reg = response.data.id_reg;
      submissionDetail.id_jenis_pengajuan = response.data.jenis_pendaftaran;
      submissionDetail.tanggal_buat = formatDate(tgl_daftar) as any;
      submissionDetail.nama_pj = nama_pj;
      submissionDetail.nomor_kontak_pj = nomor_kontak_pj;
      formData.tgl_surat_permohonan = formatToISOString(tgl_daftar) as any;
      querySearch.value = response.data.kode_fac;
      formData.id_jenis_layanan = id_jenis_layanan;
      formData.id_jenis_produk = id_product;
      formData.nama_pu = nama_pu;
      formData.area_pemasaran = area_pemasaran;
      formData.id_lembaga_pendamping = response.data.id_lembaga_pendamping;
      formData.id_pendamping = response.data.id_pendamping;
      formData.id_jenis_pengajuan = jenis_pendaftaran;
      formData.id_fasilitator = response.data.fac_id;
      formData.no_mohon = no_surat_permohonan;
      formData.lokasi_pendamping = lokasi_pendamping;
      if (formData.id_fasilitator == "00000000-0000-0000-0000-000000000000") {
        formData.id_fasilitator = null;
      }
    }
    return response;
  } catch (error: any) {
    // Tangani error
    console.error("Error fetching detail:", error.message || error);
    throw error; // Opsional: Lempar ulang error jika perlu
  }
};

const handleGetListPendaftaran = async () => {
  try {
    const res: any = await $api(`/master/jenis-pendaftaran`, {
      method: "get",
    });

    if (res.length) {
      listPendaftaran.value = res;
      return res;
    }
  } catch (err) {}
};

const listPendaftaran = ref([]);
const findListDaftar = (kode: string) => {
  const data = listPendaftaran.value.find((code: any) => kode == code.code);
  if (data == undefined) return { code: null, name: "-" };
  return data;
};
const findListFasilitator = (fac_id: string) => {
  const data = listPendaftaran.value.find((list: any) => fac_id == list.id);
  return data;
};

const listFasilitasi = ref([]);
const listLayanan = ref([]);
const listProduk = ref([]);
const handleGetFasilitator = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/submission/list-fasilitator`,
      {
        method: "get",
        query: {
          reg_id: props.idDetail,
          lokasi: "Kabupaten",
        },
      }
    );

    if (response.code === 2000) {
      listFasilitasi.value = response.data;
      listFasilitasi.value.push({
        id: "Lainnya",
        name: "Lainnya",
      });
      return response;
    }
    return response;
  } catch (err) {}
};

const handleGetJenisLayanan = async () => {
  try {
    const res: any = await $api(`/master/jenis-layanan`, {
      method: "get",
    });

    if (res.length) {
      listLayanan.value = res;
      return res;
    }
  } catch (err) {}
};

const handleGetJenisProduk = async () => {
  try {
    const res: any = await $api(`/master/products`, {
      method: "get",
    });

    if (res.length) {
      listProduk.value = res;
      return res;
    }
  } catch (error) {}
};

const lembagaPendamping = ref([]);
const listPendamping = ref([]);

const loadDataPendamping = async (lokasi: string | null) => {
  if (lokasi) {
    await handleGetLembagaPendamping(lokasi);
  }
};
const handleGetPendamping = async (idLembaga: string | null) => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-pendamping",
      {
        method: "get",
        query: {
          id_lembaga: idLembaga,
           lokasi: formData.lokasi_pendamping,
                    id_reg: submissionId,
        },
      }
    );
    //console.log("isi list", listPendamping.value);
    if (response.code === 2000) {
      if (response.data !== null) listPendamping.value = response.data;
      //console.log("isi list", listPendamping.value);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleGetLembagaPendampingInitial = async (lokasi: string) => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-lembaga-pendamping",
      {
        method: "get",
        query: {
          id_reg: submissionId,
          lokasi,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null) lembagaPendamping.value = response.data;
    }

    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      error?.errors?.list_error[0] || "Ada kesalahan",
      "error"
    );
    console.log(error);
  }
};

const handleUpdateSubmission = async () => {
  try {
    if (isKodeFound.value === true) {
      console.log("id fasilitator submit", formData.id_fasilitator);
      console.log("responseid submit", responseId.value);
    } else {
      responseId.value = formData.id_fasilitator;
    }

    const response: any = await $api(
      "/self-declare/business-actor/submission/update",
      {
        method: "put",
        body: {
          id_reg: submissionId,
          jenis_pendaftaran: formData.id_jenis_pengajuan,
          kode_daftar: formData.id_fasilitator,
          fac_id: facId.value,
          no_surat_permohonan: formData.no_mohon,
          tgl_surat_permohonan: new Date(formData.tgl_surat_permohonan),
          jenis_layanan: formData.id_jenis_layanan,
          jenis_produk: formData.id_jenis_produk,
          nama_usaha: formData.nama_pu,
          area_pemasaran: formData.area_pemasaran,
          lokasi_pendamping: formData.lokasi_pendamping,
          lembaga_pendamping: formData.id_lembaga_pendamping,
          pendamping: formData.id_pendamping,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null)
        useSnackbar().sendSnackbar("Berhasil mengubah data", "success");
    }

    return response;
  } catch (error) {
    console.log(error, "error");
    useSnackbar().sendSnackbar("Gagal mengubah data", "error");
  }
};

onMounted(async () => {
  // await Promise.all([
  await getDetail();
  await handleGetListPendaftaran();
  await handleGetJenisLayanan();
  await handleGetJenisProduk();
  handleGetLembagaPendampingInitial(formData.lokasi_pendamping);
  // handleDetailPengajuan();
  // await loadDataPendamping(formData.lokasi_pendamping);
  await getDownloadForm("surat-permohonan");
  await getDownloadForm("surat-pernyataan");
  await handleGetFasilitator();
  await handleGetPendamping(formData.id_lembaga_pendamping);
  console.log(submissionDetail);
  if (
    formData.id_fasilitator != null &&
    !listFasilitasi.value.some((item) => item.id == formData.id_fasilitator)
  ) {
    formData.id_fasilitator = "Lainnya";
    onSelectFasilitator("Lainnya");
    onSearchFasilitator();
  }

  // ]);
});
</script>

<template>
  <VCard class="mb-10 pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Data Pengajuan</div>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol cols="3" class="font-weight-bold mb-1">No. ID</VCol>
        <VCol cols="9">: {{ submissionDetail.id_reg }}</VCol>
      </VRow>
      <VRow>
        <VCol cols="3" class="font-weight-bold mb-1">Tanggal</VCol>
        <VCol cols="9"
          >:
          {{
            submissionDetail.tanggal_buat ? submissionDetail.tanggal_buat : "-"
          }}</VCol
        >
      </VRow>
      <VRow>
        <VCol cols="3" class="font-weight-bold mb-1">Jenis Pengajuan</VCol>
        <VCol cols="9"
          >:
          {{ findListDaftar(submissionDetail.id_jenis_pengajuan).name }}</VCol
        >
      </VRow>
      <VDivider class="my-5" />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Pendaftaran</div>
        <VSelect
          v-model="formData.id_jenis_pengajuan"
          density="compact"
          :items="listPendaftaran"
          item-title="name"
          :rules="[requiredValidator]"
          item-value="code"
          placeholder="Pilih Jenis Pendaftaran"
          @update:model-value="onSelectFasilitator"
          readonly
        />
      </VItemGroup>
      <br />

      <VRow>
        <VCol cols="12">
          <VLabel>Kode Daftar / Fasilitasi</VLabel>
          <VRow>
            <VCol cols="12">
              <VSelect
                v-model="formData.id_fasilitator"
                density="compact"
                :items="listFasilitasi"
                item-title="name"
                :rules="[requiredValidator]"
                item-value="id"
                placeholder="Pilih Fasilitator"
                @update:model-value="onSelectFasilitator"
                readonly
              />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      <VRow>
        <VCol v-if="isFasilitator" cols="12">
          <VTextField
            v-model="querySearch"
            placeholder="Masukan Kode Fasilitasi"
            append-inner-icon="mdi-magnify"
            density="compact"
            :rules="[requiredValidator]"
            @input="onSearchFasilitator"
            readonly
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol v-if="isFasilitator" cols="12">
          <VTextField
            v-model="facName"
            placeholder="nama Fasilitator"
            density="compact"
            readonly
          />
        </VCol>
      </VRow>
      <div v-if="isFasilitator">
        <VAlert
          v-if="false"
          :type="responseType"
          variant="tonal"
          :color="responseColor"
          class="mt-5"
        >
          {{ responseMessage }}
        </VAlert>
        <VAlert
          v-if="false"
          type="success"
          variant="tonal"
          color="#5CB338"
          class="mt-5"
        >
          Kode Fasilitasi dapat digunakan
        </VAlert>

        <VAlert
          v-if="!isKodeFound"
          type="warning"
          variant="tonal"
          color="#652672"
          class="mt-5"
        >
          Kode unik yang diterbitkan oleh BPJPH yang diberikan kepada
          fasilitator sebagai kode untuk mendaftarkan sertifikasi halal gratis
        </VAlert>

        <VAlert
          v-if="isKodeFound"
          type="warning"
          variant="tonal"
          color="#652672"
          class="mt-5"
        >
          Pastikan anda melengkapi isian pengajuan sertifikasi halal dan
          mengirimkan pengajuan untuk memperoleh fasilitasi sertifikat halal.
        </VAlert>
      </div>

      <br />
      <VDivider />
      <br />
      <VExpandTransition>
        <VItemGroup v-if="foundFasilitator.length > 0">
          <VRow>
            <VCol class="text-center">
              <div>Fasilitator</div>
              <div class="font-weight-bold text-h3">
                {{ formData.id_fasilitator }}
              </div>
            </VCol>
          </VRow>
        </VItemGroup>
      </VExpandTransition>

      <!-- <VItemGroup v-if="foundFasilitator">
        <br />
        <div class="font-weight-bold mb-1">Asal Pelaku Usaha</div>
        <VSelect
          density="compact"
          placeholder="Pilih Asal Pelaku Usaha"
          rounded="xl"
          menu-icon="fa-chevron-down"
          v-mode="formData.asal_usaha"
        />
      </VItemGroup> -->
    </VCardText>
  </VCard>
  <VCard class="pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Penanggung Jawab</div>
    </VCardTitle>
    <VCardText>
      <div class="mb-10">
        <VRow>
          <VCol cols="3" class="font-weight-bold mb-1">Surat Permohonan</VCol>
          <VCol cols="9">
            :

            <VBtn
              color="primary"
              density="comfortable"
              append-icon="fa-download"
              @click="downloadDocument(suratPermohonan)"
              >Unduh</VBtn
            >
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3" class="font-weight-bold mb-1">Surat Pernyataan</VCol>
          <VCol cols="9">
            :
            <VBtn
              color="primary"
              density="comfortable"
              append-icon="fa-download"
              @click="downloadDocument(suratPernyataan)"
              >Unduh</VBtn
            >
          </VCol>
        </VRow>
      </div>
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Nomor Surat Permohonan</div>
            <VTextField
              placeholder="Masukkan Nomor Surat"
              density="compact"
              rounded="xl"
              v-model="formData.no_mohon"
              readonly
            />
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Tanggal Surat Pemohon</div>
            <VTextField
              placeholder="Pilih Tanggal Surat Pemohon"
              :model-value="formData.tgl_surat_permohonan"
              density="compact"
              type="date"
              readonly
            />
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Layanan</div>
        <VSelect
          v-model="formData.id_jenis_layanan"
          placeholder="Pilih Jenis Layanan"
          density="compact"
          :items="listLayanan"
          item-title="name"
          :rules="[requiredValidator]"
          item-value="code"
          @update:model-value="handleGetJenisProdukFilter"
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Produk</div>
        <VSelect
          v-model="formData.id_jenis_produk"
          placeholder="Pilih Jenis Produk"
          density="compact"
          :items="listProduk"
          item-title="name"
          :rules="[requiredValidator]"
          item-value="code"
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <Vlabel class="font-weight-bold mb-1">Nama Usaha</Vlabel>
        <VTextField
          placeholder="Masukkan Nama Usaha"
          density="compact"
          rounded="xl"
          v-model="formData.nama_pu"
          readonly
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="font-weight-bold mb-1">Area Pemasaran</VLabel>
        <VSelect
          v-model="formData.area_pemasaran"
          placeholder="Pilih Area Pemasaran"
          :rules="[requiredValidator]"
          density="compact"
          :items="listAreaPemasaran"
          readonly
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="font-weight-bold mb-1">Lokasi Pendamping</VLabel>
        <VSelect
          v-model="formData.lokasi_pendamping"
          placeholder="Pilih Area Pemasaran"
          density="compact"
          :rules="[requiredValidator]"
          :items="lokasiPendamping"
          @update:model-value="loadDataPendamping"
          readonly
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="font-weight-bold mb-1">Lembaga Pendamping</VLabel>
        <VSelect
          v-model="formData.id_lembaga_pendamping"
          placeholder="Pilih Area Pemasarang"
          density="compact"
          :items="lembagaPendamping"
          item-title="name"
          :rules="[requiredValidator]"
          item-value="id"
          :disabled="formData.lokasi_pendamping == null"
          @update:model-value="handleGetPendamping"
          readonly
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VLabel class="font-weight-bold mb-1">Pendamping</VLabel>
        <VSelect
          v-model="formData.id_pendamping"
          placeholder="Pilih Pendamping"
          density="compact"
          :items="listPendamping"
          :rules="[requiredValidator]"
          item-title="name"
          :disabled="formData.lokasi_pendamping == null"
          item-value="id"
          readonly
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <VBtn
          type="submit"
          color="primary"
          variant="flat"
          text="Simpan Perubahan"
          @click="handleUpdateSubmission"
        />
      </VItemGroup>
    </VCardText>
  </VCard>
</template>
