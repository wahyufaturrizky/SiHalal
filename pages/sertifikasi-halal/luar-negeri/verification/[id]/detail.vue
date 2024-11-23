<script setup lang="ts">
const tabs = ref(0);
const route = useRoute();
const shlnId = route.params.id;
const data = ref();
const dataDocumentLOA = ref();
const loading = ref(false);
const loadingDocumentLOA = ref(false);

const loadItemById = async () => {
  try {
    loading.value = true;

    const response = await $api(`/shln/verificator/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) data.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const loadDocumentLOAById = async () => {
  try {
    loadingDocumentLOA.value = true;

    const response = await $api(`/shln/verificator/document/loa/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) dataDocumentLOA.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingDocumentLOA.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDocumentLOA.value = false;
  }
};

onMounted(async () => {
  await loadItemById();
  await loadDocumentLOAById();
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <h3>Verifikasi SHLN Detail</h3>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="10">
      <VTabs v-model="tabs" align-tabs="start">
        <VTab value="1"> Submission </VTab>
        <VTab value="2"> Document </VTab>
        <VTab value="3"> Manufacture </VTab>
        <VTab value="4"> Product </VTab>
      </VTabs>
    </VCol>
  </VRow>
  <VRow v-if="!loading && !loadingDocumentLOA">
    <VCol>
      <VTabsWindow v-model="tabs">
        <br />
        <VTabsWindowItem value="1">
          <ShlnSubmissionDetail :data="data" />
        </VTabsWindowItem>
        <VTabsWindowItem value="2">
          <ShlnDocumentDetail :datadocumentloa="dataDocumentLOA" />
        </VTabsWindowItem>
        <VTabsWindowItem value="3">
          <VerificatorDetailManufacture />
        </VTabsWindowItem>
        <VTabsWindowItem value="4">
          <VerificatorDetailProduct />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
