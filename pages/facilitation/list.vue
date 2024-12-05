<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "index" },
  { title: "Kode Fasilitasi", value: "id" },
  { title: "Tahun", value: "tahun" },
  { title: "Nama Fasilitasi", value: "fac_name" },
  { title: "Sumber Pembiayaan", value: "sumber_biaya" },
  { title: "Jenis", value: "jenis" },
  { title: "Tanggal Aktif", value: "tgl_aktif" },
  { title: "tanggal Selesai", value: "tgl_selesai" },
  { title: "Kuota", value: "kuota" },
  { title: "Sisa", value: "sisa" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action", fixed: true }, // Kolom Action
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

    const response = await $api("/facilitate/list", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        status: "",
      },
    });

    items.value = response.data;
    console.log(items.value);
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
  navigateTo(`/facilitation/entry/${id}`);
};
</script>

<template>
  <h2>Daftar Fasilitasi</h2>
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
            <template #item.status="{ item }">
              <VChip label :color="statusItem[item.status].color">
                {{ statusItem[item.status].desc }}
              </VChip>
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
