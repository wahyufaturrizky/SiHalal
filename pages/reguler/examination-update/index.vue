<script setup lang="ts">
import { isOlderThan15Days } from "@/utils/isOlderThanFifteenDays";

const router = useRouter();

const dataTable = ref<any[]>([]);
const listChannel = ref<any[]>([]);
const skalaUsaha = ref<any[]>([]);
const provinceData = ref<any[]>([]);
const loading = ref<boolean>(false);
const getWithFilter = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const searchQuery = ref<string>("");
const showFilterMenu = ref(false);
const detailStatus = ref<any>(null);
const totalItems = ref<number>(0);

const invoiceHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nomor Daftar", value: "no_daftar", nowrap: true },
  { title: "Tanggal", value: "tanggal_daftar", nowrap: true },
  { title: "Nama PU", value: "nama_pu", nowrap: true },
  { title: "Jenis Daftar", value: "jenis_daftar", nowrap: true },
  { title: "Jenis Produk", value: "jenis_produk", nowrap: true },
  { title: "Status", value: "status", nowrap: true },
  { title: "Tanggal Dikirim Oleh BPJPH", value: "tgl_dikirim", nowrap: true },
  { title: "Action", value: "actions", align: "center" },
];

const isInfoModalOpen = ref(false);

const selectedFilters = ref({
  jenisLayanan: "Semua",
  jenisProduk: "Semua",
  provinsi: "Semua",
  lph: "Semua",
});

const handleOpenInfoModal = () => {
  isInfoModalOpen.value = !isInfoModalOpen.value;
};

const onStatusClicked = (item: string) => {
  isInfoModalOpen.value = !isInfoModalOpen.value;
  detailStatus.value = item;
};

const loadItem = async (
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

    if (response?.code === 2000) {
      if (path === LIST_CHANNEL_PATH) {
        const newData: any = [{ name: "Semua", code: "" }];

        response?.data.map((item: any) => {
          return newData.push(item);
        });

        return newData;
      }
      totalItems.value = response.total_item;

      return response.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
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

const applyFilters = async () => {
  showFilterMenu.value = false;
  getWithFilter.value = true;
  handleSearch(
    page.value,
    size.value,
    searchQuery.value,
    LIST_PEMERIKSAAN_PATH
  );
};

const handleInput = (e: any) => {
  debounce(
    handleSearch(page.value, size.value, e.target.value, LIST_PEMERIKSAAN_PATH),
    500
  );
};

onMounted(async () => {
  loading.value = true;

  const responseData = await Promise.allSettled([
    loadItem(page.value, size.value, searchQuery.value, LIST_PEMERIKSAAN_PATH),
    loadItem(page.value, size.value, searchQuery.value, LIST_CHANNEL_PATH),
    getMasterSkalaUsaha(),
    getMasterProvinsi(),
  ]);

  if (responseData) {
    dataTable.value = responseData?.[0]?.value || [];
    listChannel.value = responseData?.[1]?.value || [];
    skalaUsaha.value = responseData?.[2]?.value || [];
    provinceData.value = responseData?.[3]?.value || [];
  }
  loading.value = false;
});

watch([page, size], async () => {
  const refreshData = await loadItem(
    page.value,
    size.value,
    searchQuery.value,
    LIST_PEMERIKSAAN_PATH
  );

  dataTable.value = refreshData;
});

watch(dataTable, () => {
  dataTable?.value.length > 0 &&
    dataTable.value.map((item: any) => {
      const dateData = item?.tgl_dikirim?.split(" ")[0] || "";
      const dayCount = item?.tgl_dikirim?.split(" ")[1] || "";
      if (dateData) {
        const isFifteenDay = isOlderThan15Days(dateData);
        if (isFifteenDay) {
          detailStatus.value = dayCount;
          setTimeout(() => {
            return (isInfoModalOpen.value = true);
          }, 1500);
        }
      }

      return false;
    });
});
</script>

<template>
  <!--
    <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
    </div>
  -->
  <VRow no-gutters>
    <VCol>
      <h1 style="font-size: 32px">Update Pemeriksaan</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="text-h4 font-weight-bold">Daftar Pemeriksaan Produk</div>
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
            v-model:items-per-page="size"
            v-model:page="page"
            :items-per-page-options="[10, 25, 50, 100]"
            :items-length="totalItems"
            :loading="loading"
            class="border rounded"
            :headers="invoiceHeader"
            :items="dataTable"
            :hide-default-footer="dataTable.length === 0"
            hover
          >
            <template #no-data>
              <div class="w-full mt-2">
                <div class="pt-2" style="justify-items: center">
                  <img src="~/assets/images/empty-data.png" alt="empty_data" />
                  <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
                </div>
              </div>
            </template>
            <template #item.index="{ index }">
              {{ index + 1 + (page - 1) * size }}
            </template>
            <template #item.tanggal_daftar="{ item }">
              {{ item.tanggal_daftar }}
            </template>
            <template #item.businessType="{ item }">
              <div
                v-for="(el, idx) in item.businessType"
                :key="idx"
                class="green-box py-1 px-3 me-3"
              >
                {{ el }}
              </div>
            </template>
            <template #item.status="{ item }">
              <div
                class="status-box py-1 px-3 cursor-pointer"
                @click="() => onStatusClicked(item)"
              >
                {{ item.status }}
              </div>
            </template>
            <template #item.actions="{ item }">
              <VIcon
                icon="mdi-arrow-right"
                color="primary"
                size="x-large"
                @click="
                  router.push(`/reguler/examination-update/${item.id_reg}`)
                "
              />
            </template>
          </VDataTableServer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VDialog v-model="isInfoModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">Info</div>
        <VIcon @click="handleOpenInfoModal"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol> SLA sudah melebihi 15 hari {{ detailStatus }} hari) </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="px-4">
        <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenInfoModal">
          Tutup
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
.green-box {
  border: 1px solid #49a84c;
  border-radius: 8px;
  background-color: #edf6ed;
  color: #49a84c;
  font-size: 12px;
}

.status-box {
  border: 1px solid #652672;
  border-radius: 8px;
  background-color: #f0e9f1;
  color: #652672;
  font-size: 12px;
}
</style>
