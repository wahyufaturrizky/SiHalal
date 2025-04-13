<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Daftar Nama Produk</h3></VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTable
          disable-sort
          height="45svh"
          :headers="tableHeader"
          :items="processedDataProduk"
          :items-per-page="itemPerPage"
          :page="page"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.daftar_bahan="{ item }">
            <DaftarBahanModalAtDaftarProduk
              :databahan="item.daftar_bahan"
            ></DaftarBahanModalAtDaftarProduk>
          </template>
          <template #item.photo="{ item }">
            <ImagePreviewModal
              :card-title="'Foto Produk'"
              :namabahan="item.photo"
              :doc-query="'PRODUCT'"
              :inline-image="true"
            ></ImagePreviewModal>
          </template>
          <template #item.reg_publish="{ item }">
            {{ item.reg_publish ? "Ya" : "Tidak" }}
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  dataproduk: {
    type: Array,
    required: true,
  },
});
// console.log(props.dataproduk, "ini props databahan");
const tableHeader = [
  { title: "No", key: "no", width: "5%", height: "100%" },
  { title: "Nama Produk", key: "nama_produk", width: "10%", height: "100%" },
  { title: "Foto Produk", key: "photo", width: "55%", height: "100%" },
  { title: "Jumlah Bahan", key: "jumlah_bahan", width: "10%", height: "100%" },
  { title: "Daftar Bahan", key: "daftar_bahan", width: "10%", height: "100%" },
  { title: "Publish", key: "reg_publish", width: "10%", height: "100%" },
];

// Helper function to get value or return a dash
function getValueOrDash(value: any) {
  return value && value.trim() !== "" ? value : "-";
}

// Reactive variables for pagination and data
const itemPerPage = ref(10);
const page = ref(1);
const loading = ref(false);
const totalItems = ref(props.dataproduk.length); // Assuming total count of items is the length of the array
const processedDataProduk = ref([]);

// Watch the `databahan` prop for changes and process it
watch(
  () => props.dataproduk,
  (newDataProduk) => {
    // console.log(newDataProduk, "Updated dataproduk");

    if (newDataProduk && Array.isArray(newDataProduk)) {
      processedDataProduk.value = newDataProduk;
      totalItems.value = newDataProduk.length;
    }
    // console.log(processedDataProduk.value, "Processed Data Produk");
  },
  { immediate: true }
);

const paneSwitcher = [0];
</script>

<style></style>
