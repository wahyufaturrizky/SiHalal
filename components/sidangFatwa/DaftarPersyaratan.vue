<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  databahan: {
    type: Array,
    required: true,
  },
});
// console.log(props.databahan, "ini props databahan");
const tableHeader = [
  { title: "No", key: "no" },
  { title: "Bahan", key: "persyaratan" },
  { title: "Penjelasan", key: "penjelasan" },
];

// Reactive variables for pagination and data
const itemPerPage = ref(10);
const page = ref(1);
const loading = ref(false);
const totalItems = ref(props.databahan.length); // Assuming total count of items is the length of the array
const processedDataBahan = ref([]);

// Watch the `databahan` prop for changes and process it
watch(
  () => props.databahan,
  (newDataBahan) => {
    // console.log(newDataBahan, "Updated databahan");

    if (newDataBahan && Array.isArray(newDataBahan)) {
      processedDataBahan.value = newDataBahan;
      totalItems.value = newDataBahan.length;
    }
    // console.log(processedDataBahan.value, "Processed Data Bahan");
  },
  { immediate: true }
);

const paneSwitcher = [0];
</script>
<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Lampiran Penjelasan Proses dan Pemenuhan Kriteria Sistem Jaminan Halal</h3></VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTable
          disable-sort
          height="45svh"
          :headers="tableHeader"
          :items="processedDataBahan"
          :items-per-page="itemPerPage"
          :page="page"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
