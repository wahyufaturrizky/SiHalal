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
    console.log(
      ` initial | total = ${totalItems.value} - page = ${page} - size = ${size}`
    );
    loading.value = true;

    const params = { page, size };
    if (status) params.status = status;

    if (keyword) {
      params.keyword = keyword;
      params.query_by = query_by;
    }

    const response: any = await $api("/self-declare/pendamping/getpu", {
      method: "get",
      params,
    });

    if (response.code === 2000) {
      console.log(
        ` response | total = ${response.total_item} - page = ${page} - size = ${response.total_page}`
      );

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

  if (checkResIfUndefined) loadingAll.value = false;
  else loadingAll.value = false;
});
</script>

<template>
  <div v-if="!loadingAll">
    <!-- <kembali-button class="pl-0" /> -->
    <h1 style="font-size: 32px">Cek Data Pengajuan PU</h1>
    <br />

    <VCard class="pa-4">
      <VCardTitle class="text-h4 font-weight-bold"> Data Pengajuan </VCardTitle>
      <VCardItem>
        <VRadioGroup v-model="queryBy" inline label="Cari Berdasarkan">
          <VRadio label="Pelaku Usaha" value="pelaku_usaha" />
          <VRadio label="Nomor Daftar" value="no_daftar" />
        </VRadioGroup>

        <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Search Data"
          append-inner-icon="ri-search-line"
          style="max-inline-size: 100%"
          clearable
          @input="handleInput"
          @click:clear="handleInput"
        />
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items="items"
          class="elevation-1"
          fixed-header
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
          :items-per-page-options="[10, 25, 50, 100]"
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
                ? formatDateId((item as any).create_on)
                : "-"
            }}
          </template>
          <template #item.status="{ item }">
            <VChip
              :color="getStatusColor((item as any).status_reg)"
              label
              variant="outlined"
            >
              {{ (item as any).status_reg }}
            </VChip>
          </template>
          <template #item.action="{ item }">
            <VIcon
              color="primary"
              style="cursor: pointer"
              @click="navigateTo(`/sh-submission/detail/${(item as any).id}`)"
            >
              ri-arrow-right-line
            </VIcon>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </div>
  <VSkeletonLoader v-else type="card" />
</template>
