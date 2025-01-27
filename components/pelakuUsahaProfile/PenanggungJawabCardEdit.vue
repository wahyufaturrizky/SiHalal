<script setup lang="ts">
import type { penanggungJawab } from "@/stores/interface/pelakuUsahaProfileIntf";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const panelOpen = ref(0);

const props = defineProps({
  responsiblePerson: {
    type: Object as penanggungJawab | any,
    required: true,
  },
});

const formData = ref({
  jenisBadanUsaha: props.responsiblePerson?.name,
  nomorKontak: props.responsiblePerson?.phone,
  email: props.responsiblePerson?.email,
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>{{ t("detail-pu.pu-pj-title") }}b</h2>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow>
          <VCol cols="12">
            <VTextField
              v-model="formData.jenisBadanUsaha"
              label="Jenis Badan Usaha"
              outlined
              dense
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField
              v-model="formData.nomorKontak"
              label="Nomor Kontak"
              outlined
              dense
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VTextField v-model="formData.email" label="Email" outlined dense />
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
