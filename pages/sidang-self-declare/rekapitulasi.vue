<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const items = ref<
  {
    belum_ditetapkan: number;
    dikembalikan: number;
    ditetapkan: number;
    ditolak: number;
    sub_total: number;
    total: number;
    user_id: string;
  }[]
>([]);

const tableHeader = [
  { title: "No", key: "no" },
  { title: "User ID", key: "user_id" },
  { title: "Ditetapkan Halal", key: "ditetapkan" },
  { title: "Dikembalikan", key: "dikembalikan" },
  { title: "Ditolak", key: "ditolak" },
  { title: "Sub Total", key: "sub_total" },
  { title: "Belum Ditetapkan", key: "belum_ditetapkan" },
  { title: "Total", key: "total" },
];

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const startDate = ref(formatToYYYYMMDD(new Date(0)));
const endDate = ref(formatToYYYYMMDD(new Date()));
const filterFasilitasi = ref([]);
const filterPendamping = ref([]);
const filterProduk = ref([]);
const searchQuery = ref("");
const showFilterMenu = ref(false);

const loadItem = async (
  page: number,
  size: number,
  startDate: string,
  endDate: string,
  searchQuery: string
) => {
  try {
    loading.value = true;

    const response: any = await $api(
      "/self-declare/komite-fatwa/rekapitulasi",
      {
        method: "get",
        params: {
          page,
          size,
          startDate,
          endDate,
          searchQuery,
        },
      }
    );

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

const debouncedFetch = debounce(loadItem, 1000);

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    startDate.value,
    endDate.value,
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
    // console.log(response1.data, "ini response filter fasilitasi");

    return response1;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

onMounted(async () => {
  // loading.value = true;
  // await loadItem(1, itemPerPage.value, startDate.value, endDate.value, searchQuery.value)
  // await loadFilter()
  // loading.value = false;
});

const applyFilters = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    startDate.value,
    endDate.value,
    searchQuery.value
  );
  showFilterMenu.value = false;
};

const reset = () => {
  startDate.value = "";
  endDate.value = "";
  searchQuery.value = "";

  debouncedFetch(
    page.value,
    itemPerPage.value,
    startDate.value,
    endDate.value,
    searchQuery.value
  );

  showFilterMenu.value = false;
};

const now = new Date();
const currentMonth = now.toLocaleString("default", { month: "2-digit" });
const currentYear = now.getFullYear();
const currentDay = now.getDate();
const date = ref("");
const changeData = (item) => {
  if (!date.value.includes("to")) return;

  const rangeDate = date.value.split(" to ");
  startDate.value = convertDDMMYYYYtoISO(rangeDate[0]);
  endDate.value = convertDDMMYYYYtoISO(rangeDate[1]);

  debouncedFetch(
    page.value,
    itemPerPage.value,
    startDate.value,
    endDate.value,
    searchQuery.value
  );
};
</script>

<template>
  <div>
    <h1 style="font-size: 32px">Rekapitulasi</h1>
    <br />

    <VCard class="pa-4">
      <VCardTitle class="text-h4 font-weight-bold">
        Daftar Rekapitulasi
      </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="12" md="4">
            <AppDateTimePicker
              v-model="date"
              placeholder="Select Range Date"
              :config="{
                mode: 'range',
                dateFormat: 'd-m-Y',
                disable: [
                  {
                    from: `${currentDay + 1}-${currentMonth}-${currentYear}`,
                    to: `99-99-9999`,
                  },
                ],
              }"
              @update:model-value="changeData"
            />
          </VCol>
          <VCol cols="12" md="8">
            <VTextField
              v-model="searchQuery"
              placeholder="Cari User ID"
              append-inner-icon="ri-search-line"
              @input="handleInput"
            />
          </VCol>
        </VRow>
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          :items-per-page-options="[10, 25, 50, 100]"
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="tableHeader"
          :items="items"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
          @update:options="loadItem(page, itemPerPage, startDate, endDate)"
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.ditetapkan="{ item }">
            {{ parseInt(item.ditetapkan).toLocaleString("id") }}
          </template>
          <template #item.dikembalikan="{ item }">
            {{ parseInt(item.dikembalikan).toLocaleString("id") }}
          </template>
          <template #item.ditolak="{ item }">
            {{ parseInt(item.ditolak).toLocaleString("id") }}
          </template>
          <template #item.sub_total="{ item }">
            {{ parseInt(item.sub_total).toLocaleString("id") }}
          </template>
          <template #item.belum_ditetapkan="{ item }">
            {{ parseInt(item.belum_ditetapkan).toLocaleString("id") }}
          </template>
          <template #item.total="{ item }">
            {{ parseInt(item.total).toLocaleString("id") }}
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </div>
</template>
