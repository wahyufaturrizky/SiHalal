<script setup lang="ts">
const tabs = ref(0);

onMounted(() => {
  tabs.value = 0;
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <h3>
        Ubah Pengajuan Self Declare Mandiri [tolong dimasukin tab ini ke page
        asli nya , thank you]
      </h3>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="10">
      <VTabs v-model="tabs" align-tabs="start">
        <VTab value="1"> Proses Produk Halal </VTab>
        <VTab value="2"> Pernyataan </VTab>
      </VTabs>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VTabsWindow v-model="tabs">
        <VTabsWindowItem value="1">
          <EditProsesProdukHalalSelfDeclareSubmission />
        </VTabsWindowItem>
        <VTabsWindowItem value="2">
          <EditPernyataanSelfDeclareSubmision />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
