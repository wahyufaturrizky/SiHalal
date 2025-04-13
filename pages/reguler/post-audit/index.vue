<script setup lang="ts">
const router = useRouter();
const dataTable = ref<any[]>([]);
const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const totalItems = ref<number>(0);
const searchQuery = ref<string>("");
const showFilterMenu = ref(false);
const loadingAll = ref(true);
const getWithFilter = ref<boolean>(false);
const listChannel = ref<any[]>([]);
const skalaUsaha = ref<any[]>([]);
const provinceData = ref<any[]>([]);

const invoiceHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nomor Daftar", value: "nomor_daftar", nowrap: true },
  { title: "Tanggal", value: "tanggal", nowrap: true },
  { title: "Nama PU", value: "nama_pu", nowrap: true },
  { title: "Jenis Daftar", value: "jenis_daftar", nowrap: true },
  { title: "Jenis Produk", value: "jenis_produk", nowrap: true },
  {
    title: "Jenis Usaha dan Jumlah",
    value: "jenis_usaha_jumlah",
    nowrap: true,
  },
  { title: "Status", value: "status", nowrap: true },
  { title: "Tanggal Dikirim Oleh BPJPH", value: "tgl_dikirim", nowrap: true },
  { title: "Action", value: "actions", align: "center" },
];

const selectedFilters = ref({
  jenisLayanan: "Semua",
  jenisProduk: "Semua",
  provinsi: "Semua",
  lph: "Semua",
});

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  search: string = "",
  path: string
) => {
  try {
    let params: any = {
      page: pageNumber,
      size: sizeData,
      search,
      url: path,
    };
    if (getWithFilter.value) {
      params = {
        ...params,
        skala_code: selectedFilters.value.jenisProduk.replace("Semua", ""),
        provinsi_code: selectedFilters.value.provinsi.replace("Semua", ""),
        channel_code: selectedFilters.value.jenisLayanan.replace("Semua", ""),
      };
    }

    const response: any = await $api("/reguler/lph/list", {
      method: "get",
      params,
    });

    if (response?.code === 2000) {
      if (path === LIST_CHANNEL_PATH) {
        const newData: any = [{ name: "Semua", code: "" }];

        response?.data.map((item: any) => {
          return newData.push(item);
        });
        loading.value = false;

        return newData;
      }

      return response;
    } else {
      loading.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loading.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleSearch = async (
  pageNumber: number,
  sizeData: number,
  search: string = "",
  path: string
) => {
  try {
    let params = {
      page: pageNumber,
      size: sizeData,
      search,
      url: path,
    };
    if (getWithFilter.value) {
      params = {
        ...params,
        skala_code: selectedFilters.value.jenisProduk.replace("Semua", ""),
        provinsi_code: selectedFilters.value.provinsi.replace("Semua", ""),
        channel_code: selectedFilters.value.jenisLayanan.replace("Semua", ""),
      };
    }

    const response: any = await $api("/reguler/lph/list", {
      method: "get",
      params,
    });

    if (response?.code === 2000) return (dataTable.value = response.data);
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getMasterSkalaUsaha = async () => {
  const response: any[] = await $api("/master/business-entity-scale", {
    method: "get",
  });

  const newData: any = { name: "Semua", code: "" };

  response.unshift(newData);

  return response;
};

const getMasterProvinsi = async () => {
  const response: any[] = await $api("/master/province", { method: "get" });

  const newData: any = { name: "Semua", code: "" };

  response.unshift(newData);

  return response;
};

const handleInput = (e: any) => {
  debounce(
    handleSearch(page.value, size.value, e.target.value, LIST_POST_AUDIT),
    500
  );
};

const applyFilters = async () => {
  showFilterMenu.value = false;
  getWithFilter.value = true;
  handleSearch(page.value, size.value, searchQuery.value, LIST_POST_AUDIT);
};

onMounted(async () => {
  const responseData: any = await Promise.allSettled([
    loadItem(page.value, size.value, searchQuery.value, LIST_POST_AUDIT),
    loadItem(page.value, size.value, searchQuery.value, LIST_CHANNEL_PATH),
    getMasterSkalaUsaha(),
    getMasterProvinsi(),
  ]);

  if (responseData) {
    dataTable.value = responseData?.[0]?.value?.data || [];
    totalItems.value = responseData?.[0]?.value?.total_item || 0;
    listChannel.value = responseData?.[1]?.value || [];
    skalaUsaha.value = responseData?.[2]?.value || [];
    provinceData.value = responseData?.[3]?.value || [];
    loadingAll.value = false;
  }
});

watch([page, size], async () => {
  const newData = await loadItem(
    page.value,
    size.value,
    searchQuery.value,
    LIST_POST_AUDIT
  );
  dataTable.value = newData?.data;
  totalItems.value = newData?.total_item;
});
</script>

<template>
  <!-- <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div> -->
  <VRow no-gutters>
    <VCol>
      <h1 style="font-size: 32px">Audit Data Pengajuan</h1>
    </VCol>
  </VRow>
  <br />
  <div v-if="!loadingAll">
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle class="my-3 d-flex justify-space-between align-center">
            <div class="text-h4 font-weight-bold">Data Pemeriksaan Produk</div>
          </VCardTitle>
          <VCardText>
            <VRow class="mb-4">
              <VCol cols="2">
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
                    <VSelect
                      v-model="selectedFilters.jenisLayanan"
                      label="Jenis Layanan"
                      :items="listChannel"
                      item-title="name"
                      item-value="code"
                    />
                    <VSelect
                      v-model="selectedFilters.jenisProduk"
                      label="Skala Usaha"
                      :items="skalaUsaha"
                      class="mt-3"
                      item-title="name"
                      item-value="code"
                    />
                    <VSelect
                      v-model="selectedFilters.provinsi"
                      label="Pusat"
                      :items="provinceData"
                      item-title="name"
                      item-value="code"
                      class="mt-3"
                    />
                    <VBtn
                      block
                      color="primary"
                      class="mt-3"
                      @click="applyFilters"
                    >
                      Apply Filters
                    </VBtn>
                  </VCard>
                </VMenu>
              </VCol>
              <VSpacer />
              <VCol cols="9">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Cari Nama Pengajuan"
                  density="compact"
                  append-inner-icon="ri-search-line"
                  style="max-inline-size: 100%"
                  @input="handleInput"
                />
              </VCol>
            </VRow>
            <VDataTableServer
              disable-sort
              :items-per-page-options="[10, 25, 50, 100]"
              v-model:items-per-page="size"
              v-model:page="page"
              :items-length="totalItems"
              class="examination-table border rounded"
              :headers="invoiceHeader"
              :items="dataTable"
              :hide-default-footer="dataTable.length === 0"
              :loading="loading"
              hover
            >
              <template #no-data>
                <div class="w-full mt-2">
                  <div class="pt-2" style="justify-items: center">
                    <img
                      src="~/assets/images/empty-data.png"
                      alt="empty_data"
                    />
                    <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                  </div>
                </div>
              </template>
              <template #item.no="{ index }">
                {{ index + 1 + (page - 1) * size }}
              </template>
              <template #item.tanggal_daftar="{ item }">
                <div v-if="item?.tanggal_daftar">
                  {{ formatDateIntl(new Date(item?.tanggal_daftar)) }}
                </div>
              </template>
              <template #item.jenis_usaha_jumlah="{ item }">
                <VContainer
                  style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                  "
                >
                  <VChip
                    variant="outlined"
                    style="
                      border-color: #49a84c;
                      border-radius: 8px;
                      background-color: #edf6ed;
                    "
                  >
                    <span style="color: #49a84c">
                      {{ item.jenis_usaha }}
                    </span>
                  </VChip>
                  <VChip
                    variant="outlined"
                    style="
                      border-color: #49a84c;
                      border-radius: 8px;
                      background-color: #edf6ed;
                    "
                  >
                    <span style="color: #49a84c">
                      {{ item.jumlah_produk }}
                    </span>
                  </VChip>
                </VContainer>
              </template>
              <template #item.status="{ item }">
                <div class="status-box py-1 px-3 cursor-pointer">
                  {{ item.status }}
                </div>
              </template>
              <template #item.actions="{ item }">
                <VIcon
                  icon="mdi-arrow-right"
                  color="primary"
                  size="x-large"
                  @click="router.push(`/reguler/post-audit/${item?.id_reg}`)"
                />
              </template>
            </VDataTableServer>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <VSkeletonLoader type="card" v-else />
</template>

<style scoped lang="scss">
:deep(.v-data-table.examination-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12) !important;
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}

.green-box {
  color: #49a84c;
  background-color: #edf6ed;
  border: 1px solid #49a84c;
  border-radius: 8px;
  font-size: 12px;
}

.status-box {
  color: #652672;
  background-color: #f0e9f1;
  border: 1px solid #652672;
  border-radius: 8px;
  font-size: 12px;
}
</style>
