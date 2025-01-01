<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
const { sertifikat_halal_reguler } = detaildata || {};
const { total_biaya } = sertifikat_halal_reguler || {};

const expanded = ref(0);
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Biaya Pemeriksaan</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <b>{{ formatCurrency(total_biaya) }}</b>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
