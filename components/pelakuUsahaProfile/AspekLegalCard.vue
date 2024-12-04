<script setup lang="ts">
import type { legal } from "@/stores/interface/pelakuUsahaProfileIntf";

const panelOpen = ref(0);
const props = defineProps({
  aspekLegalData: {
    type: Object as Array<legal> | any,
    required: true,
  },
});

const legalHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "type" },
  { title: "No. Dokumen", key: "doc_number" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "expiration_date" },
  { title: "Instansi Penerbit", key: "publishing_agency" },
  { title: "Action", key: "action" },
];
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Aspek Legal</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VDataTable
          :headers="legalHeader"
          :items="props.aspekLegalData ?? props.aspekLegalData"
        ></VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
