<script setup lang="ts">
import type { legal } from "@/stores/interface/pelakuUsahaProfileIntf";

const panelOpen = ref(0);
const props = defineProps({
  aspekLegalData: {
    type: Object as Array<legal> | any,
    required: true,
  },
  hideDefaultFooter: {
    type: Boolean,
    required: false,
  }
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

const storeDataMaster = dataMasterStore();

const convertDocType = (type: string | null) => {
  if (type.includes("LGL")) {
    return storeDataMaster.masterJnlgl.filter((val) => val.code == type)[0]
      ?.name;
  }
  return type;
};

onMounted(() => {
  storeDataMaster.initMasterData();
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Aspek Legal</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VDataTable
          :headers="legalHeader"
          :items="props.aspekLegalData ?? props.aspekLegalData"
          :hide-default-footer="false"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.type="{ item }">
            {{ convertDocType(item.type) }}
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
