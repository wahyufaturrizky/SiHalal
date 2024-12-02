<script setup lang="ts">
const expanded = ref(0)
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Biaya Pemeriksaan</h3>
      </VExpansionPanelTitle>
      <br>
      <VExpansionPanelText>
        <b>Rp.350.000</b>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
