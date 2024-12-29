<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

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
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Alamat", key: "alamat" },
  { title: "Merk Dagang", key: "merek_dagang" },
  { title: "No. Daftar", key: "no_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
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
const filterPendamping = ref([]);
const filterProduk = ref([]);
const searchQuery = ref("");
const showFilterMenu = ref(false);

const loadItem = async (
  page: number,
  size: number,
  selectedFilterProduk: string,
  selectedFilterFasilitasi: string,
  selectedFilterLembaga: string,
  selectedFilterPendamping: string,
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

    const response3: any = await $api(
      "/self-declare/komite-fatwa/proses-sidang/filter-pendamping",
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
    filterPendamping.value = response3.data || [];
    filterProduk.value = response4.data || [];
    loading.value = false;
    console.log(response1.data, "ini response filter fasilitasi");

    return response1;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  await loadItem(
    1,
    itemPerPage.value,
    selectedFilterProduk.value,
    selectedFilterFasilitasi.value,
    selectedFilterLembaga.value,
    selectedFilterPendamping.value,
    searchQuery.value
  );
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
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <h2>Inquiry / Pengajuan</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
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
                    >
                      <template v-slot:default-item="{ props, item }">
                        <v-list-item v-bind="props" class="text-truncate">
                          <v-list-item-title class="text-truncate"
                            >ASD</v-list-item-title
                          >
                        </v-list-item>
                      </template></VSelect
                    >
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
                    <VSelect
                      v-model="selectedFilterPendamping"
                      placeholder="Pilih Pendamping"
                      :items="[
                        { id: '', name: 'Pilih Pendamping' },
                        ...filterPendamping,
                      ]"
                      item-title="name"
                      item-value="id"
                      class="mt-3"
                    />
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
            <VCol cols="1" />
            <VCol cols="8">
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
                @update:options="loadItem(page, itemPerPage)"
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
                <template #item.jenis_produk="{ item }">
                  {{ findProdukByCode(item.jenis_produk) }}
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
