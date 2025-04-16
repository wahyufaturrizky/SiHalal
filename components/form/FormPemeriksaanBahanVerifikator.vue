<script setup lang="ts">
const headers = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama" },
  { title: "Tipe Penambahan", key: "type" },
  { title: "Lokasi", key: "lokasi" },
  { title: "Tanggal Pembelian", key: "tgl_pembelian" },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];

const items = ref([]);
const page = ref(1);
const itemsPerPage = ref(10);

const route = useRoute();
const getBahan = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/bahan/check", {
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
  await getBahan();
});
// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item, "FILES");
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Formulir Pemeriksaan Bahan</span>
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
        <template #item.type="{ item }">
          {{ item.FileDok == "" ? "Manual" : "Unggah Foto" }}
        </template>
        <template #item.file="{ item }">
          <v-btn
            :disabled="item.FileDok == ''"
            color="primary"
            variant="plain"
            @click="download(item.FileDok)"
          >
            <VIcon>mdi-download</VIcon>
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
