<script setup lang="ts">
const items = ref();
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const searchQuery = ref("");

const loadItem = async (page: number, size: number, keyword: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/entry", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
    useSnackbar().sendSnackbar("Sukses update data", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const debouncedFetch = debounce(loadItem, 500);

onMounted(async () => {
  await loadItem(1, itemPerPage.value, "");
});

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
};

const tableHeader = [
  { title: "No", key: "id" },
  { title: "Kode Fasilitasi", key: "kode_fac" },
  { title: "Tahun", key: "tahun" },
  { title: "Nama Fasilitasi", key: "fac_name" },
  { title: "Sumber Pembiayaan", key: "sumber_biaya" },
  { title: "Jenis", key: "jenis" },
  { title: "Action", key: "action" },
];

const navigateAction = (id: string) => {};
</script>

<template>
  <VRow>
    <VCol><h3>Entri Fasilitasi</h3></VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle><h4>List Fasilitasi</h4></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="searchQuery"
                placeholder="Cari data"
                append-icon="mdi-magnify"
                @input="handleInput"
              />
            </VCol>
            <VCol cols="6" style="display: flex; justify-content: end">
              <EntryFacilitateModal />
            </VCol>
          </VRow>
          <VRow>
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :headers="tableHeader"
              :items="items"
              :loading="loading"
              :items-length="totalItems"
              loading-text="Loading..."
              @update:options="loadItem(page, itemPerPage, searchQuery)"
            >
              <template #item.id="{ index }">
                {{ index + 1 + (page - 1) * itemPerPage }}
              </template>
              <template #item.tgl_daftar="{ item }">
                {{ formatDateIntl(new Date(item.tgl_daftar)) }}
              </template>
              <template #item.action="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <VIcon
                      icon="ri-arrow-right-line"
                      color="primary"
                      @click="navigateAction(item.id)"
                    />
                  </IconBtn>
                </div>
              </template>
            </VDataTableServer>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
