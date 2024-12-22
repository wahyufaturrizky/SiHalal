<script setup lang="ts">
const route = useRoute<"">();
const submissionId = route.params?.id;

const submissionDetail = reactive({
  id_reg: null,
  jenis_pengajuan: null,
  tanggal_buat: null,
  nama_pj: null,
  alamat_pu: null,
  jabatan_pj: null,
  telp_pu: null,
  nama_pu: null,
});
const formData = reactive({
  id_reg: submissionId,
  jenis_pendaftaran: null,
  kode_daftar: null,
  no_surat_permohonan: null,
  tgl_surat_permohonan: null,
  jenis_layanan: null,
  jenis_produk: null,
  nama_pu: null,
  area_pemasaran: null,
  lokasi_pendamping: null,
  lembaga_pendamping: null,
  pendamping: null,
});

const listPendaftaran = ref([]);
const listFasilitasi = ref([]);
const listLayanan = ref([]);
const listProduk = ref([]);
const listAreaPemasaran = ref([
  { title: "Kabupaten/Kota", value: "Kabupaten" },
  { title: "Provinsi", value: "Provinsi" },
  { title: "Nasional", value: "Nasional" },
  { title: "Internasional", value: "Internasional" },
]);
const lokasiPendamping = ref([
  { title: "Kabupaten", value: "Kabupaten" },
  { title: "Provinsi", value: "Provinsi" },
]);
const lembagaPendamping = ref([]);
const listPendamping = ref([]);

const loadDataPendamping = async (lokasi: string | null) => {
  if (lokasi) {
    await handleGetLembagaPendamping(lokasi);
  }
};

const { refresh } = await useAsyncData("get-detail-submission", async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${submissionId}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      Object.assign(submissionDetail, response.data.certificate_halal);
      Object.assign(formData, response.data.certificate_halal);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
});
const handleGetListPendaftaran = async () => {
  try {
    listPendaftaran.value = await $api(`/master/jenis-pendaftaran`, {
      method: "get",
    });
  } catch (error) {
    console.log(error);
  }
};
const handleGetFasilitator = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/submission/list-fasilitator`,
      {
        method: "get",
        query: {
          reg_id: submissionId,
          lokasi: "Kabupaten",
        },
      }
    );

    if (response.code === 2000) {
      listFasilitasi.value = response.data;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
const handleGetJenisLayanan = async () => {
  try {
    listLayanan.value = await $api(`/master/jenis-layanan`, {
      method: "get",
    });
  } catch (error) {
    console.log(error);
  }
};
const handleGetJenisProduk = async () => {
  try {
    listProduk.value = await $api(`/master/products`, {
      method: "get",
    });
  } catch (error) {
    console.log(error);
  }
};

const handleGetLembagaPendamping = async (lokasi: string) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/submission/list-lembaga-pendamping`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
          lokasi: lokasi,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null) {
        lembagaPendamping.value = response.data;
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
const handleGetPendamping = async (idLembaga: string | null) => {
  if (!idLembaga) return;
  try {
    const response: any = await $api(
      `/self-declare/business-actor/submission/list-pendamping`,
      {
        method: "get",
        query: {
          id_lembaga: idLembaga,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null) {
        listPendamping.value = response.data;
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateSubmission = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/submission/update`,
      {
        method: "put",
        body: {
          id_reg: submissionId,
          jenis_pendaftaran: formData.jenis_pendaftaran,
          kode_daftar: formData.kode_daftar,
          no_surat_permohonan: formData.no_surat_permohonan,
          tgl_surat_permohonan: formData.tgl_surat_permohonan,
          jenis_layanan: formData.jenis_layanan,
          jenis_produk: formData.jenis_produk,
          nama_usaha: formData.nama_pu,
          area_pemasaran: formData.area_pemasaran,
          lokasi_pendamping: formData.lokasi_pendamping,
          lembaga_pendamping: formData.lembaga_pendamping,
          pendamping: formData.pendamping,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null) {
        useSnackbar().sendSnackbar("Berhasil mengubah data", "success");
        refresh();
      }
    }
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal mengubah data", "error");
  }
};

onMounted(() => {
  // await Promise.all([
  handleGetListPendaftaran();
  // handleDetailPengajuan();
  handleGetFasilitator();
  handleGetJenisLayanan();
  handleGetJenisProduk();
  // ]);
});
</script>

<template>
  <VCard class="pa-3" variant="elevated" elevation="9">
    <VCardTitle
      class="d-flex justify-space-between align-center font-weight-bold text-h4 mb-5"
    >
      <div>Data Pengajuan</div>
      <VBtn
        color="primary"
        variant="flat"
        text="Simpan Perubahan"
        @click="handleUpdateSubmission"
      />
    </VCardTitle>
    <VCardTitle>
      <VRow>
        <VCol cols="2">No.Id</VCol>
        <VCol cols="1">:</VCol>
        <VCol cols="9">{{
          submissionDetail.id_reg ? submissionDetail.id_reg : "-"
        }}</VCol>
      </VRow>
      <VRow>
        <VCol cols="2">Tanggal</VCol>
        <VCol cols="1">:</VCol>
        <VCol cols="9">{{
          submissionDetail.tanggal_buat ? submissionDetail.tanggal_buat : "-"
        }}</VCol>
      </VRow>
      <VRow>
        <VCol cols="2">Jenis Pengajuan</VCol>
        <VCol cols="1">:</VCol>
        <VCol cols="9">{{
          submissionDetail.jenis_pengajuan
            ? submissionDetail.jenis_pengajuan
            : "-"
        }}</VCol>
      </VRow>
      <br />
      <br />
      <VRow>
        <VCol cols="12">
          <VItemGroup>
            <VLabel>Jenis Pendaftaran</VLabel>
            <VSelect
              density="compact"
              :items="listPendaftaran"
              item-title="name"
              item-value="code"
              v-model="formData.jenis_pendaftaran"
              placeholder="Pilih Jenis Pendaftaran"
            />
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VRow>
        <VCol cols="12">
          <VItemGroup>
            <VLabel>Kode Daftar / Fasilitasi</VLabel>
            <VRow>
              <VCol cols="5">
                <VSelect
                  density="compact"
                  :items="listFasilitasi"
                  item-title="name"
                  item-value="id"
                  placeholder="Pilih Fasilitator"
                  v-model="formData.kode_daftar"
                />
              </VCol>

              <VSpacer
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                ><p>Atau</p></VSpacer
              >
              <VCol cols="5">
                <VTextField
                  placeholder="Cari Fasilitator"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                ></VTextField>
              </VCol>
            </VRow>
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <VDivider></VDivider>
      <br />
      <VRow>
        <VCol cols="6">
          <VItemGroup>
            <VLabel>Nomor Surat Permohonan</VLabel>
            <VTextField
              placeholder="Isi Nomor Surat Permohonan"
              density="compact"
              v-model="formData.no_surat_permohonan"
            ></VTextField>
          </VItemGroup>
          <br />
        </VCol>
        <VCol cols="6">
          <VItemGroup>
            <Vuepicdatepicker>
              <template #trigger>
                <Vuepicdatepicker
                  v-model:model-value="formData.tgl_surat_permohonan"
                  auto-apply
                  model-type="dd/MM/yyyy"
                  :enable-time-picker="false"
                  teleport
                  clearable
                >
                  <template #trigger>
                    <VLabel class="required"> Tanggal Surat Pemohon </VLabel>
                    <VTextField
                      placeholder="Pilih Tanggal Surat Pemohon"
                      append-inner-icon="fa-calendar"
                      :model-value="formData.tgl_surat_permohonan"
                      color="#757575"
                      readonly
                    />
                  </template>
                </Vuepicdatepicker>
              </template>
            </Vuepicdatepicker>
          </VItemGroup>
        </VCol>
        <VCol cols="12">
          <VItemGroup>
            <VLabel>Jenis Layanan</VLabel>
            <VSelect
              placeholder="Pilih Jenis Layanan"
              density="compact"
              :items="listLayanan"
              item-title="name"
              item-value="code"
              v-model="formData.jenis_layanan"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Jenis Produk</VLabel>
            <VSelect
              placeholder="Pilih Jenis Produk"
              density="compact"
              :items="listProduk"
              item-title="name"
              item-value="code"
              v-model="formData.jenis_produk"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Nama Usaha</VLabel>
            <VTextField
              placeholder="Isi Nama Usaha"
              density="compact"
              v-model="formData.nama_pu"
            ></VTextField>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Area Pemasaran</VLabel>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
              :items="listAreaPemasaran"
              v-model="formData.area_pemasaran"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Lokasi Pendamping</VLabel>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
              :items="lokasiPendamping"
              v-model="formData.lokasi_pendamping"
              @update:model-value="loadDataPendamping"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Lembaga Pendamping</VLabel>
            <VSelect
              placeholder="Pilih Area Pemasarang"
              density="compact"
              :items="lembagaPendamping"
              item-title="name"
              item-value="id"
              v-model="formData.lembaga_pendamping"
              @update:model-value="handleGetPendamping"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Pendamping</VLabel>
            <VSelect
              placeholder="Pilih Pendamping"
              density="compact"
              :items="listPendamping"
              item-title="name"
              item-value="id"
              v-model="formData.pendamping"
            ></VSelect>
          </VItemGroup>
        </VCol>
      </VRow>
      <br />
      <div style="display: flex; justify-content: end">
        <VItemGroup style="display: inline-flex">
          <SuratPermohonanModal :data="submissionDetail" />
          <div style="margin-left: 1svw"></div>
          <SuratPernyataanModal :data="submissionDetail" />
        </VItemGroup>
      </div>
    </VCardTitle>
  </VCard>
</template>
