<script setup lang="ts">
import type { penanggungJawab } from "@/stores/interface/pelakuUsahaProfileIntf";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const panelOpen = ref(0);

const props = defineProps({
  responsiblePersonData: {
    type: Object as penanggungJawab | any,
    required: true,
  },
});

const profilData = [
  {
    id: 1,
    field: `${t("detail-pu.pu-pj-nama")}`,
    value: props.responsiblePersonData?.name || "-",
  },
  {
    id: 2,
    field: `${t("detail-pu.pu-pj-telp")}`,
    value: props.responsiblePersonData?.phone || "-",
  },
  {
    id: 3,
    field: `${t("detail-pu.pu-pj-email")}`,
    value: props.responsiblePersonData?.email || "-",
  },
];
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">
          {{ t("detail-pu.pu-pj-title") }}
        </div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-for="data in profilData" :key="data.id">
          <VCol cols="4">
            <p>{{ data.field }}</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="7">
            <p>{{ data.value }}</p>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
