<script setup lang="ts">
const route = useRoute<"">();
const submissionId = route.params?.id;

const submissionDetail = reactive({
  id_reg: null,
  jenis_pengajuan: null,
  tanggal_buat: null,
});
const formData = reactive({
  id_reg: submissionDetail.id_reg,
  jenis_pendaftaran: null,
  kode_daftar: null,
  no_surat_permohonan: null,
  tgl_surat_permohonan: null,
  jenis_layanan: null,
  jenis_produk: null,
  nama_usaha: null,
  area_pemasaran: null,
  lokasi_pendamping: null,
  lembaga_pendamping: null,
  pendamping: null,
});

const listPendaftaran = ref([]);
const listFasilitasi = ref([]);
const listLayanan = ref([]);
const listProduk = ref([]);
const listAreaPemasaran = ref([]);
const lokasiPendamping = ref([]);
const lembagaPendamping = ref([]);
const listPendamping = ref([]);

const handleDetailPengajuan = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${submissionId}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      Object.assign(submissionDetail, response.data.certificate_halal);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
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

const handleGetPendamping = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/submission/list-pendamping`,
      {
        method: "get",
        query: {
          id_reg: submissionId,
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

onMounted(() => {
  // await Promise.all([
  handleGetListPendaftaran();
  handleDetailPengajuan();
  handleGetFasilitator();
  handleGetJenisLayanan();
  handleGetJenisProduk();
  handleGetPendamping();
  // ]);
});
</script>

<template>
  <VCard class="pa-3" variant="elevated" elevation="9">
    <VCardTitle class="mb-5">
      <div class="font-weight-bold text-h4">Data Pengajuan</div>
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
              v-model="formData.nama_usaha"
            ></VTextField>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Area Pemasaran</VLabel>
            <VSelect
              placeholder="Pilih Area Pemasaran"
              density="compact"
              :items="listAreaPemasaran"
              item-title="name"
              item-value="id"
              v-model="formData.area_pemasaran"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Lokasi Pendamping</VLabel>
            <VSelect
              placeholder="Pilih Lokasi Pendamping"
              density="compact"
              :items="lokasiPendamping"
              item-title="name"
              item-value="id"
              v-model="formData.lokasi_pendamping"
            ></VSelect>
          </VItemGroup>
          <br />
          <VItemGroup>
            <VLabel>Lembaga Pendamping</VLabel>
            <VSelect
              placeholder="Pilih Lembaga Pendamping"
              density="compact"
              :items="lembagaPendamping"
              item-title="name"
              item-value="id"
              v-model="formData.lembaga_pendamping"
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
          <SuratPermohonanModal></SuratPermohonanModal>
          <div style="margin-left: 1svw"></div>
          <SuratPernyataanModal></SuratPernyataanModal>
        </VItemGroup>
      </div>
    </VCardTitle>
  </VCard>
</template>
