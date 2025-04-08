<script setup lang="ts">
const catatanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
  { title: "Jumlah", key: "jumlah", nowrap: true },
  { title: "Tanggal Produksi", key: "tanggal_produksi", nowrap: true },
  { title: "Tanggal Kadaluarsa", key: "tanggal_kadaluarsa", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];

const catatanItems = ref([]);
const size = ref(10);
const page = ref(1);
const totalData = ref(0);

const route = useRoute();
const getCatatanProduksi = async () => {
  try {
    const response = await $api(
      "/reguler/verifikator/detail/proses/catatan-produksi",
      {
        method: "post",
        body: {
          id_reg: route.params.id,
        },
        params: {
          page: page.value,
          size: size.value,
        },
      }
    );
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    catatanItems.value = response.data;
    totalData.value = response.total_data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

// TODO -> LOGIc DOWNLOAD
const download = async (item) => {
  await downloadDocument(item, "FILES");
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Hasil Produksi </span>
    </VCardTitle>
    <VCardItem>
      <VDataTableServer
        :items-per-page-options="[10, 25, 50, 100]"
        v-model:items-per-page="size"
        v-model:page="page"
        :headers="catatanHeaders"
        :items="catatanItems"
        :items-length="totalData"
        @update:options="getCatatanProduksi"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.file="{ item }">
          <v-btn
            :disabled="item.file_dok == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="download(item)"
          >
            File
          </v-btn>
        </template>
      </VDataTableServer>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
