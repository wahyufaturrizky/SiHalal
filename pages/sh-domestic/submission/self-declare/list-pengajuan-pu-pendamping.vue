<template>
  <v-container>
    <kembali-button class="pl-0" />
    <h3 class="text-h3">Cek Data Pengajuan PU</h3>
    <br />

    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold"
        >Data Pengajuan</v-card-title
      >
      <v-card-item>
        <v-text-field
          v-model="searchQuery"
          density="compact"
          placeholder="Search Data"
          append-inner-icon="ri-search-line"
          style="max-width: 100%"
          @input="handleInput"
        />
      </v-card-item>
      <v-card-item>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          fixed-header
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :loading="loading"
          :items-length="totalItems"
          @update:options="getpuApi(page, itemPerPage, searchQuery, status)"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.create_on="{ item }">
            {{ new Date(item.create_on).toISOString().substring(0, 10) }}
          </template>
          <template #item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status_reg)"
              label
              variant="outlined"
            >
              {{ item.status_reg }}
            </v-chip>
          </template>
          <template #item.action="{ item }">
            <v-icon
              color="primary"
              style="cursor: pointer"
              @click="navigateTo(`/sh-submission/detail/${item.id}`)"
            >
              ri-arrow-right-line
            </v-icon>
          </template>
        </v-data-table>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);
const searchQuery = ref("");

const headers = [
  { title: "No", key: "no" },
  { title: "Tanggal Masuk", key: "create_on", nowrap: true },
  { title: "Nama PU", key: "nama_pu", nowrap: true },
  { title: "Alamat", key: "alamat_pu", nowrap: true },
  { title: "Penanggung Jawab", key: "nama_pj", nowrap: true },
  { title: "Nomor Kontak", key: "no_kontak_pj", nowrap: true },
  { title: "Jenis Usaha", key: "jenis_usaha", nowrap: true },
  { title: "Skala Usaha", key: "skala_usaha", nowrap: true },
  { title: "Merek Dagang", key: "merek_dagang", nowrap: true },
  { title: "Status", key: "status_reg", nowrap: true },
  { title: "Action", key: "action", sortable: false, nowrap: true },
];

const items = ref([]);

const getStatusColor = (status: string) => {
  if (status === "Verifikasi") return "primary";
  return "grey";
};

const navigateTo = (url: string) => {
  window.location.href = url;
};

const getpuApi = async (
  page: number,
  size: number,
  keyword: string = "",
  status: string = ""
) => {
  try {
    loading.value = true;

    const response: any = await $api("/self-declare/pendamping/getpu", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        status,
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
    // return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const nextPage = async () => {
  if (condition) {
  }
};

onMounted(async () => {
  await getpuApi(page.value, itemPerPage.value);
});
</script>
