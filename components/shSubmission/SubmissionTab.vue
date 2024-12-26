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

const fasilitatorData = ref([{ title: "BPJH SEHATI", value: "BPJH SEHATI" }]);
const selectedFasilitator = ref("");
const searchFasilitator = ref("");
const foundFasilitator = ref("");

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

const downloadFile = () => {
  useSnackbar().sendSnackbar("Berhasil mengunduh data", "success");
};

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

    if (response.code === 2000) {
      Object.assign(submissionDetail, response.data.certificate_halal);
      submissionDetail.tanggal_buat = response.data.pendaftaran.tgl_daftar;
      submissionDetail.nama_pj = response.data.penanggung_jawab.nama_pj;
      submissionDetail.nomor_kontak_pj =
        response.data.penanggung_jawab.nomor_kontak_pj;
      Object.assign(formData, response.data.certificate_halal);
      formData.tgl_surat_permohonan =
        formData.tgl_mohon != "" ? formatToISOString(formData.tgl_mohon) : null;
      // if (formData.id_lembaga_pendamping != "") {
      //   await handleGetPendamping(formData.id_lembaga_pendamping);
      // }
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

const listPendaftaran = ref([]);
const findListDaftar = (kode: string) => {
  const data = listPendaftaran.value.find((code) => kode == code.code);
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
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
const formLembagaPendamping = ref<{}>();
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
      if (response.data !== null) {
        lembagaPendamping.value = response.data;
      }
    }
    return response;
  } catch (error) {
    console.log(error);
  }
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

    if (response.code === 2000) {
      if (response.data !== null) listPendamping.value = response.data;
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  // await Promise.all([
  handleGetListPendaftaran();
  // handleDetailPengajuan();
  handleGetFasilitator();
  handleGetJenisLayanan();
  handleGetJenisProduk();
  loadDataPendamping(formData.lokasi_pendamping);

  // on edit:
  // handleGetPendamping(formData.id_lembaga_pendamping);
  // formData.value.id_pendamping = listPendamping.value.filter(
  //   (val) => val.id_pendamping == formData.value.id_pendamping
  // )[0]?.id;

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
          disabled
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
              @click="downloadFile"
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
              @click="downloadFile"
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
            <Vuepicdatepicker>
              <template #trigger>
                <Vuepicdatepicker
                  v-model:model-value="formData.tgl_surat_permohonan"
                  auto-apply
                  model-type="yyyy-MM-dd"
                  :enable-time-picker="false"
                  teleport
                  clearable
                >
                  <template #trigger>
                    <VTextField
                      placeholder="Pilih Tanggal Surat Pemohon"
                      append-inner-icon="fa-calendar"
                      :model-value="formData.tgl_surat_permohonan"
                      color="#757575"
                      readonly
                      density="compact"
                    />
                  </template>
                </Vuepicdatepicker>
              </template>
            </Vuepicdatepicker>
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
</template>
