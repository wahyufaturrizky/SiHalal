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
const startDate = ref("");
const endDate = ref("");
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
    console.log(response1.data, "ini response filter fasilitasi");

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
  const rangeDate = date.value.split(" to ");
  startDate.value = formatToISOString(rangeDate[0]);
  endDate.value = formatToISOString(rangeDate[1]);
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
  <VContainer>
    <h3 class="text-h3">Rekapitulasi</h3>
    <br />

    <VCard class="pa-4">
      <VCardTitle class="text-h5 font-weight-bold">
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
              @change="changeData"
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
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </VContainer>
</template>
