<script setup lang="ts">
const tabs = ref(0);
const route = useRoute();
const shlnId = route.params.id;
const data = ref();
const dataDetailRegistration = ref();
const dataDocumentLOA = ref();
const dataDocumentFHC = ref();
const dataDocumentMRA = ref();
const dataTracking = ref();
const dataLOATracking = ref();
const dataListManufactureTracking = ref();
const dataListProductTracking = ref();
const dataFHCTracking = ref();
const loading = ref(false);
const loadingDetailRegistration = ref(false);
const loadingDocumentLOA = ref(false);
const loadingDocumentFHC = ref(false);
const loadingDocumentMRA = ref(false);
const loadingTracking = ref(false);
const loadingLOATracking = ref(false);
const loadingFHCTracking = ref(false);
const loadingListProductTracking = ref(false);

const loadingListManufactureTracking = ref(false);

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

const loadItemDetailRegistrationById = async () => {
  try {
    loadingDetailRegistration.value = true;

    const response = await $api(
      `/shln/verificator/detail/registration/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) dataDetailRegistration.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingDetailRegistration.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDetailRegistration.value = false;
  }
};

const loadItemTrackingById = async () => {
  try {
    loadingTracking.value = true;

    const response = await $api(`/shln/verificator/tracking/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) dataTracking.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingTracking.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTracking.value = false;
  }
};

const loadItemListProductTrackingById = async () => {
  try {
    loadingListProductTracking.value = true;

    const response = await $api(
      `/shln/verificator/product/list-tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) dataListProductTracking.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingListProductTracking.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListProductTracking.value = false;
  }
};

const loadItemListManufactureTrackingById = async () => {
  try {
    loadingListManufactureTracking.value = true;

    const response = await $api(
      `/shln/verificator/manufacture/list-tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000)
      dataListManufactureTracking.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingListManufactureTracking.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListManufactureTracking.value = false;
  }
};

const loadItemLOATrackingById = async () => {
  try {
    loadingLOATracking.value = true;

    const response = await $api(
      `/shln/verificator/document/loa/tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) dataLOATracking.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingLOATracking.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingLOATracking.value = false;
  }
};

const loadItemFHCTrackingById = async () => {
  try {
    loadingFHCTracking.value = true;

    const response = await $api(
      `/shln/verificator/document/fhc/tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) dataFHCTracking.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingFHCTracking.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingFHCTracking.value = false;
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

const loadDocumentFHCById = async () => {
  try {
    loadingDocumentFHC.value = true;

    const response = await $api(`/shln/verificator/document/fhc/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) dataDocumentFHC.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingDocumentFHC.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDocumentFHC.value = false;
  }
};

const loadDocumentMRAById = async () => {
  try {
    loadingDocumentMRA.value = true;

    const response = await $api(`/shln/verificator/document/mra/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) dataDocumentMRA.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");

    loadingDocumentMRA.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDocumentMRA.value = false;
  }
};

onMounted(async () => {
  await loadItemById();
  await loadDocumentLOAById();
  await loadItemTrackingById();
  await loadItemDetailRegistrationById();
  await loadDocumentFHCById();
  await loadDocumentMRAById();
  await loadItemLOATrackingById();
  await loadItemFHCTrackingById();
  await loadItemListProductTrackingById();
  await loadItemListManufactureTrackingById();
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
  <VRow
    v-if="
      !loading &&
      !loadingDocumentLOA &&
      !loadingDocumentFHC &&
      !loadingDocumentMRA &&
      !loadingTracking &&
      !loadingLOATracking &&
      !loadingFHCTracking &&
      !loadingListProductTracking &&
      !loadingListManufactureTracking &&
      !loadingDetailRegistration
    "
  >
    <VCol>
      <VTabsWindow v-model="tabs">
        <br />
        <VTabsWindowItem value="1">
          <ShlnSubmissionDetail
            :datatracking="dataTracking"
            :data="data"
            :datadetailregistration="dataDetailRegistration"
          />
        </VTabsWindowItem>
        <VTabsWindowItem value="2">
          <ShlnDocumentDetail
            :datadocumentfhc="dataDocumentFHC"
            :datadocumentloa="dataDocumentLOA"
            :datadocumentmra="dataDocumentMRA"
            :datatrackingloa="dataLOATracking"
            :datatrackingfhc="dataFHCTracking"
          />
        </VTabsWindowItem>
        <VTabsWindowItem value="3">
          <VerificatorDetailManufacture
            :datalistmanufacturetracking="dataListManufactureTracking"
          />
        </VTabsWindowItem>
        <VTabsWindowItem value="4">
          <VerificatorDetailProduct
            :datalistproducttracking="dataListProductTracking"
          />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
