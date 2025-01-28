<script setup lang="ts">
import type { legal } from "@/stores/interface/pelakuUsahaProfileIntf";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const panelOpen = ref(0);
const props = defineProps({
  aspekLegalData: {
    type: Object as Array<legal> | any,
    required: true,
  },
  hideDefaultFooter: {
    type: Boolean,
    required: false,
  },
});

const legalHeader = [
  { title: "No", key: "no" },
  { title: `${t("detail-pu.pu-legal-jenis")}`, key: "type" },
  { title: `${t("detail-pu.pu-legal-nodoc")}`, key: "doc_number" },
  { title: `${t("detail-pu.pu-legal-tgl")}`, key: "date" },
  { title: `${t("detail-pu.pu-legal-tgl-exp")}`, key: "expiration_date" },
  { title: `${t("detail-pu.pu-legal-issuer")}`, key: "publishing_agency" },
  { title: `${t("detail-pu.pu-legal-action")}`, key: "action" },
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
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">
          {{ t("detail-pu.pu-legal-title") }}
        </div>
      </VExpansionPanelTitle>
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
