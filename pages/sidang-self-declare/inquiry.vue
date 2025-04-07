<script setup lang="ts">
import { ref } from "vue";
import { VCol, VDataTableServer } from "vuetify/components";

const items = ref<
  {
    id: string;
    nama_pu: string;
    alamat: string;
    kota_pu: string;
    jenis_produk: string;
    merek_dagang: string;
    no_daftar: string;
    tgl_daftar: string;
  }[]
>([]);

const tableHeader = [
  { title: "No", key: "no" },
  { title: "No. Daftar", key: "no_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Alamat", key: "alamat" },
  { title: "Jenis Produk", key: "jenis_produk" },
  // { title: "Merk Dagang", key: "merek_dagang" },
  { title: "Action", key: "action" },
];

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const selectedFilterProduk = ref("");
const selectedFilterFasilitasi = ref("");
const selectedFilterLembaga = ref("");
const selectedFilterPendamping = ref("");
const filterLembaga = ref([]);
const filterFasilitasi = ref([]);
const filterPendamping = ref<any[]>([]);
const filterProduk = ref([]);
const searchQuery = ref("");
const showFilterMenu = ref(false);
const selectedFilterBy = ref("nama_pu");
const loadItem = async (
  page: number,
  size: number,
  selectedFilterProduk: string,
  selectedFilterFasilitasi: string,
  selectedFilterLembaga: string,
  selectedFilterPendamping: string,
  filterBy: string,
  searchQuery: string
) => {
  try {
    loading.value = true;

    const response: any = await $api("/self-declare/komite-fatwa/inquiry-1", {
      method: "get",
      params: {
        page,
        size,
        selectedFilterProduk,
        selectedFilterFasilitasi,
        selectedFilterLembaga,
        selectedFilterPendamping,
        filterBy,
        searchQuery,
      },
    });

    if (response.code === 2000) {
      console.log(response.data, "ini response data");
      items.value = response.data || [];
      totalItems.value = response.total_item || 0;
      loading.value = false;
      console.log("Total Items:", totalItems.value);

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

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFilterProduk.value,
    selectedFilterFasilitasi.value,
    selectedFilterLembaga.value,
    selectedFilterPendamping.value,
    selectedFilterBy.value,
    searchQuery.value
  );
};

const loadFilter = async () => {
  try {
    loading.value = true;

    const response1: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-fasilitasi",
      {
        method: "get",
      }
    );

    const response2: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-lembaga",
      {
        method: "get",
      }
    );

    const response4: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-produk",
      {
        method: "get",
      }
    );

    filterFasilitasi.value = response1.data || [];
    filterLembaga.value = response2.data || [];
    filterProduk.value = response4.data || [];
    loading.value = false;
    console.log(response1.data, "ini response filter fasilitasi");

    return response1;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const loadPendamping = async (page, item, name = "") => {
  try {
    loadingPendamping.value = true;
    const response: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-pendamping",
      {
        method: "get",
        params: {
          page,
          item,
          name,
        },
      }
    );
    console.log("response pendamping ", response);
    if (response.code == 2000) {
      if (page === 1) {
        filterPendamping.value = response.data || [];
      } else {
        filterPendamping.value = [...filterPendamping.value, ...response.data];
      }
      totalItemsPendamping.value = response.total_item || 0;
      return;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    loadingPendamping.value = false;
  }
};
const loadMorePendamping = () => {
  if (
    filterPendamping.value.length < totalItemsPendamping.value &&
    !loadingPendamping.value
  ) {
    pagePendamping.value += 1;
    loadPendamping(pagePendamping.value, itemPerPagePendamping.value, "");
  }
};
const totalItemsPendamping = ref(0);
const searchPendamping = ref("");
const pagePendamping = ref(1);
const itemPerPagePendamping = ref(0);
const loadingPendamping = ref(false);
const debouncedFetchPendamping = debounce(loadPendamping, 500);

const handleInputPendamping = (val: any) => {
  pagePendamping.value = 1;
  debouncedFetchPendamping(
    pagePendamping.value,
    itemPerPagePendamping.value,
    val.target.value
  );
};

onMounted(async () => {
  loading.value = true;
  // await loadItem(
  //   1,
  //   itemPerPage.value,
  //   selectedFilterProduk.value,
  //   selectedFilterFasilitasi.value,
  //   selectedFilterLembaga.value,
  //   selectedFilterPendamping.value,
  //   selectedFilterBy.value,
  //   searchQuery.value
  // );
  await loadPendamping(pagePendamping.value, itemPerPagePendamping.value, "");
  await loadFilter();
  loading.value = false;
});

const applyFilters = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFilterProduk.value,
    selectedFilterFasilitasi.value,
    selectedFilterLembaga.value,
    selectedFilterPendamping.value,
    selectedFilterBy.value,
    searchQuery.value
  );
  showFilterMenu.value = false;
};

const reset = () => {
  selectedFilterProduk.value = "";
  selectedFilterLembaga.value = "";
  selectedFilterFasilitasi.value = "";
  selectedFilterPendamping.value = "";
  searchQuery.value = "";

  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFilterProduk.value,
    selectedFilterFasilitasi.value,
    selectedFilterLembaga.value,
    selectedFilterPendamping.value,
    selectedFilterBy.value,
    searchQuery.value
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
const changeFilterBy = (item) => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFilterProduk.value,
    selectedFilterFasilitasi.value,
    selectedFilterLembaga.value,
    selectedFilterPendamping.value,
    item,
    searchQuery.value
  );
};

const routeStore = useCommonRoutingStore();
const route = useRoute();

const navigateAction = (id: string) => {
  routeStore.setPreviousRoute(route.fullPath);
  routeStore.setCurrentRoute(`/sidang-fatwa/proses-sidang/${id}`);
  navigateTo(`/sidang-fatwa/proses-sidang/${id}`, {
    open: {
      target: "_blank",
    },
  });
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h1 style="font-size: 32px">Inquiry / Pengajuan</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div class="text-h4 font-weight-bold">Data Pengajuan</div>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol
              cols="3"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
              "
            >
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
                <VCard class="pa-3" width="500">
                  <VCardText>
                    <VLabel><b>Jenis Produk</b></VLabel>
                    <VSelect
                      v-model="selectedFilterProduk"
                      placeholder="Pilih Produk"
                      :items="[
                        { code: '', name: 'Pilih Produk' },
                        ...filterProduk,
                      ]"
                      item-title="name"
                      item-value="code"
                      class="mt-3"
                    />
                    <VLabel><b>Fasilitas</b></VLabel>
                    <VSelect
                      v-model="selectedFilterFasilitasi"
                      placeholder="Pilih Fasilitas"
                      :items="[
                        { id: '', name: 'Pilih Fasilitas' },
                        ...filterFasilitasi,
                      ]"
                      item-title="name"
                      item-value="id"
                      class="mt-3"
                    />
                    <VLabel><b>Lembaga</b></VLabel>
                    <VSelect
                      v-model="selectedFilterLembaga"
                      placeholder="Pilih Lembaga"
                      :items="[
                        { id: '', name: 'Pilih Lembaga' },
                        ...filterLembaga,
                      ]"
                      item-title="name"
                      item-value="id"
                      class="mt-3"
                    />
                    <VLabel><b>Pendamping</b></VLabel>
                    <VAutocomplete
                      :items="filterPendamping"
                      v-model="selectedFilterPendamping"
                      item-value="id"
                      item-title="name"
                      density="compact"
                      placeholder="Pilih atau Cari Pendamping"
                      :loading="loadingPendamping"
                      @input="handleInputPendamping"
                    >
                      <template #item="{ props, item }">
                        <VListItem
                          v-bind="props"
                          :title="(item.raw as any).name"
                        >
                        </VListItem>
                      </template>
                      <template #append-item>
                        <div v-intersect="loadMorePendamping" />
                      </template>
                    </VAutocomplete>
                  </VCardText>
                  <VCardText>
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
                  </VCardText>
                </VCard>
              </VMenu>
            </VCol>
            <VCol cols="9">
              <VRow>
                <VCol>
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
              </VRow>
              <VRow>
                <VCol>
                  <VTextField
                    v-model="searchQuery"
                    density="compact"
                    placeholder="Search Data"
                    append-inner-icon="ri-search-line"
                    style="max-inline-size: 100%"
                    @input="handleInput"
                  />
                </VCol>
              </VRow>
            </VCol>
            <!-- <VCol cols="12">
              <VTextField
                v-model="searchQuery"
                density="compact"
                placeholder="Search Data"
                append-inner-icon="ri-search-line"
                style="max-inline-size: 100%"
                @input="handleInput"
              />
            </VCol> -->
          </VRow>
          <VRow>
            <VCol>
              <VDataTableServer
                :items-per-page-options="[10, 25, 50, 100]"
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
                    selectedFilterProduk,
                    selectedFilterFasilitasi,
                    selectedFilterLembaga,
                    selectedFilterBy,
                    selectedFilterPendamping,
                    searchQuery
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
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <IconBtn size="small">
                      <VIcon
                        icon="ri-arrow-right-line"
                        color="primary"
                        @click="navigateAction((item as any).id_daftar)"
                      />
                    </IconBtn>
                    <!-- Right arrow icon for action -->
                  </div>
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
<style lang="css" scoped>
/* Style to truncate long text with ellipsis */
.custom-select .text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
