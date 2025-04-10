<script setup lang="ts">
const catatanBahanHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Bahan", key: "nama_bahan", nowrap: true },
  { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
  { title: "Jumlah", key: "jumlah", nowrap: true },
  { title: "Tanggal Masuk", key: "tanggal_masuk", nowrap: true },
  { title: "Tanggal Keluar", key: "tanggal_keluar", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];

const catatanBahanItems = ref([]);
const sizeBahan = ref(10);
const pageBahan = ref(1);
const totalDataBahan = ref(0);

const catatanProdukHeaders = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
  { title: "Jumlah", key: "jumlah", nowrap: true },
  { title: "Tanggal Masuk", key: "tanggal_masuk", nowrap: true },
  { title: "Tanggal Keluar", key: "tanggal_keluar", nowrap: true },
  {
    title: "File Dokumen",
    key: "file",
    value: "file",
    sortable: false,
    nowrap: true,
  },
];

const catatanProdukItems = ref([]);
const route = useRoute();

const getBahan = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/proses/bahan", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
      params: {
        page: pageBahan.value,
        size: sizeBahan.value,
      },
    });

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");

      return;
    }
    catatanBahanItems.value = response.data;
    totalDataBahan.value = response.total_data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

const updateOptionsBahan = (options: {
  page: number;
  itemsPerPage: number;
}) => {
  pageBahan.value = options.page;
  sizeBahan.value = options.itemsPerPage;
  getBahan();
};

const getProduk = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/proses/produk", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
    });

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");

      return;
    }
    catatanProdukItems.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
};

// TODO -> LOGIC TO DONWLOAD FILE
const downloadCatatanBahan = async (item) =>
  await downloadDocument(item, "FILES");

// PRODUK
// TODO -> LOGIC TO DONWLOAD FILE
const downloadCatatanProduk = async (item) =>
  await downloadDocument(item, "FILES");

onMounted(async () => {
  await getProduk();
});
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Penyimpanan Bahan Dan Produk </span>
    </VCardTitle>
    <VCardItem>
      <VDataTableServer
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="catatanBahanHeaders"
        :items="catatanBahanItems"
        :items-per-page="sizeBahan"
        :page="pageBahan"
        :items-length="totalDataBahan"
        @update:options="updateOptionsBahan"
      >
        <template #item.no="{ index }">
          {{ (pageBahan - 1) * sizeBahan + index + 1 }}
        </template>
        <template #item.file="{ item }">
          <VBtn
            :disabled="item.file_dok == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="downloadCatatanBahan(item.file_dok)"
          >
            File
          </VBtn>
        </template>

        <template #item.tanggal_masuk="{ item }">
          {{ formatDateId(item.tanggal_masuk) }}
        </template>

        <template #item.tanggal_keluar="{ item }">
          {{ formatDateId(item.tanggal_keluar) }}
        </template>
      </VDataTableServer>
    </VCardItem>

    <VCardItem>
      <VCardTitle class="d-flex justify-space-between align-center" />
      <VDataTable
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="catatanProdukHeaders"
        :items="catatanProdukItems"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.file="{ item }">
          <VBtn
            :disabled="item.file_dok == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="downloadCatatanProduk(item.file_dok)"
          >
            File
          </VBtn>
        </template>

        <template #item.tanggal_masuk="{ item }">
          {{ formatDateId(item.tanggal_masuk) }}
        </template>

        <template #item.tanggal_keluar="{ item }">
          {{ formatDateId(item.tanggal_keluar) }}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
