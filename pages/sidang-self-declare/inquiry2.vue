<script setup lang="ts">
import KomiteFatwaLayout from "@/layouts/komiteFatwaLayout.vue";
import { MasterRef } from "@/utils/enum/EnumMasterRef";
import { VDataTableServer } from "vuetify/components";

const items = ref<
  {
    id: string;
    nama_pu: string;
    alamat: string;
    jenis_produk: string;
    merek_dagang: string;
    no_daftar: string;
    tgl_daftar: string;
  }[]
>([]);

const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nomor Daftar", value: "no_daftar" },
  { title: "Tanggal Daftar", value: "tgl_daftar" },
  { title: "Nama PU", value: "nama_pu" },
  { title: "Alamat", value: "alamat" },
  { title: "Jenis Produk", value: "jenis_produk" },
  { title: "Merek Dagang", value: "merek_dagang" },
];

const selectedFilterPermohonan = ref("");
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);
const selectedFilterBy = ref("nama_pu");
const loadItem = async (
  page: number,
  size: number,
  filterBy: string,
  searchQuery: string,
  jenisPermohonan: string,
  statusPermohonan: string,
  wilayah: string,
  kabupaten: string,
  fasilitas: string,
  namaFasilitator: string,
  download: boolean
) => {
  try {
    loading.value = true;

    const response: any = await $api("/self-declare/komite-fatwa/inquiry-1", {
      method: "get",
      params: {
        page,
        size,
        searchQuery,
        jenisPermohonan,
        statusPermohonan,
        wilayah: wilayah.split("||")[1],
        kabupaten: kabupaten.split("||")[1],
        fasilitas,
        namaFasilitator,
        filterBy,
        download,
      },
    });
    if (download) {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement("a");
      a.href = url;
      // Set the file name for the download
      a.download = "report.xlsx";
      console.log("ini url", url);

      // Trigger the download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      reset();
      return;
    }
    if (response.code === 2000) {
      items.value = response.data || [];
      totalItems.value = response.total_item || 0;
      loading.value = false;
      return response;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const getCommonCode = async (code: MasterRef) => {
  try {
    const response4: any = await $api("/master/common-code", {
      method: "get",
      params: {
        type: code,
      },
    });
    return response4;
  } catch (error) {
    return [];
  }
};
const totalItemFasilitator = ref(0);
const pageFasilitator = ref(1);
const getFasilitator = async (page) => {
  try {
    const response4: any = await $api(
      "/self-declare/komite-fatwa/inquiry-1/filter/fasilitator",
      {
        method: "get",
        params: {
          page: page,
        },
      }
    );
    if (response4.code === 2000) {
      if (page === 1) {
        fasilitatorItems.value = [
          { fac_id: "", fac_name: "Semua" },
          ...response4.data,
        ] || [{ fac_id: "", fac_name: "Semua" }];
      } else {
        fasilitatorItems.value = [...fasilitatorItems.value, ...response4.data];
      }
      totalItemFasilitator.value = response4.total_item;
    }
  } catch (error) {
    return [];
  }
};
const loadMoreFasilitator = () => {
  if (fasilitatorItems.value.length < totalItemFasilitator.value) {
    pageFasilitator.value += 1;
    getFasilitator(pageFasilitator.value);
  }
};

const totalItemFasilitasi = ref(0);
const pageFasilitasi = ref(1);
const getFasilitasi = async (page) => {
  try {
    const response4: any = await $api(
      "/self-declare/komite-fatwa/inquiry-1/filter/fasilitasi",
      {
        method: "get",
        params: {
          page: page,
        },
      }
    );
    if (response4.code === 2000) {
      if (page === 1) {
        nameFasilitasiItems.value = [
          { fac_id: "", fac_name: "Semua" },
          ...response4.data,
        ] || [{ fac_id: "", fac_name: "Semua" }];
      } else {
        nameFasilitasiItems.value = [
          ...nameFasilitasiItems.value,
          ...response4.data,
        ];
      }
      console.log(nameFasilitasiItems.value);
      totalItemFasilitasi.value = response4.total_item;
    }
  } catch (error) {
    return [];
  }
};
const loadMoreFasilitasi = () => {
  if (nameFasilitasiItems.value.length < totalItemFasilitasi.value) {
    pageFasilitasi.value += 1;
    getFasilitasi(pageFasilitasi.value);
  }
};
const getProvince = async () => {
  try {
    const response: any = await $api("/master/province", {
      method: "get",
    });
    wilayahItems.value = [{ code: "", name: "Semua" }, ...response];
  } catch (error) {
    return [];
  }
};
const getDistrict = async (item: string) => {
  selectedFilterKabupaten.value = "";
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: item.split("||")[0],
    },
  });
  kabupatenItems.value = [{ code: "", name: "Semua" }, ...response];
};
const permohonanItems = ref([{ name: "Semua", code: "" }]);

const selectedFilterStatusPermhonan = ref("");

const statusPermhonanItems = ref([
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
]);

const selectedFilterWilayah = ref("");

const wilayahItems = ref([
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
]);

const selectedFilterKabupaten = ref("");

const kabupatenItems = ref([{ code: "", name: "Semua" }]);

const selectedFilterFasilitaas = ref("");

const fasilitatorItems = ref([
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
]);

const selectedFilterNameFasilitator = ref("");

const nameFasilitasiItems = ref([
  { name: "X", value: 1 },
  { name: "Y", value: 2 },
  { name: "Z", value: 3 },
]);

const selectedFilterLayer = ref(false);

const layerItems = ref([
  { name: "Layar", code: false },
  { name: "Excel", code: true },
]);
const showFilterMenu = ref(false);

const debouncedFetch = debounce(loadItem, 500);
const searchQuery = ref("");
const handleInput = () => {
  selectedFilterLayer.value = false;
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFilterBy.value,
    searchQuery.value,
    selectedFilterPermohonan.value,
    selectedFilterStatusPermhonan.value,
    selectedFilterWilayah.value,
    selectedFilterKabupaten.value,
    selectedFilterFasilitaas.value,
    selectedFilterNameFasilitator.value,
    selectedFilterLayer.value
  );
};
const changeFilterBy = (item) => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    item,
    searchQuery.value,
    selectedFilterPermohonan.value,
    selectedFilterStatusPermhonan.value,
    selectedFilterWilayah.value,
    selectedFilterKabupaten.value,
    selectedFilterFasilitaas.value,
    selectedFilterNameFasilitator.value,
    selectedFilterLayer.value
  );
};
const reset = () => {
  selectedFilterPermohonan.value = "";
  selectedFilterStatusPermhonan.value = "";
  selectedFilterWilayah.value = "";
  selectedFilterKabupaten.value = "";
  selectedFilterFasilitaas.value = "";
  selectedFilterNameFasilitator.value = "";
  selectedFilterLayer.value = false;
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFilterBy.value,
    searchQuery.value,
    selectedFilterPermohonan.value,
    selectedFilterStatusPermhonan.value,
    selectedFilterWilayah.value,
    selectedFilterKabupaten.value,
    selectedFilterFasilitaas.value,
    selectedFilterNameFasilitator.value,
    selectedFilterLayer.value
  );
  showFilterMenu.value = false;
};
const applyFilters = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFilterBy.value,
    searchQuery.value,
    selectedFilterPermohonan.value,
    selectedFilterStatusPermhonan.value,
    selectedFilterWilayah.value,
    selectedFilterKabupaten.value,
    selectedFilterFasilitaas.value,
    selectedFilterNameFasilitator.value,
    selectedFilterLayer.value
  );
  showFilterMenu.value = false;
};
const findProdukByCode = (code) => {
  const produk = filterProduk.value.find((item) => item.code == code);
  if (produk) {
    return produk.name;
  }
  return code;
};
const filterProduk = ref([]);
const statusMohon = ref([]);
onMounted(async () => {
  await getProvince();
  // fasilitasItems.value = [
  //   { code: "", name: "Semua", name_eng: "All" },
  //   ...(await getCommonCode(MasterRef.CHANL)),
  // ];
  statusPermhonanItems.value = [
    {
      code: "",
      name: "Semua",
      name_eng: "All",
    },
    ...(await getCommonCode(MasterRef.STOFF)),
  ];
  permohonanItems.value = [
    {
      code: "",
      name: "Semua",
      name_eng: "All",
    },
    ...(await getCommonCode(MasterRef.JNDAF)),
  ];
  await getFasilitator(pageFasilitator.value);
  await getFasilitasi(pageFasilitator.value);

  const response4: any = await $api(
    "/self-declare/komite-fatwa/proses-sidang/filter-produk",
    {
      method: "get",
    }
  );
  filterProduk.value = response4.data || [];
});
const provinceValue = (item: MasterDistrict) => {
  return `${item.code}||${item.name}`;
};
</script>

<template>
  <KomiteFatwaLayout>
    <template #pageTitle>
      <VRow>
        <VCol cols="12">
          <h2>Inquiry / Pengajuan</h2>
        </VCol>
      </VRow>
    </template>

    <!-- centerContent content -->
    <template #centerContent>
      <VCard>
        <VCardTitle><h3>Data Pengajuan</h3></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
              <VMenu v-model="showFilterMenu" :close-on-content-click="false">
                <template #activator="{ props: openMenu }">
                  <VBtn
                    append-icon="fa-filter"
                    v-bind="openMenu"
                    variant="outlined"
                    style="inline-size: 100%"
                  >
                    Filter
                  </VBtn>
                </template>
                <VList>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Jenis Permohonan</b></VLabel>
                      <VSelect
                        v-model="selectedFilterPermohonan"
                        :items="permohonanItems"
                        item-value="code"
                        item-title="name"
                        placeholder="Semua"
                        density="compact"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Status Permohonan</b></VLabel>
                      <VSelect
                        v-model="selectedFilterStatusPermhonan"
                        :items="statusPermhonanItems"
                        item-value="code"
                        item-title="name"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Wilayah</b></VLabel>
                      <VSelect
                        v-model="selectedFilterWilayah"
                        :items="wilayahItems"
                        :item-value="provinceValue"
                        item-title="name"
                        density="compact"
                        placeholder="Semua"
                        v-on:update:model-value="getDistrict"
                      />
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Kabupaten</b></VLabel>
                      <VSelect
                        v-model="selectedFilterKabupaten"
                        :items="kabupatenItems"
                        :item-value="provinceValue"
                        item-title="name"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Fasilitasi </b></VLabel>
                      <VAutocomplete
                        :items="nameFasilitasiItems"
                        v-model="selectedFilterFasilitaas"
                        item-value="fac_id"
                        item-title="fac_name"
                        density="compact"
                        placeholder="Pilih Fasilitasi"
                      >
                        <template #item="{ props, item }">
                          <VListItem
                            v-bind="props"
                            :title="(item.raw as any).fac_name"
                          >
                          </VListItem>
                        </template>
                        <template #append-item>
                          <div v-intersect="loadMoreFasilitasi" />
                        </template>
                      </VAutocomplete>
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Nama Fasilitator</b></VLabel>
                      <VAutocomplete
                        v-model="selectedFilterNameFasilitator"
                        :items="fasilitatorItems"
                        item-value="fac_id"
                        item-title="fac_name"
                        density="compact"
                        placeholder="Pilih Fasilitator"
                      >
                        <template #item="{ props, item }">
                          <VListItem
                            v-bind="props"
                            :title="(item.raw as any).fac_name"
                          >
                          </VListItem>
                        </template>
                        <template #append-item>
                          <div v-intersect="loadMoreFasilitator" />
                        </template>
                      </VAutocomplete>
                    </VItemGroup>
                  </VListItem>

                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Layer </b></VLabel>
                      <VSelect
                        v-model="selectedFilterLayer"
                        :items="layerItems"
                        item-value="code"
                        item-title="name"
                        density="compact"
                        placeholder="Semua"
                      />
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VBtn
                      style="float: inline-start"
                      text="Reset Filter"
                      @click="reset"
                    />
                    <VBtn
                      style="float: inline-end"
                      color="primary"
                      @click="applyFilters"
                    >
                      Apply Filters
                    </VBtn>
                  </VListItem>
                </VList>
              </VMenu>
            </VCol>
            <VCol cols="12">
              <VLabel>Cari Berdasarkan : </VLabel>
              <VRadioGroup
                v-model="selectedFilterBy"
                inline
                @update:model-value="changeFilterBy"
              >
                <VRadio :label="`Nama PU`" value="nama_pu" />
                <VRadio :label="`Nomor Daftar`" value="no_daftar" />
              </VRadioGroup>
            </VCol>
            <VCol cols="12">
              <VTextField
                density="compact"
                v-model="searchQuery"
                placeholder="Cari Nama Pengajuan"
                append-inner-icon="mdi-magnify"
                @input="handleInput"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VDataTableServer
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :headers="tableHeader"
                :items="items"
                :loading="loading"
                :items-length="totalItems"
                loading-text="Loading..."
                @update:options="
                  loadItem(
                    page,
                    itemPerPage,
                    selectedFilterBy,
                    searchQuery,
                    selectedFilterPermohonan,
                    selectedFilterStatusPermhonan,
                    selectedFilterWilayah,
                    selectedFilterKabupaten,
                    selectedFilterFasilitaas,
                    selectedFilterNameFasilitator,
                    selectedFilterLayer
                  )
                "
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
                <template #item.jenis_produk="{ item }">
                  {{ findProdukByCode(item.jenis_produk) }}
                </template>
                <template #item.tgl_daftar="{ item }">
                  {{ formatToISOString(item.tgl_daftar) }}
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </template>
  </KomiteFatwaLayout>
</template>

<style scoped></style>
