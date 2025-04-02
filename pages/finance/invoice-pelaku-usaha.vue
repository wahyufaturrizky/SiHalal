<script setup lang="ts">
const data = {
  bill_date: ref([]),
};
const items = ref([]);
const tableHeader = [
  { title: "No", value: "index" },
  { title: "No Invoice", value: "no" },
  { title: "Tanggal Invoice", value: "date" },
  { title: "Register Number", value: "no_daftar" },
  { title: "Payment Code", value: "va" },
  { title: "Importer's Name", value: "importer_name" },
  { title: "Due Date", value: "due_date" },
  { title: "Payment Date", value: "tgl_bayar" },
  { title: "Amount", value: "amount" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);

// const loadItem = async (page: number, size: number, keyword: string = "") => {
//   try {
//     loading.value = true;

//     const response = await $api("/shln/finance/invoice", {
//       method: "get",
//       params: {
//         page,
//         size,
//         keyword,
//       },
//     });
//     if (response.code != 2000) {
//       loading.value = false;

//       useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//       return;
//     }

//     items.value = response.data;
//     totalItems.value = response.total_item;
//     loading.value = false;
//   } catch (error) {
//     useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//     loading.value = false;
//   }
// };

const loadItem = async ({
  page,
  size,
  search,
  status,
  date,
}: {
  page: number;
  size: number;
  search: string;
  status: string;
  date: string;
}) => {
  try {
    loading.value = true;

    const startDate = date.split(" ")[0];
    const endDate = date.split(" ")[2];

    const response: any = await $api("/shln/finance/invoice", {
      method: "get",
      params: {
        page,
        size,
        search,
        status,
        start_date: startDate,
        end_date: endDate,
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
const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem = new Proxy(
  {
    SB001: { color: "warning", desc: "Menunggu Pembayaran" },
    SB002: { color: "warning", desc: "Kurang Bayar" },
    SB003: { color: "warning", desc: "Lebih Bayar" },
    SB004: { color: "success", desc: "Lunas" },
    SB005: { color: "warning", desc: "Konfirmasi Pembayaran" },
    default: { color: "error", desc: "No Status" },
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const loadItemStatusApplication = async () => {
  try {
    const response: any = await $api(
      "/master/application-status-finance-reguler",
      {
        method: "get",
      }
    );

    if (response.length) {
      itemsStatus.value = [...response];
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const itemsStatus = ref<any[]>([]);

const searchQuery = ref("");
const showFilterMenu = ref(false);
const loadingAll = ref(true);

const selectedFilters = ref({
  status: "Semua",
  date: "",
});

const resetFilters = () => {
  selectedFilters.value = {
    status: "Semua",
    date: "",
  };

  searchQuery.value = "";

  loadItem({
    page: page.value,
    size: itemPerPage.value,
    search: searchQuery.value,
    status: selectedFilters.value.status,
    date: selectedFilters.value.date,
  });

  showFilterMenu.value = false;
};

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch({
    page: page.value,
    size: itemPerPage.value,
    search: searchQuery.value,
    status: selectedFilters.value.status,
    date: selectedFilters.value.date,
  });
};

const loadingDownloadExcel = ref(false);

const applyFilters = () => {
  loadItem({
    page: page.value,
    size: itemPerPage.value,
    search: searchQuery.value,
    status: selectedFilters.value.status,
    date: selectedFilters.value.date,
  });

  showFilterMenu.value = false;
};

const downloadExcel = async () => {
  loadingDownloadExcel.value = true;

  const startDate = selectedFilters.value.date.split(" ")[0];
  const endDate = selectedFilters.value.date.split(" ")[2];

  try {
    const response: any = await $api("/shln/finance/invoice/download-excel", {
      method: "get",
      params: {
        search: searchQuery.value,
        status: selectedFilters.value.status,
        start_date: startDate,
        end_date: endDate,
      },
    });

    if (response) {
      downloadFileExcel(response);
      loadingDownloadExcel.value = false;
    } else {
      loadingDownloadExcel.value = false;
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDownloadExcel.value = false;
  }
};

onMounted(async () => {
  const res = await Promise.all([loadItemStatusApplication()]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>
<template>
  <VRow>
    <VCol cols="12">
      <h1 style="font-size: 32px">Bukti Bayar SHLN</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="6">
              <div class="text-h4 font-weight-bold">Invoice List</div>
            </VCol>
            <VCol cols="6" style="display: flex; justify-content: end">
              <VBtn
                :loading="loadingDownloadExcel"
                @click="downloadExcel"
                variant="flat"
                >Download Excel</VBtn
              >
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
              <VMenu
                v-model="showFilterMenu"
                :close-on-content-click="false"
                persistent
              >
                <template #activator="{ props: openMenu }">
                  <VBtn
                    append-icon="fa-filter"
                    v-bind="openMenu"
                    variant="outlined"
                    style="inline-size: 100%"
                    >Filter</VBtn
                  >
                </template>
                <VList>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Status</b></VLabel>
                      <VSelect
                        v-model="selectedFilters.status"
                        density="compact"
                        placeholder="Semua"
                        :items="itemsStatus"
                        item-title="name"
                        item-value="code"
                      ></VSelect>
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VItemGroup>
                      <VLabel><b>Range</b></VLabel>
                      <AppDateTimePicker
                        v-model="selectedFilters.date"
                        density="compact"
                        placeholder="Select date"
                        :config="{ mode: 'range' }"
                      />
                    </VItemGroup>
                  </VListItem>
                  <VListItem>
                    <VBtn block color="primary" @click="applyFilters">
                      Apply Filters
                    </VBtn>
                    <VBtn
                      block
                      color="secondary"
                      class="mt-3"
                      @click="resetFilters"
                    >
                      Reset Filters
                    </VBtn>
                  </VListItem>
                </VList>
              </VMenu>
            </VCol>
            <VCol cols="1"></VCol>
            <VCol cols="8">
              <VTextField
                v-model="searchQuery"
                density="compact"
                placeholder="Cari Nama Pengajuan"
                append-inner-icon="mdi-magnify"
                @input="handleInput"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow>
            <VDataTableServer
              :items-per-page-options="[10, 25, 50, 100]"
              :headers="tableHeader"
              :items="items"
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :loading="loading"
              :items-length="totalItems"
              loading-text="Loading..."
              @update:options="
                loadItem({
                  page: page,
                  size: itemPerPage,
                  search: searchQuery,
                  status: selectedFilters.status,
                  date: selectedFilters.date,
                })
              "
            >
              <template #item.index="{ index }">
                {{ index + 1 + (page - 1) * itemPerPage }}
              </template>
              <template #item.date="{ item }">
                {{ formatDate((item as any).date) }}
              </template>
              <template #item.amount="{ item }">
                {{ formatToIDR(item.amount) }}
              </template>
              <template #item.tgl_inv="{ item }">
                {{ formatToISOString(item.tgl_inv) }}
              </template>
              <template #item.due_date="{ item }">
                {{ formatToISOString(item.due_date) }}
              </template>
              <template #item.tgl_bayar="{ item }">
                {{ formatToISOString(item.tgl_bayar) }}
              </template>
              <template #item.status="{ item }">
                <VChip
                  :color="statusItem[item.status].color"
                  text-color="white"
                  small
                >
                  {{ statusItem[item.status].desc }}
                </VChip>
              </template>

              <template #item.action="{ item }">
                <p
                  v-if="(item as any).invoice_url"
                  class="cursor-pointer"
                  @click="
                    downloadDocument((item as any).invoice_url, 'INVOICE')
                  "
                >
                  <VIcon icon="fa-download" size="xs" color="primary"></VIcon>
                  Unduh Ivoice
                </p>
              </template>
            </VDataTableServer>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
