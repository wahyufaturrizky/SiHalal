<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "index" },
  { title: "Tanggal Daftar", value: "tgl_daftar" },
  { title: "Kode Fasilitasi", value: "kode_fac" },
  { title: "Tahun", value: "tahun" },
  { title: "Nama Fasilitasi", value: "fac_name" },
  { title: "Sumber Pembiayaan", value: "sumber_biaya" },
  { title: "Jenis", value: "jenis" },
  { title: "Tanggal Aktif", value: "tgl_aktif" },
  { title: "tanggal Selesai", value: "tgl_selesai" },
  { title: "Kuota", value: "kuota" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action", align: "center" }, // Kolom Action
];

const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusItem = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const loadItem = async (page: number, size: number, keyword: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/verifikator/list", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        status: "OF10",
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const searchQuery = ref("");

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
};
const navigateAction = (id: string) => {
  navigateTo(`/facilitator/verifikasi/${id}`);
};

const dataSOF = ref();
const loadSOF = async () => {
  try {
    const response = await $api("/master/source-of-fund", {
      method: "get",
    });

    if (response.length) {
      dataSOF.value = response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan asd", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const formatSof = (val: string) => {
  return dataSOF.value.find((item: any) => item.code === val)?.name;
};
onMounted(async () => {
  await loadSOF();
});

import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const maxWidthSearch = computed(() => (mdAndUp ? 700 : "90%"));
</script>

<template>
  <div>
    <p class="text-h4">Verifikasi Fasilitator</p>
    <VCard class="pa-4">
      <p class="text-h5">Daftar pengajuan Fasilitasi</p>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            :max-width="maxWidthSearch"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="tableHeader"
          :items-length="totalItems"
          :loading="loading"
          loading-text="Loading..."
          :items="items"
          @update:options="loadItem(page, itemPerPage, searchQuery)"
        >
          <template #item.index="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.tgl_aktif="{ item }">
            {{ formatDateIntl(new Date(item.tgl_aktif)) }}
          </template>
          <template #item.tgl_selesai="{ item }">
            {{ formatDateIntl(new Date(item.tgl_selesai)) }}
          </template>
          <template #item.sumber_biaya="{ item }">
            {{ formatSof(item.sumber_biaya) }}
          </template>
          <template #item.status="{ item }">
            <VChip label :color="statusItem[item.status_code].color">
              {{ statusItem[item.status_code].desc }}
            </VChip>
          </template>
          <template #item.action="{ item }">
            <VBtn variant="text" icon @click="navigateAction(item.id)">
              <VIcon>mdi-chevron-right</VIcon>
            </VBtn>
          </template>
        </VDataTableServer>
      </VRow>
    </VCard>
  </div>
</template>
