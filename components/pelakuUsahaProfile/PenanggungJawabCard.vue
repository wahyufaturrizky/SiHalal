<script setup lang="ts">
const panelOpen = ref(0)
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Penanggung Jawab</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow>
          <VCol cols="3">
            Nama
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="8">
            Sumayah
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3">
            Nomor Kontak
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="8">
            08123456789
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3">
            Email
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="8">
            raawdasdad@gmail.com
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
