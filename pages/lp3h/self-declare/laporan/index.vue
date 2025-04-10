<script setup lang="ts">
const searchQuery = ref(null);
const itemPerPage = ref(10);
const totalItems = ref(0);
const page = ref(1);
const loading = ref(true);
const menu = ref(false);

const selectedYear = ref(null);
const selectedFasilitas = ref(null);
const selectedStatus = ref(null); // GANTI JADI SEMUA

const status = [
  { title: "Pengajuan", value: "OF10" },
  { title: "Selesai P3H", value: "OF71" },
  { title: "Verifikasi LP3H", value: "OF72" },
  { title: "Pembayaran", value: "OF56" },
  { title: "Dikirim ke Komite Fatwa", value: "OF74" },
  { title: "Dikembalikan ke PU", value: "OF280" },
  { title: "Dikembalikan oleh Fatwa", value: "OF285" },
  { title: "Selesai Sidang Fatwa", value: "OF100" },
  { title: "Penerbitan Sertifikat", value: "OF120" },
  { title: "Sertifikat Halal Terbit", value: "OF300" },
  { title: "Semua", value: null },
];

const fasilitas = ref([]);

const loadFasilitasi = async () => {
  try {
    const response = await $api("/lp3h/laporan/list-fasilitasi", {
      method: "get",
    });

    const data = response.data;

    // console.log("RESPONSE : ", response)

    fasilitas.value = [
      { title: "Semua", value: null },
      ...data.map((i) => ({
        title: i.fac_name,
        value: i.fac_id,
      })),
    ];
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const years = [
  { title: "Semua", value: null }, // Menambahkan item "Semua"
  ...Array.from({ length: new Date().getFullYear() - 2021 + 1 }, (_, i) => {
    const year = 2021 + i;

    return { title: year.toString(), value: year.toString() };
  }),
];

const daftarLaporanHeader = [
  { title: "No", key: "no" },
  { title: "ID Reg", key: "idReg", nowrap: true },
  { title: "No.Daftar", key: "noDaftar", nowrap: true },
  { title: "Tanggal Daftar", key: "tanggalDaftar", nowrap: true },
  { title: "Kode Fasilitasi", key: "kodeFasilitasi", nowrap: true },
  { title: "Nama PU", key: "namaPu", nowrap: true },
  { title: "Alamat", key: "alamat", nowrap: true },
  { title: "Merk Dagang", key: "merkDagang", nowrap: true },
  { title: "No. HP Kontak", key: "noHp", nowrap: true },
  { title: "Nama Pendamping", key: "namaPendamping", nowrap: true },

  // { title: "invoice", key: "invoice",nowrap:true},
  { title: "Action", key: "action" },
];

const daftarLaporanItem = ref([]);

const loadItem = async (
  page: number,
  size: number,
  status_reg: string,
  fac_id: string,
  tahun: string,
  search: string
) => {
  try {
    loading.value = true;

    const response = await $api("/lp3h/laporan/list-pengajuan", {
      method: "get",
      params: {
        page,
        size,
        status_reg,
        tgl_daftar: tahun,
        fac_id,
        search,
      },
    });

    const data = response.data;

    if (data != null) {
      daftarLaporanItem.value = data.map((i) => ({
        idReg: i.id,
        noDaftar: i.no_daftar,
        tanggalDaftar: i.tgl_daftar,
        kodeFasilitasi: i.kode_fac,
        namaPu: i.nama_pu,
        alamat: i.alamat_pu,
        merkDagang: i.merek_dagang,
        noHp: i.no_kontak_pj,
        namaPendamping: i.pendamping,
      }));
    }

    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedStatus.value,
    selectedFasilitas.value,
    selectedYear.value,
    searchQuery.value
  );
};

const changeFilterBy = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedStatus.value,
    selectedFasilitas.value,
    selectedYear.value,
    searchQuery.value
  );
};

const action = (item) => {
  // console.log("action : ", item)
};

const downloadFile = async () => {
  // console.log("START DOWNLOAD EXCEL ")
  try {
    const params = {
      page: page.value,
      size: itemPerPage.value,
      status_reg: selectedStatus.value != null ? selectedStatus.value : "",
      tgl_daftar: selectedYear.value != null ? selectedYear.value : "",
      fac_id: selectedFasilitas.value != null ? selectedFasilitas.value : "",
      search: searchQuery.value != null ? searchQuery.value : "",
    };

    // console.log("DOWNLOAD EXCEL : {} ", params)

    const response = await $api("/lp3h/laporan/download-excel", {
      method: "get",
      params,
    });

    // console.log("RESPONSE : ", response)
    if (!response || response.size === 0)
      throw new Error("Gagal mengunduh file");

    const blob = response;

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "data.xlsx");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    useSnackbar().sendSnackbar(
      "Terjadi kesalahan saat mengunduh file.",
      "error"
    );
  }
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  loading.value = true;
  await loadFasilitasi();

  // await loadItem(page.value, itemPerPage.value, selectedStatus.value , selectedFasilitas.value , selectedYear.value)
  loading.value = false;
});
</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">Laporan Self Declare</h3>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VCard class="pa-2">
          <VCardTitle class="text-h4 mx-0"> Daftar Laporan </VCardTitle>
          <VCardItem>
            <VRow class="d-flex align-center">
              <VCol md="2" cols="12">
                <VMenu v-model="menu" :close-on-content-click="false">
                  <template #activator="{ props }">
                    <VBtn
                      class="d-flex justify-space-between"
                      v-bind="props"
                      variant="outlined"
                      append-icon="mdi-filter"
                      min-width="130px"
                    >
                      Filter
                    </VBtn>
                  </template>
                  <VCard class="pa-4 text-xs" min-width="400px">
                    <VLabel for="status"> Status </VLabel>
                    <VSelect
                      id="status"
                      v-model="selectedStatus"
                      label=""
                      :items="status"
                      variant="solo"
                      class="mb-2"
                      @update:model-value="changeFilterBy"
                    />
                    <VLabel for="fasilitas"> Fasilitas </VLabel>
                    <VSelect
                      id="fasilitas"
                      v-model="selectedFasilitas"
                      label=""
                      :items="fasilitas"
                      variant="solo"
                      class="mb-2 text-xs"
                      @update:model-value="changeFilterBy"
                    />
                    <VLabel for="tahun"> Tahun </VLabel>
                    <VSelect
                      id="tahun"
                      v-model="selectedYear"
                      label=""
                      :items="years"
                      variant="solo"
                      @update:model-value="changeFilterBy"
                    />
                  </VCard>
                </VMenu>
              </VCol>
              <VCol md="7" cols="12">
                <VTextField
                  v-model="searchQuery"
                  density="compact"
                  placeholder="Cari No. Daftar / Nama PU / Nama Pendamping "
                  append-inner-icon="ri-search-line"
                  @input="handleInput"
                />
              </VCol>
              <VCol class="d-flex justify-end">
                <VBtn
                  color="primary"
                  class="ml-2"
                  append-icon="mdi-file-excel"
                  @click="downloadFile"
                >
                  Export XLS
                </VBtn>
              </VCol>
            </VRow>
          </VCardItem>
          <VCardItem>
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :items-per-page-options="ITEMS_PER_PAGE_OPTIONS_HUGE"
              :headers="daftarLaporanHeader"
              :items="daftarLaporanItem"
              :items-length="totalItems"
              :loading="loading"
              loading-text="Loading..."
              @update:options="
                loadItem(
                  page,
                  itemPerPage,
                  selectedStatus,
                  selectedFasilitas,
                  selectedYear
                )
              "
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template #item.tanggalDaftar="{ item }">
                {{ formatDateId(item.tanggalDaftar) }}
              </template>

              <template #item.action="{ item }">
                <VBtn
                  icon
                  variant="text"
                  @click="
                    navigateTo(
                      `/sh-domestic/submission/self-declare/${item.idReg}`
                    )
                  "
                >
                  <VIcon size="24" color="primary"> mdi-arrow-right </VIcon>
                </VBtn>
              </template>
            </VDataTableServer>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss"></style>
