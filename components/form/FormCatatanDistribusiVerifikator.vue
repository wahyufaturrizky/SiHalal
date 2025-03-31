<script setup lang="ts">
const catatanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Catatan", key: "nama_produk", nowrap: true },
  { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
  { title: "Jumlah", key: "jumlah", nowrap: true },
  { title: "Tanggal Distribusi", key: "tanggal", nowrap: true },
  { title: "Tujuan", key: "tujuan", nowrap: true },
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

const getCatatanDistribusi = async () => {
  try {
    const response = await $api(
      "/reguler/verifikator/detail/proses/catatan-distribusi",
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
  await downloadDocument(item,'FILE');
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Distribusi / Penjualan Produk </span>
    </VCardTitle>
    <VCardItem>
      <VDataTableServer
        v-model:items-per-page="size"
        v-model:page="page"
        :headers="catatanHeaders"
        :items="catatanItems"
        :items-length="totalData"
        @update:options="getCatatanDistribusi"
      >
        <template #item.no="{ index }">
          {{ (page - 1) * size + index + 1 }}
        </template>
        <template #item.file="{ item }">
          <VBtn
            :disabled="item.file_dok === ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="download(item)"
          >
            File
          </VBtn>
        </template>
      </VDataTableServer>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
