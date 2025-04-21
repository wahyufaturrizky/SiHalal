<script setup lang="ts">
const headers = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama", nowrap: true },
  { title: "Jabatan", key: "jabatan", nowrap: true },
  { title: "Posisi", key: "posisi", nowrap: true },
  {
    title: "Action",
    value: "action",
    sortable: false,
    nowrap: true,
    fixed: true,
  },
];
const items = ref([]);
const route = useRoute();
const page = ref(1);
const itemsPerPage = ref(10);

const getKomitmen = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/komitmen", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
    });
    if (response.code != 2000) {
      userSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    items.value = response.data;
  } catch (error) {
    userSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};
onMounted(async () => {
  await getKomitmen();
});
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Komitmen Dan Tanggung Jawab</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :page="page"
        @update:page="(newPage) => (page = newPage)"
        @update:items-per-page="(newSize) => (itemsPerPage = newSize)"
      >
        <template v-slot:item.no="{ index }">
          {{ (page - 1) * itemsPerPage + index + 1 }}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
