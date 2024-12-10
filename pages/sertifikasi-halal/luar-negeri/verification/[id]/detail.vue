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
const loading = ref(true);
const loadingListTrackingManufacture = ref(false);
const loadingListTrackingProduct = ref(false);
const loadingListTrackingLOA = ref(false);
const loadingListTrackingFHC = ref(false);

const loadItemById = async () => {
  try {
    const response = await $api(`/shln/verificator/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      data.value = response.data;
      return response;
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemDetailRegistrationById = async () => {
  try {
    const response = await $api(
      `/shln/verificator/detail/registration/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataDetailRegistration.value = response.data;

      return response;
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemTrackingById = async () => {
  try {
    const response = await $api(`/shln/verificator/tracking/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      dataTracking.value = response.data;

      return response;
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemListProductTrackingById = async () => {
  loadingListTrackingProduct.value = true;
  try {
    const response = await $api(
      `/shln/verificator/product/list-tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataListProductTracking.value = response.data;
      loadingListTrackingProduct.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListTrackingProduct.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemListManufactureTrackingById = async () => {
  loadingListTrackingManufacture.value = true;
  try {
    const response = await $api(
      `/shln/verificator/manufacture/list-tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataListManufactureTracking.value = response.data;
      loadingListTrackingManufacture.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListTrackingManufacture.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListTrackingManufacture.value = false;
  }
};

const loadItemLOATrackingById = async () => {
  loadingListTrackingLOA.value = true;
  try {
    const response = await $api(
      `/shln/verificator/document/loa/tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataLOATracking.value = response.data;
      loadingListTrackingLOA.value = false;

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListTrackingLOA.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListTrackingLOA.value = false;
  }
};

const loadItemFHCTrackingById = async () => {
  loadingListTrackingFHC.value = true;
  try {
    const response = await $api(
      `/shln/verificator/document/fhc/tracking/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataFHCTracking.value = response.data;
      loadingListTrackingFHC.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListTrackingFHC.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListTrackingFHC.value = false;
  }
};

const loadDocumentLOAById = async () => {
  try {
    const response = await $api(`/shln/verificator/document/loa/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      dataDocumentLOA.value = response.data;

      return response;
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadDocumentFHCById = async () => {
  try {
    const response = await $api(`/shln/verificator/document/fhc/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      dataDocumentFHC.value = response.data;

      return response;
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadDocumentMRAById = async () => {
  try {
    const response = await $api(`/shln/verificator/document/mra/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      dataDocumentMRA.value = response.data;

      return response;
    } else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  const res = await Promise.all([
    loadItemById(),
    loadItemTrackingById(),
    loadItemDetailRegistrationById(),
    loadDocumentFHCById(),
    loadDocumentMRAById(),
    loadItemLOATrackingById(),
    loadItemFHCTrackingById(),
    loadItemListProductTrackingById(),
    loadItemListManufactureTrackingById(),
    loadDocumentLOAById(),
  ]);

  const checkResIfUndefined = res.every((item) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loading.value = false;
  } else {
    loading.value = false;
  }
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
  <VRow v-if="!loading">
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
            v-if="!loadingListTrackingFHC && !loadingListTrackingLOA"
            :datadocumentfhc="dataDocumentFHC"
            :datadocumentloa="dataDocumentLOA"
            :datadocumentmra="dataDocumentMRA"
            :datatrackingloa="dataLOATracking"
            :datatrackingfhc="dataFHCTracking"
            @refreshloa="loadItemLOATrackingById"
            @refreshfhc="loadItemFHCTrackingById"
          />
        </VTabsWindowItem>
        <VTabsWindowItem value="3">
          <VerificatorDetailManufacture
            v-if="!loadingListTrackingManufacture"
            :datalistmanufacturetracking="dataListManufactureTracking"
            @refresh="loadItemListManufactureTrackingById"
          />
        </VTabsWindowItem>
        <VTabsWindowItem value="4">
          <VerificatorDetailProduct
            v-if="!loadingListTrackingProduct"
            :datalistproducttracking="dataListProductTracking"
            @refresh="loadItemListProductTrackingById"
          />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
