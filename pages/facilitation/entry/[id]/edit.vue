<script setup lang="ts">
const tabs = ref(0);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="4">
      <h3>Ubah Data Fasilitasi</h3>
    </VCol>
    <VSpacer />
    <VCol cols="4" class="d-flex justify-end">
      <VBtn color="error" variant="outlined" @click="$router.go(-1)">
        Batal
      </VBtn>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="10">
      <VTabs v-model="tabs" align-tabs="start">
        <VTab value="1"> Pengajuan </VTab>
        <VTab value="2"> Lembaga </VTab>
      </VTabs>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VTabsWindow v-model="tabs">
        <VTabsWindowItem value="1">
          <EditPengajuanFacilitator />
        </VTabsWindowItem>
        <VTabsWindowItem value="2">
          <EditLembagaFacilitator />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
