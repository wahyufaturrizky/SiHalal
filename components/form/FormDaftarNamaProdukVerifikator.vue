<script setup lang="ts">
const snackBar = useSnackbar();

const headers = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "nama" },
  {
    title: "Foto Produk",
    key: "foto",
    value: "foto",
    sortable: false,
    nowrap: true,
  },
];

const items = ref([]);
const route = useRoute();
const page = ref(1);
const itemsPerPage = ref(10);

const getProduct = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/bahan/product", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    items.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};
onMounted(async () => {
  await getProduct();
});
// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item, "PRODUCT");
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Daftar Nama Produk</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :page="page"
        @update:page="newPage => page = newPage"
        @update:items-per-page="newSize => itemsPerPage = newSize"
      >
        <template v-slot:item.no="{ index }">
          {{ (page - 1) * itemsPerPage + index + 1 }}
        </template>
        <template #item.foto="{ item }">
          <v-btn color="primary" variant="plain" @click="download(item.foto)">
            <VIcon>mdi-download</VIcon> File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
