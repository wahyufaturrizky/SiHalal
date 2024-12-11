<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "index" },
  { title: "Kode Fasilitasi", value: "kode_fac" },
  { title: "Tahun", value: "tahun" },
  { title: "Nama Fasilitasi", value: "fac_name" },
  { title: "Sumber Pembiayaan", value: "sumber_biaya" },
  { title: "Jenis", value: "jenis" },
  { title: "Action", value: "action" },
];
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const items = ref([]);
const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/entry", {
      method: "get",
      params: {
        page,
        size,
        keyword: "",
        status: "OF1,OF10,OF5,OF2,OF290",
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
const navigateAction = (id: string) => {
  navigateTo(`/facilitation/entry/${id}`);
};
</script>

<template>
  <VDataTableServer
    :headers="tableHeader"
    v-model:items-per-page="itemPerPage"
    v-model:page="page"
    :items-length="totalItems"
    :loading="loading"
    loading-text="Loading..."
    :items="items"
    @update:options="loadItem(page, itemPerPage)"
  >
    <template #item.index="{ index }">
      {{ index + 1 + (page - 1) * itemPerPage }}
    </template>
    <template #item.action="{ item }">
      <div class="d-flex gap-1">
        <IconBtn size="small" @click="">
          <VIcon
            icon="ri-arrow-right-line"
            color="primary"
            @click="navigateAction(item.id)"
          />
        </IconBtn>
      </div>
    </template>
  </VDataTableServer>
</template>
