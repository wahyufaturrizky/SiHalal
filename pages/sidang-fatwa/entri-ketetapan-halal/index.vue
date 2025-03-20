<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from "vue";
import { VDataTableServer } from "vuetify/components";
const { t } = useI18n();

const loadingAll = ref(true);
const sessionData = await useMyAuthUserStore().getSession();
const isKomisiPusat = sessionData?.value?.name === 'Komisi Fatwa Pusat'

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const showFilterMenu = ref(false);
const page = ref(1);
const searchQuery = ref("");
const filterProvinsi = ref([]);
const selectedProvince = ref("")

const loadItem = async ({
  page,
  size,
  keyword,
  provinsi,
}: {
  page: number;
  size: number;
  keyword: string;
  provinsi: string;
}) => {
  try {
    loading.value = true;

    const response: any = await $api("/sidang-fatwa/entri-ketetapan-halal", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        provinsi,
      },
    });

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

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    provinsi: selectedProvince.value,
  });
};

const getProvince = async () => {
  const response: any = await $api(
    "/sidang-fatwa/task-force/provinsi",
    {
      method: "get",
    }
  );
  filterProvinsi.value = response.data
}

const applyFilters = () => {
  loadItem({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    provinsi: selectedProvince.value,
  })
};

const reset = () => {
  selectedProvince.value = ''
  loadItem({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    provinsi: selectedProvince.value,
  })
};

onMounted(async () => {
  const res = await Promise.all([
    loadItem({
      page: page.value,
      size: itemPerPage.value,
      keyword: searchQuery.value,
      provinsi: selectedProvince.value,
    }),
    getProvince(),
  ]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const verifikatorTableHeader = [
  { title: "No", key: "no" },
  { title: "Nomor Daftar", key: "no_daftar" },
  { title: "Tanggal Daftar", key: "tgl_daftar" },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Alamat", key: "alamat" },
  { title: "Skala Usaha", key: "skala_usaha" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Merek Dagang", key: "merk_dagang" },
  // { title: "Lihat Laporan SPH", key: "laporan_sph" },
  { title: "Action", key: "action" },
];

const navigateAction = (id: string) => {
  navigateTo(`/sidang-fatwa/entri-ketetapan-halal/${id}`);
};
</script>

<template>
  <div>
    <h1 style="font-size: 32px;">Tabel Pengajuan Ketetapan Halal</h1>
    <br />
    <VCard class="pa-4">
      <VRow v-if="!loadingAll">
        <VCol>
          <div class="text-h4 font-weight-bold">Data Pengajuan</div>
        </VCol>
      </VRow>
      <VRow v-if="isKomisiPusat">
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
              <div class="mt-5">
                <label>{{ t('task-force.proses-sidang.filter.province') }}</label>
                <VSelect
                  v-model="selectedProvince"
                  :items="filterProvinsi"
                  class="-mt-10"
                  item-title="name"
                  item-value="code"
                  style="background-color: white;"
                />
              </div>
              <div class="mt-5">
                <VBtn
                  style="float: inline-start;"
                  text="Reset Filter"
                  @click="reset"
                />
                <VBtn
                  style="float: inline-end;"
                  color="primary"
                  @click="applyFilters"
                >
                  Apply Filters
                </VBtn>
              </div>
            </VCard>
          </VMenu>
        </VCol>
      </VRow>
      <VRow v-if="!loadingAll">
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow v-if="!loadingAll">
        <VCol>
          <VDataTableServer
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="verifikatorTableHeader"
            :items="items"
            :loading="loading"
            :items-length="totalItems"
            loading-text="Loading..."
            @update:options="
              loadItem({
                page: page,
                size: itemPerPage,
                keyword: searchQuery,
                provinsi: selectedProvince.value,
              })
            "
          >
            <template #item.no="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tgl_daftar="{ item }">
              {{ formatDate((item as any).tgl_daftar) }}
            </template>
            <template #item.laporan_sph="{ item }">
              <VBtn
                color="primary"
                @click="navigateAction((item as any).id_reg)"
              >
                {{
                  (item as any).laporan_sph
                    ? "Lihat Dokumen"
                    : "Tidak Ada Dokumen"
                }}
              </VBtn>
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <VIcon
                  icon="ri-arrow-right-line"
                  color="primary"
                  @click="navigateAction((item as any).id_reg)"
                />
              </div>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
      <VSkeletonLoader type="card" v-else />
    </VCard>
  </div>
</template>

<style scoped lang="scss"></style>
