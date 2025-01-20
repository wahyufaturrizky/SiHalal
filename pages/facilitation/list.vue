<script setup lang="ts">
import { statusItemFacilitator } from "@/server/utils/statusFasilitator";

const tableHeader = [
  { title: "No", value: "index" },
  { title: "Kode Fasilitasi", value: "kode_fac" },
  { title: "Tahun", value: "tahun" },
  { title: "Nama Fasilitasi", value: "fac_name" },
  { title: "Sumber Pembiayaan", value: "sumber_biaya" },
  { title: "Jenis", value: "jenis" },
  { title: "Tanggal Aktif", value: "tgl_aktif" },
  { title: "tanggal Selesai", value: "tgl_selesai" },
  { title: "Kuota", value: "kuota" },
  { title: "Sisa", value: "sisa" },
  { title: "Status", value: "status_code" },
  { title: "Action", value: "action", fixed: true }, // Kolom Action
];

const items = ref([]);
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const loadItem = async (page: number, size: number, keyword: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/entry", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        status: "OF320",
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
const sourceOfFund = ref<{ code: string; name: string; name_eng: string }[]>();
const getSourceOfFund = (code: string) => {
  const data = sourceOfFund.value?.find((fund) => fund.code == code);
  if (data == undefined) {
    return code;
  }
  return data.name;
};
const searchQuery = ref("");

const debouncedFetch = debounce(loadItem, 500);

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
};
const navigateAction = (id: string) => {
  navigateTo(`/facilitation/entry/${id}`);
};
onMounted(async () => {
  const response = await $api("/master/source-of-fund");
  sourceOfFund.value = response;
});
</script>

<template>
  <h2 style="font-size: 32px">Daftar Fasilitasi</h2>
  <br />
  <VCard>
    <VCardTitle><h3>List Fasilitasi</h3></VCardTitle>
    <VCardItem>
      <VRow>
        <VCol :cols="6">
          <VTextField
            v-model="searchQuery"
            density="compact"
            append-inner-icon="mdi-magnify"
            placeholder="Cari data"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
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
            <template #item.sumber_biaya="{ item }">
              {{ getSourceOfFund(item.sumber_biaya) }}
            </template>
            <template #item.status_code="{ item }">
              <VChip
                label
                :color="statusItemFacilitator[item.status_code].color"
              >
                {{ statusItemFacilitator[item.status_code].desc }}
              </VChip>
            </template>
            <template #item.tgl_aktif="{ item }">
              {{
                new Date(item.tgl_aktif) != "Invalid Date"
                  ? formatDateIntl(new Date(item.tgl_aktif))
                  : ""
              }}
            </template>
            <template #item.tgl_selesai="{ item }">
              {{
                new Date(item.tgl_selesai) != "Invalid Date"
                  ? formatDateIntl(new Date(item.tgl_selesai))
                  : ""
              }}
            </template>
            <template #item.action="{ item }">
              <VBtn variant="text" icon @click="navigateAction(item.id)">
                <VIcon>mdi-chevron-right</VIcon>
              </VBtn>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>
