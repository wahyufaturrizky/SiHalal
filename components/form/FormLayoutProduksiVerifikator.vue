<script setup lang="ts">
import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue";
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue";

const headers = [
  { title: "No", key: "no" },
  { title: "Nama Pabrik", key: "nama_pabrik", nowrap: true },
  {
    title: "File Layout Pabrik",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];

const items = ref([])

const route = useRoute();
const getLayout = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/proses/layout", {
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
  await getLayout();
});
// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Layout / Denah Ruang Produksi </span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="headers" :items="items">
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.file="{ item }">
          <v-btn
            :disabled="item.file_layout == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="download(item.file_layout)"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
