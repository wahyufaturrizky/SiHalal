<script setup lang="ts">
import type { legal } from "@/stores/interface/pelakuUsahaProfileIntf";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

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

const { t } = useI18n();
const { mdAndUp } = useDisplay();
const panelOpen = ref(0);

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
      <!--
        <VExpansionPanelTitle
        ><p :class="mdAndUp ? 'subtext-menu' : 'mobile-subtext-menu'">
        Aspek Legal
        </p></VExpansionPanelTitle
        >
      -->
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">
          {{ t("detail-pu.pu-legal-title") }}
        </div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VDataTable
          disable-sort
          :headers="legalHeader"
          :items="props.aspekLegalData ?? props.aspekLegalData"
          :hide-default-footer="false"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.date="{ item }">
            {{ item.date ? formatDateId(item.date) : "NA" }}
          </template>
          <template #item.type="{ item }">
            {{ convertDocType(item.type) }}
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
