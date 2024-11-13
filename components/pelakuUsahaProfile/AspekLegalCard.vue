<script setup lang="ts">
const panelOpen = ref(0);
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Aspek Legal</h2></VExpansionPanelTitle>
      <VExpansionPanelText><AspekLegalTable /></VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
