<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const paneSwitcher = ref([0, 1])
</script>

<template>
  <VRow
    ><VCol cols="12">
      <VExpansionPanels v-model="paneSwitcher">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>
            {{ t('task-force.proses-sidang.detail.section-total-biaya') }}
          </h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <div>Rp 350.000</div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels> </VCol
  ></VRow>
</template>
