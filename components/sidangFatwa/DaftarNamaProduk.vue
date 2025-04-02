<script setup lang="ts">
const expanded = ref(0);

interface Product {
  no: number;
  layananProduk: string;
  noDokumen: string;
  kelasProduk: string;
  rincianProduk: string;
  publikasi: boolean;
}

// const headers = [
//   { title: 'No', key: 'index', align: 'start' },
//   { title: 'Submission Number', key: 'no_daftar', align: 'start' },
//   { title: 'Importer Name\'s', key: 'nama_importir', align: 'start' },
//   { title: 'NIB/Bussiness Id No', key: 'nib', align: 'start' },
//   { title: 'NPWP/Taxpayer Id No.', key: 'npwp', align: 'start' },
//   { title: 'Date', key: 'tgl_daftar', align: 'start' },
//   { title: 'Action', key: 'action' },
// ]

const headers = ref([
  { title: "No", key: "no", align: "start" },
  { title: "Layanan Produk", key: "layananProduk", align: "start" },
  { title: "No. Dokumen", key: "noDokumen", align: "start" },
  { title: "Kelas Produk", key: "kelasProduk", align: "start" },
  { title: "Rincian Produk", key: "rincianProduk", align: "start" },
  { title: "Publikasi", key: "publikasi", align: "start" },
]);

const items = ref<Product[]>([
  {
    no: 1,
    layananProduk: "Makanan",
    noDokumen: "Penyedia minuman dan makanan dengan pengolahan",
    kelasProduk: "Resto",
    rincianProduk: "Ramen Double Spicy M 2",
    publikasi: true,
  },
  {
    no: 2,
    layananProduk: "Makanan",
    noDokumen: "Penyedia minuman dan makanan dengan pengolahan",
    kelasProduk: "Resto",
    rincianProduk: "Ramen Double Spicy M 2",
    publikasi: true,
  },
  {
    no: 3,
    layananProduk: "Makanan",
    noDokumen: "Penyedia minuman dan makanan dengan pengolahan",
    kelasProduk: "Resto",
    rincianProduk: "Ramen Double Spicy M 2",
    publikasi: false,
  },
  {
    no: 4,
    layananProduk: "Makanan",
    noDokumen: "Penyedia minuman dan makanan dengan pengolahan",
    kelasProduk: "Resto",
    rincianProduk: "Ramen Double Spicy M 2",
    publikasi: true,
  },
  {
    no: 5,
    layananProduk: "Makanan",
    noDokumen: "Penyedia minuman dan makanan dengan pengolahan",
    kelasProduk: "Resto",
    rincianProduk: "Ramen Double Spicy M 2",
    publikasi: true,
  },
]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Daftar Nama Produk</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTableServer
          :items-per-page-options="[10, 25, 50, 100]"
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items-length="totalItems"
          :items="items"
        >
          <template #item.publikasi="{ item }">
            <VCheckbox v-model="item.publikasi" :disabled="!item.publikasi" />
          </template>
        </VDataTableServer>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
