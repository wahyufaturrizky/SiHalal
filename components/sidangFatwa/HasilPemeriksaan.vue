<script setup lang="ts">
const expanded = ref(0)
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Hasil Pemeriksaan</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow>
          <VCol cols="3">
            <p>Tanggal Selesai LPH</p>
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
            <p>Hasil</p>
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
            <p>Dokumen</p>
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
