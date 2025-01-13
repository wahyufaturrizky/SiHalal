<script setup lang="ts">
import { ref } from "vue";

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const loadingAll = ref(true);
const page = ref(1);
const searchQuery = ref("");
const status = ref("");
const queryBy = ref("pelaku_usaha");

const headers = [
  { title: "No", key: "no" },
  { title: "Tanggal Masuk", key: "create_on", nowrap: true },
  { title: "Nama PU", key: "nama_pu", nowrap: true },
  { title: "Alamat", key: "alamat_pu", nowrap: true },
  { title: "Penanggung Jawab", key: "nama_pj", nowrap: true },
  { title: "Nomor Kontak", key: "no_kontak_pj", nowrap: true },
  { title: "Jenis Usaha", key: "jenis_usaha_name", nowrap: true },
  { title: "Skala Usaha", key: "skala_usaha_name", nowrap: true },
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
  status: string,
  query_by: string
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
        query_by,
      },
    });

    if (response.code === 2000) {
      items.value = response.data;
      totalItems.value = response.total_item;
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

const debouncedFetch = debounce(getpuApi, 500);

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    searchQuery.value,
    status.value,
    queryBy.value
  );
};

onMounted(async () => {
  const res = await Promise.all([
    getpuApi(
      page.value,
      itemPerPage.value,
      searchQuery.value,
      status.value,
      queryBy.value
    ),
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
</script>

<template>
  <div v-if="!loadingAll">
    <!-- <kembali-button class="pl-0" /> -->
    <h2 style="font-size: 32px">Cek Data Pengajuan PU</h2>
    <br />

    <v-card class="pa-4">
      <v-card-title class="text-h5 font-weight-bold"
        >Data Pengajuan</v-card-title
      >
      <v-card-item>
        <VRadioGroup inline v-model="queryBy" label="Cari Berdasarkan">
          <v-radio label="Pelaku Usaha" value="pelaku_usaha"></v-radio>
          <v-radio label="Nomor Daftar" value="no_daftar"></v-radio>
        </VRadioGroup>

        <v-text-field
          v-model="searchQuery"
          density="compact"
          placeholder="Search Data"
          append-inner-icon="ri-search-line"
          style="max-width: 100%"
          @input="handleInput"
          clearable
          @click:clear="handleInput"
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
          loading-text="Loading..."
          @update:options="
            getpuApi(page, itemPerPage, searchQuery, status, queryBy)
          "
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.create_on="{ item }">
            {{
              (item as any).create_on
                ? new Date((item as any).create_on)
                    ?.toISOString()
                    .substring(0, 10)
                : "-"
            }}
          </template>
          <template #item.status="{ item }">
            <v-chip
              :color="getStatusColor((item as any).status_reg)"
              label
              variant="outlined"
            >
              {{ (item as any).status_reg }}
            </v-chip>
          </template>
          <template #item.action="{ item }">
            <v-icon
              color="primary"
              style="cursor: pointer"
              @click="navigateTo(`/sh-submission/detail/${(item as any).id}`)"
            >
              ri-arrow-right-line
            </v-icon>
          </template>
        </v-data-table>
      </v-card-item>
    </v-card>
  </div>
  <VSkeletonLoader type="card" v-else />
</template>
