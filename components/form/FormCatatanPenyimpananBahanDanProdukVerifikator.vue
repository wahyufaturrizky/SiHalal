<script setup lang="ts">
import FormEditLayoutProduksi from "@/components/form/FormEditLayoutProduksi.vue";
import FormTambahLayoutProduksi from "@/components/form/FormTambahLayoutProduksi.vue";

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
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    catatanBahanItems.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("ada kesalahan", "error");
  }
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
const downloadCatatanBahan = async (item) => await downloadDocument(item,'FILES');

// PRODUK
// TODO -> LOGIC TO DONWLOAD FILE
const downloadCatatanProduk = async (item) => await downloadDocument(item,'FILES');

onMounted(async () => {
  await getBahan();
  await getProduk();
});
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Catatan Penyimpanan Bahan Dan Produk </span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="catatanBahanHeaders" :items="catatanBahanItems">
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.file="{ item }">
          <v-btn
            :disabled="item.file_dok == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="downloadCatatanBahan(item.file_dok)"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>

    <VCardItem>
      <VCardTitle class="d-flex justify-space-between align-center">
      </VCardTitle>
      <VDataTable :headers="catatanProdukHeaders" :items="catatanProdukItems">
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.file="{ item }">
          <v-btn
            :disabled="item.file_dok == ''"
            color="primary"
            variant="plain"
            prepend-icon="mdi-download"
            @click="downloadCatatanProduk(item.file_dok)"
          >
            File
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
