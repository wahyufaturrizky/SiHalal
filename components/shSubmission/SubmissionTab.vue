<script setup lang="ts">
const props = defineProps({
  idDetail: {
    required: true,
    type: String,
  },
});

const submissionData = ref({
  id: "39886986",
  date: "10/10/2024",
  type: "Baru",
});

const route = useRoute();
const submissionId = (route.params as any).id as string;

const fasilitatorData = ref([{ title: "BPJH SEHATI", value: "BPJH SEHATI" }]);
const selectedFasilitator = ref("");
const searchFasilitator = ref("");
const foundFasilitator = ref("");
const loadingAll = ref(true);
const suratPermohonan = ref(null);
const suratPernyataan = ref(null);

const handleSelectFasilitator = (v: string) => {
  selectedFasilitator.value = v;
  const found = fasilitatorData.value.find((i) => i.value === v);
  if (found) foundFasilitator.value = found.value;
};
const handleSearchFasilitator = () => {
  const regex = new RegExp(searchFasilitator.value, "i");
  const found = fasilitatorData.value.find((i) => regex.test(i.value));
  if (found) {
    foundFasilitator.value = found.value;
    useSnackbar().sendSnackbar("Kode fasilitator ditemukan", "success");
  } else {
    foundFasilitator.value = "";
    useSnackbar().sendSnackbar(
      "Kode fasilitator tidak ditemukan, silahkan cek kembali",
      "error"
    );
  }
};

const getDownloadForm = async (docName: string, propName: any) => {
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

console.log("@suratPermohonan", suratPermohonan);
console.log("@suratPernyataan", suratPernyataan);

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

const { refresh } = await useAsyncData("get-detail-submission", async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${props.idDetail}/detail`,
      {
        method: "get",
      }
    );

    console.log("@response", response);

    if (response.code === 2000) {
      const { data } = response || {};
      const { certificate_halal, pendaftaran, penanggung_jawab } = data || {};
      const {
        id_jenis_layanan,
        id_jenis_produk,
        nama_pu,
        area_pemasaran,
        id_lembaga_pendamping,
      } = certificate_halal || {};
      const { nama_pj, nomor_kontak_pj } = penanggung_jawab || {};
      const { tgl_daftar } = pendaftaran || {};

      submissionDetail.tanggal_buat = tgl_daftar;
      submissionDetail.nama_pj = nama_pj;
      submissionDetail.nomor_kontak_pj = nomor_kontak_pj;
      (formData as any).tgl_surat_permohonan =
        formData.tgl_mohon != "" ? formatToISOString(formData.tgl_mohon) : null;

      formData.id_jenis_layanan = id_jenis_layanan;
      formData.id_jenis_produk = id_jenis_produk;
      formData.nama_pu = nama_pu;
      formData.area_pemasaran = area_pemasaran;
      formData.lembaga_pendamping = id_lembaga_pendamping;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
});

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
const handleGetLembagaPendamping = async (lokasi: string) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/submission/list-lembaga-pendamping`,
      {
        method: "get",
        query: {
          id_reg: props.idDetail,
          lokasi: lokasi,
        },
      }
    );

    if (response.code === 2000) {
      lembagaPendamping.value = response.data || [];
      return response;
    }
  } catch (error) {}
};
const loadDataPendamping = async (lokasi: string | null) => {
  if (lokasi) {
    await handleGetLembagaPendamping(lokasi);
  }
};
const handleGetPendamping = async (idLembaga: string | null) => {
  if (!idLembaga) return;
  try {
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-pendamping",
      {
        method: "get",
        query: {
          id_lembaga: idLembaga,
        },
      }
    );
    console.log("@asdasd", response);

    if (response.code === 2000) {
      if (response.data !== null) listPendamping.value = response.data;
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const res = await Promise.all([
    handleGetListPendaftaran(),
    handleGetFasilitator(),
    handleGetJenisLayanan(),
    handleGetJenisProduk(),
    loadDataPendamping(formData.lokasi_pendamping),
    getDownloadForm("surat-permohonan", "suratPermohonan"),
    getDownloadForm("surat-pernyataan", "suratPernyataan"),
  ]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <VCard v-if="!loadingAll" class="mb-10 pt-3">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Data Pengajuan</div>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol cols="3" class="font-weight-bold mb-1">No. ID</VCol>
        <VCol cols="9">: {{ submissionData.id }}</VCol>
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
          density="compact"
          placeholder="Pilih Jenis Pendaftaran"
          rounded="xl"
          menu-icon="fa-chevron-down"
          :items="listPendaftaran"
          item-title="name"
          item-value="code"
          v-model="formData.id_jenis_pengajuan"
        />
      </VItemGroup>
      <br />
      <VCard>
        <VCardText>
          <VRow>
            <VCol>
              <VItemGroup>
                <div class="font-weight-bold mb-1">Fasilitasi</div>
                <VSelect
                  density="compact"
                  rounded="xl"
                  v-model="formData.id_fasilitator"
                  :items="listFasilitasi"
                  item-title="name"
                  item-value="id"
                  placeholder="Pilih Fasilitator"
                  @update:model-value="handleSelectFasilitator"
                  @click:clear="
                    [(selectedFasilitator = ''), (foundFasilitator = '')]
                  "
                  :disabled="searchFasilitator.length > 0"
                  clearable
                  menu-icon="fa-chevron-down"
                />
              </VItemGroup>
            </VCol>
            <VCol cols="auto" align-self="center">Atau</VCol>
            <VCol>
              <div class="font-weight-bold mb-1">Kode Fasilitasi</div>
              <VTextField
                v-model="searchFasilitator"
                placeholder="Masukkan Kode"
                :disabled="selectedFasilitator.length > 0"
                density="compact"
                rounded="xl"
              >
                <template #append>
                  <VBtn
                    variant="outlined"
                    @click="handleSearchFasilitator"
                    :disabled="selectedFasilitator.length > 0"
                  >
                    Cari Kode
                  </VBtn>
                </template>
              </VTextField>
            </VCol>
          </VRow>
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
        </VCardText>
      </VCard>
      <VItemGroup v-if="foundFasilitator">
        <br />
        <div class="font-weight-bold mb-1">Asal Pelaku Usaha</div>
        <VSelect
          density="compact"
          placeholder="Pilih Asal Pelaku Usaha"
          rounded="xl"
          menu-icon="fa-chevron-down"
          v-mode="formData.asal_usaha"
        />
      </VItemGroup>
    </VCardText>
  </VCard>
  <VCard v-if="!loadingAll" class="pt-3">
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
            />
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Layanan</div>
        <VSelect
          placeholder="Pilih Jenis Layanan"
          density="compact"
          rounded="xl"
          menu-icon="fa-chevron-down"
          :items="listLayanan"
          item-title="name"
          item-value="code"
          v-model="formData.id_jenis_layanan"
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Jenis Produk</div>
        <VSelect
          placeholder="Pilih Jenis Produk"
          density="compact"
          rounded="xl"
          menu-icon="fa-chevron-down"
          :items="listProduk"
          item-title="name"
          item-value="code"
          v-model="formData.id_jenis_produk"
        />
      </VItemGroup>
      <br />
      <VItemGroup>
        <div class="font-weight-bold mb-1">Nama Usaha</div>
        <VTextField
          placeholder="Masukkan Nama Usaha"
          density="compact"
          rounded="xl"
          v-model="formData.nama_pu"
        />
      </VItemGroup>
      <br />
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Asal Pemasaran</div>
            <VSelect
              placeholder="Pilih Asal Pemasaran"
              density="compact"
              rounded="xl"
              menu-icon="fa-chevron-down"
              v-model="formData.area_pemasaran"
            />
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Lokasi Pendamping</div>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
              rounded="xl"
              menu-icon="fa-chevron-down"
              :items="['Provinsi', 'Kabupaten']"
              @update:model-value="loadDataPendamping"
            />
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Lembaga Pendamping</VLabel>
            <VSelect
              v-model="formData.lembaga_pendamping"
              placeholder="Pilih Area Pemasaran"
              density="compact"
              :items="lembagaPendamping"
              item-title="name"
              :rules="[requiredValidator]"
              item-value="id"
              :disabled="formData.lokasi_pendamping == null"
              @update:model-value="handleGetPendamping"
            />
          </VItemGroup>
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <div class="font-weight-bold mb-1">Pendamping</div>
            <VSelect
              placeholder="Pilih Pendamping"
              density="compact"
              rounded="xl"
              menu-icon="fa-chevron-down"
              :items="listPendamping"
              :rules="[requiredValidator]"
              item-title="name"
              :disabled="formData.lokasi_pendamping == null"
              item-value="id"
              v-model="formData.id_pendamping"
            />
          </VItemGroup>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <VSkeletonLoader
    type="table-heading, list-item-two-line, image, table-tfoot"
    v-else
  />
</template>
