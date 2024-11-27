<script setup lang="ts">
const expanded = [0];
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Jadwal Audit</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow>
          <VCol cols="3">
            <p>Tanggal Mulai</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>xx</p>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3">
            <p>Tanggal Selesai</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>xx</p>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
