<script setup lang="ts">
const panelOpen = ref(0);

const formData = ref({
  jenisBadanUsaha: "Sumayah",
  nomorKontak: "08123456789",
  email: "rasarasa@gmail.com",
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>Penanggung Jawab</h2>
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
