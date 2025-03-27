<script setup lang="ts">
const dataTable = ref<any[]>([]);
const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const totalItems = ref(0);
const searchQuery = ref<string>("");
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tableHeader = [
  { title: "No", value: "no" },
  { title: "No. Daftar", value: "no_daftar" },
  {
    title: "status-permohoanan.permohonan-list-tanggal",
    value: "tgl_daftar",
  },
  {
    title: "status-permohoanan.permohonan-list-namapu",
    value: "nama_pu",
  },
  {
    title: "status-permohoanan.permohonan-list-jnsdaftar",
    value: "jenis_daftar",
  },
  {
    title: "status-permohoanan.permohonan-list-jnsprod",
    value: "jenis_produk",
  },
  {
    title: "status-permohoanan.permohonan-list-status",
    value: "status",
  },
  {
    title: "status-permohoanan.permohonan-list-action",
    value: "action",
  },
];

const navigateToDetail = (item: any) => {
  if (item.channel_id == "CH003" || item.channel_id == "CH004") {
    navigateTo(`/sh-domestic/status/self-declare/${item.id_reg}`);
  } else {
    navigateTo(`/sh-domestic/status/reguler/${item.id_reg}`);
  }
};

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  keyword: string = "",
  path: string
) => {
  try {
    const response: any = await $api("/reguler/list", {
      method: "get",
      query: {
        page: pageNumber,
        size: sizeData,
        keyword,
        url: path,
      },
    });

    if (response?.code === 2000) {
      dataTable.value = response?.data;
      totalItems.value = response.total_item || 0;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleInput = (e: any) => {
  debounce(
    loadItem(page.value, size.value, e.target.value, LIST_MENU_STATUS),
    500
  );
};

const handlePagination = async (filters: any) => {
  await loadItem(filters.page, filters.itemsPerPage, "", LIST_MENU_STATUS);
};

onMounted(async () => {
  loading.value = true;
  loadItem(page.value, size.value, searchQuery.value, LIST_MENU_STATUS);
  loading.value = false;
});
</script>

<template>
  <!-- <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow> -->
  <VRow>
    <VCol cols="12">
      <h1 style="font-size: 32px">
        {{ t("status-permohoanan.permohonan-list-title") }}
      </h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div class="text-h4 font-weight-bold">
            {{ t("status-permohoanan.permohonan-list-subtitle") }}
          </div>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="searchQuery"
                :placeholder="t(`status-permohoanan.permohonan-list-search`)"
                density="compact"
                append-inner-icon="ri-search-line"
                style="max-inline-size: 100%"
                @input="handleInput"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTableServer
                v-model:items-per-page="size"
                v-model:page="page"
                :items-length="totalItems"
                :headers="tableHeader"
                :items="dataTable"
                :hide-default-footer="dataTable.length === 0"
                class="border rounded"
                @update:options="handlePagination"
              >
                <template #no-data>
                  <div class="w-full mt-2">
                    <div class="pt-2">
                      <img
                        src="~/assets/images/empty-data.png"
                        alt="empty_data"
                      />
                      <div class="pt-2 pb-2 font-weight-bold">
                        {{ t("status-permohoanan.permohonan-list-no-data") }}
                      </div>
                    </div>
                  </div>
                </template>
                <template #header.tgl_daftar="{ column }">
                  <div>
                    {{ t(column.title) }}
                  </div>
                </template>

                <template #header.nama_pu="{ column }">
                  <div>
                    {{ t(column.title) }}
                  </div>
                </template>

                <template #header.jenis_daftar="{ column }">
                  <div>
                    {{ t(column.title) }}
                  </div>
                </template>

                <template #header.jenis_produk="{ column }">
                  <div>
                    {{ t(column.title) }}
                  </div>
                </template>

                <template #header.status="{ column }">
                  <div>
                    {{ t(column.title) }}
                  </div>
                </template>

                <template #header.action="{ column }">
                  <div>
                    {{ t(column.title) }}
                  </div>
                </template>

                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.status="{ item }">
                  <div style="min-inline-size: 14rem !important">
                    <VChip
                      color="success"
                      text-color="white"
                      small
                      variant="outlined"
                      style="background-color: #edf6ed; margin-inline-end: 1svw"
                    >
                      {{ item?.jenis_usaha }}
                    </VChip>
                    <VChip
                      color="success"
                      text-color="white"
                      small
                      variant="outlined"
                      style="background-color: #edf6ed; margin-inline-end: 1svw"
                    >
                      {{ item?.jumlah_produk }}
                    </VChip>
                    <VChip
                      color="primary"
                      text-color="white"
                      small
                      variant="outlined"
                      style="background-color: #f0e9f1; margin-inline-end: 1svw"
                    >
                      {{ item.status }}
                    </VChip>
                  </div>
                </template>
                <template #item.jenis_produk="{ item }">
                  <div style="min-inline-size: 40rem !important">
                    {{ item.jenis_produk }}
                  </div>
                </template>
                <template #item.no_daftar="{ item }">
                  <div style="min-inline-size: 8rem !important">
                    {{ item.no_daftar }}
                  </div>
                </template>
                <template #item.tgl_daftar="{ item }">
                  <div
                    v-if="item?.tgl_daftar"
                    style="min-inline-size: 5rem !important"
                  >
                    {{ formatDateIntl(new Date(item.tgl_daftar)) }}
                  </div>
                </template>
                <template #item.nama_pu="{ item }">
                  <div style="min-inline-size: 8rem !important">
                    {{ item.nama_pu }}
                  </div>
                </template>
                <template #item.jenis_daftar="{ item }">
                  <div style="min-inline-size: 8rem !important">
                    {{ item.jenis_daftar }}
                  </div>
                </template>
                <template #item.action="{ item }">
                  <VIcon
                    color="primary"
                    icon="mdi-arrow-right"
                    @click="navigateToDetail(item)"
                  />
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
