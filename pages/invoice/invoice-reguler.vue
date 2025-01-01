<script setup lang="ts">
const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);
const searchQuery = ref("");
const itemsStatus = ref<any[]>([]);

const showFilterMenu = ref(false);
const showUnduhInvoice = ref(false);
const loadingDownloadExcel = ref(false);

const selectedFilters = ref({
  status: "",
  date: "",
});

const tableHeader = [
  { title: "No", value: "no", nowrap: true },
  { title: "No Invoice", value: "no_inv", nowrap: true },
  { title: "Tanggal Invoice", value: "tgl_inv", nowrap: true },
  { title: "Register Number", value: "no_daftar", nowrap: true },
  { title: "Payment Code", value: "va", nowrap: true },
  { title: "Importer's Name", value: "nama", nowrap: true },
  { title: "Due Date", value: "duedate", nowrap: true },
  { title: "Payment Date", value: "tgl_bayar", nowrap: true },
  { title: "Amount", value: "total_inv", nowrap: true },
  { title: "Status", value: "status", nowrap: true },
  { title: "Action", value: "action", nowrap: true },
];

const loadItem = async ({
  page,
  size,
  keyword,
  status,
  date,
}: {
  page: number;
  size: number;
  keyword: string;
  status: string;
  date: string;
}) => {
  try {
    loading.value = true;

    const startDate = date.split(" ")[0];
    const endDate = date.split(" ")[2];

    const response: any = await $api("/reguler/finance/invoice", {
      method: "get",
      params: {
        page,
        size,
        keyword,
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

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    status: selectedFilters.value.status,
    date: selectedFilters.value.date,
  });
};

const applyFilters = () => {
  loadItem({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    status: selectedFilters.value.status,
    date: selectedFilters.value.date,
  });

  showFilterMenu.value = false;
};

const resetFilters = () => {
  selectedFilters.value = {
    status: "",
    date: "",
  };

  searchQuery.value = "";

  loadItem({
    page: page.value,
    size: itemPerPage.value,
    keyword: searchQuery.value,
    status: selectedFilters.value.status,
    date: selectedFilters.value.date,
  });

  showFilterMenu.value = false;
};

onMounted(async () => {
  const res = await Promise.all([
    loadItem({
      page: page.value,
      size: itemPerPage.value,
      keyword: searchQuery.value,
      status: selectedFilters.value.status,
      date: selectedFilters.value.date,
    }),
    loadItemStatusApplication(),
  ]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const downloadDOcument = async (filename: string) => {
  try {
    const response: any = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
      },
    });

    showUnduhInvoice.value = false;

    window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const downloadExcel = async () => {
  loadingDownloadExcel.value = true;

  const startDate = selectedFilters.value.date.split(" ")[0];
  const endDate = selectedFilters.value.date.split(" ")[2];

  try {
    const response: any = await $api(
      "/reguler/finance/invoice/download-excel",
      {
        method: "get",
        params: {
          keyword: searchQuery.value,
          status: selectedFilters.value.status,
          start_date: startDate,
          end_date: endDate,
        },
      }
    );

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
</script>

<template>
  <VRow>
    <VCol cols="12"><h2>Bukti Bayar Reguler</h2></VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle v-if="!loadingAll">
          <VRow>
            <VCol cols="6"><h4>Invoice List</h4></VCol>
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
        <VCardItem v-if="!loadingAll">
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
                    style="width: 100%"
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
                  keyword: searchQuery,
                  status: selectedFilters.status,
                  date: selectedFilters.date,
                })
              "
            >
              <template #item.no="{ index }">
                {{ index + 1 + (page - 1) * itemPerPage }}
              </template>
              <template #item.tgl_inv="{ item }">
                {{ formatDate((item as any).tgl_inv) }}
              </template>
              <template #item.duedate="{ item }">
                {{ formatDate((item as any).duedate) }}
              </template>
              <template #item.tgl_bayar="{ item }">
                {{ formatDate((item as any).tgl_bayar) }}
              </template>
              <template #item.action="{ item }">
                <p
                  v-if="(item as any).file_inv"
                  class="cursor-pointer"
                  @click="downloadDOcument((item as any).file_inv)"
                >
                  <VIcon icon="fa-download" size="xs" color="primary"></VIcon>
                  Unduh Ivoice
                </p>
              </template>
            </VDataTableServer>
          </VRow>
        </VCardItem>
        <VSkeletonLoader type="card" v-else />
      </VCard>
    </VCol>
  </VRow>
</template>
