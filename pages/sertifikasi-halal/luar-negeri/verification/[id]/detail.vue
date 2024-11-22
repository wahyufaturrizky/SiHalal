<script setup lang="ts">
const tabs = ref(0);
const route = useRoute();
const shlnId = route.params.id;
onMounted(() => {
  tabs.value = 0;
});
</script>
<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton></KembaliButton>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12"><h3>Verifikasi SHLN Detail</h3></VCol>
  </VRow>
  <VRow>
    <VCol cols="10">
      <VTabs v-model="tabs" align-tabs="start">
        <VTab value="1">Submission</VTab>
        <VTab value="2">Document</VTab>
        <VTab value="3">Manufacture</VTab>
        <VTab value="4">Product</VTab>
      </VTabs>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VTabsWindow v-model="tabs">
        <br />
        <VTabsWindowItem value="1"
          ><ShlnSubmissionDetail></ShlnSubmissionDetail
        ></VTabsWindowItem>
        <VTabsWindowItem value="2"
          ><ShlnDocumentDetail></ShlnDocumentDetail
        ></VTabsWindowItem>
        <VTabsWindowItem value="3"
          ><VerificatorDetailManufacture
        /></VTabsWindowItem>
        <VTabsWindowItem value="4">
          <VerificatorDetailProduct />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
