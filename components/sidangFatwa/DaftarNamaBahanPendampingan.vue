<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  databahan: {
    type: Array,
    required: true,
  },
});
console.log(props.databahan, "ini props databahan");
const tableHeader = [
  { title: "No", key: "no" },
  { title: "Nama Bahan", key: "nama_bahan" },
  { title: "Temuan", key: "temuan" },
  { title: "Diragukan", key: "diragukan" },
  { title: "Keterangan", key: "keterangan" },
];

// Helper function to get value or return a dash
function getValueOrDash(value: any) {
  return value && value.trim() !== "" ? value : "-";
}

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
    console.log(newDataBahan, "Updated databahan");

    if (newDataBahan && Array.isArray(newDataBahan)) {
      processedDataBahan.value = newDataBahan;
      totalItems.value = newDataBahan.length;
    }
    console.log(processedDataBahan.value, "Processed Data Bahan");
  },
  { immediate: true }
);

const paneSwitcher = [0];
</script>
<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Daftar Nama Bahan</h3></VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTable
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
          <template #item.diragukan="{ item }">
            <VChip
              v-if="!item.diragukan"
              variant="outlined"
              style="
                color: #e1442e;
                border-radius: 10px;
                background-color: #fcecea;
              "
              color="danger"
              >Diragukan</VChip
            >
            <VChip
              v-if="item.diragukan"
              variant="outlined"
              style="
                color: #49a84c;
                border-radius: 10px;
                background-color: #edf6ed;
              "
              color="success"
              >Tidak Diragukan</VChip
            >
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
