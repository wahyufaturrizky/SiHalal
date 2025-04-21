<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VDataTableServer } from "vuetify/components";
const { t } = useI18n();

const items = ref<
  {
    id: string;
    nomor_daftar: string;
    tanggal_daftar: string;
    nama_pu: string;
    alamat: string;
    skala_usaha: string;
    jenis_produk: string;
    merek_dagang: string;
    laporan_sph: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const searchQuery = ref("");
const page = ref(1);
const filterProduk = ref([]);
const filterLph = ref([]);
const filterProvinsi = ref([]);
const filterPendamping = ref([]);
const filterLayanan = ref([]);
const lembaga = ref("");
const fasilitasi = ref("");
const pendamping = ref("");
const filterData = ref({
  layanan: "",
  produk: "",
  provinsi: "",
  lph: "",
});

const loadItem = async () => {
  try {
    loading.value = true;

    const response: any = await $api("/sidang-fatwa/task-force/proses-sidang", {
      method: "get",
      params: {
        page: page.value,
        size: itemPerPage.value,
        keywords: searchQuery.value,
        jenis_layanan: filterData.value.layanan,
        jenis_produk: filterData.value.produk,
        provinsi: filterData.value.provinsi,
        lph: filterData.value.lph,
      },
    });

    items.value = response.data || [];
    totalItems.value = response.total_item || 0;
    loading.value = false;

    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const loadFilter = async () => {
  try {
    loading.value = true;

    const response1: any = await $api("/sidang-fatwa/task-force/layanan", {
      method: "get",
    });

    const response2: any = await $api("/sidang-fatwa/task-force/produk", {
      method: "get",
    });

    const response3: any = await $api("/sidang-fatwa/task-force/provinsi", {
      method: "get",
    });

    const response4: any = await $api("/sidang-fatwa/task-force/lph", {
      method: "get",
    });

    filterLayanan.value = response1.data || [];
    filterProduk.value = response2.data || [];
    filterProvinsi.value = response3.data || [];
    filterLph.value = response4.data || [];
    loading.value = false;

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
const filterSkalaUsaha = ref([]);
const getJenisProduk = async () => {
  try {
    const response4: any = await $api("/master/business-entity-scale", {
      method: "get",
    });
    filterSkalaUsaha.value = response4 || [];
  } catch (error) {}
};
const findSkalaUsahaByCode = (code) => {
  const produk = filterSkalaUsaha.value.find((item) => item.code == code);

  if (produk) {
    return produk.name;
  }
  return code;
};
onMounted(async () => {
  loading.value = true;
  await getJenisProduk();
  await loadPendamping(pagePendamping.value, itemPerPagePendamping.value);
  // await loadItem(
  //   1,
  //   itemPerPage.value,
  //   lembaga.value,
  //   fasilitasi.value,
  //   pendamping.value,
  //   searchQuery.value
  // );
  await loadFilter();
  loading.value = false;
});

const refresh = async () => {
  await loadItem(
    1,
    itemPerPage.value,
    lembaga.value,
    fasilitasi.value,
    pendamping.value,
    searchQuery.value
  );
};

const verifikatorTableHeader = [
  { title: "No", key: "no" },
  { title: "Nomor Daftar", key: "no_daftar", nowrap: true },
  { title: "Tanggal Daftar", key: "tgl_daftar", nowrap: true },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Alamat", key: "alamat" },
  { title: "Skala Usaha", key: "skala_usaha" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Merek Dagang", key: "merk_dagang" },
  { title: "Lihat Laporan LPH", key: "laporan_lph" },
  { title: "Action", key: "action" },
];

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch();
};

const navigateAction = (id: string) => {
  navigateTo(`/sidang-fatwa/task-force/proses-sidang/${id}`, {
    open: {
      target: "_blank",
    },
  });
};

// Filter state
const showFilterMenu = ref(false);
const applyFilters = () => {
  debouncedFetch();
  showFilterMenu.value = false;
};

const reset = () => {
  filterData.value = {
    layanan: "",
    produk: "",
    provinsi: "",
    lph: "",
  };

  debouncedFetch();

  showFilterMenu.value = false;
};
</script>

<template>
  <div>
    <KembaliButton />
    <h1 style="font-size: 32px">{{ t("task-force.proses-sidang.title") }}</h1>
    <br />
    <VCard class="pa-4">
      <VRow>
        <VCol>
          <div class="text-h4 font-weight-bold">
            {{ t("task-force.proses-sidang.subtitle") }}
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol class="d-flex justify-start align-center" cols="2">
          <VMenu
            v-model="showFilterMenu"
            :close-on-content-click="false"
            offset-y
          >
            <template #activator="{ props }">
              <VBtn
                color="primary"
                variant="outlined"
                v-bind="props"
                append-icon="ri-filter-fill"
              >
                Filter
              </VBtn>
            </template>
            <VCard class="pa-3" width="300">
              <div>
                <label>{{
                  t("task-force.proses-sidang.filter.service-type")
                }}</label>
                <VSelect
                  v-model="filterData.layanan"
                  :items="filterLayanan"
                  class="-mt-10"
                  item-title="ref_desc"
                  item-value="jenis_layanan"
                  style="background-color: white"
                />
              </div>
              <div class="mt-5">
                <label>{{
                  t("task-force.proses-sidang.filter.product-type")
                }}</label>
                <VSelect
                  v-model="filterData.produk"
                  :items="filterProduk"
                  class="-mt-10"
                  item-title="ref_desc"
                  item-value="jenis_produk"
                  style="background-color: white"
                />
              </div>
              <div class="mt-5">
                <label>{{
                  t("task-force.proses-sidang.filter.province")
                }}</label>
                <VSelect
                  v-model="filterData.provinsi"
                  :items="filterProvinsi"
                  class="-mt-10"
                  item-title="name"
                  item-value="code"
                  style="background-color: white"
                />
              </div>
              <div class="mt-5">
                <label>{{ t("task-force.proses-sidang.filter.lph") }}</label>
                <VSelect
                  v-model="filterData.lph"
                  :items="filterLph"
                  class="-mt-10"
                  item-title="nama_lph"
                  item-value="lph_id"
                  style="background-color: white"
                />
              </div>
              <div class="mt-5">
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
              </div>
            </VCard>
          </VMenu>
        </VCol>
        <VCol class="d-flex justify-sm-space-between align-center" cols="10">
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
            disable-sort
            :items-per-page-options="[10, 25, 50, 100]"
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :items-length="totalItems"
            class="custom-table"
            :headers="verifikatorTableHeader"
            :items="items"
            :loading="loading"
            loading-text="Loading..."
            @update:options="loadItem(page, itemPerPage, searchQuery)"
          >
            <template #item.no="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <!--
              <template #item.tanggal_daftar="{ item }">
              {{ formatDateIntl(new Date(item?.tanggal_daftar)) || "22-07-2024"}}
              </template>
            -->
            <template #item.merek_dagang="{ item }">
              {{ item.merek_dagang }}
              <!-- Display Merek Dagang value or N/A if not available -->
            </template>
            <template #item.laporan_sph="{ item }">
              <VBtn color="secondary" @click="navigateAction(item.id)">
                Lihat Dokumen
              </VBtn>
              <!-- Button changed to "Lihat Dokumen" -->
            </template>
            <template #item.tgl_daftar="{ item }">
              {{ formatToISOString(item.tgl_daftar) }}
            </template>
            <template #item.skala_usaha="{ item }">
              {{ findSkalaUsahaByCode(item.skala_usaha) }}
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <IconBtn size="small">
                  <VIcon
                    icon="ri-arrow-right-line"
                    color="primary"
                    @click="navigateAction(item.id_reg)"
                  />
                </IconBtn>
                <!-- Right arrow icon for action -->
              </div>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
      justify-items: center;
    }
  }
}
</style>
