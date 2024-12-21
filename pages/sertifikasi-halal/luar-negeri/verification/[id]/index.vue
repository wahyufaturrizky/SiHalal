<script lang="ts" setup>
import SHLNVerfikasiLayout from "@/layouts/SHLNVerfikasiLayout.vue";

const panelOpenImporter = ref(0);
const panelOpenImporterContract = ref(0);
const openPanelRegisterData = ref(0);
const loading = ref(false);
const loadingTracking = ref(false);
const loadingDetailRegistration = ref(false);
const data = ref();
const dataDetailRegistration = ref();
const dataTracking = ref();

const route = useRoute();
const shlnId = route.params.id;

const loadItemDetailRegistrationById = async () => {
  try {
    loadingDetailRegistration.value = true;

    const response = await $api(
      `/shln/verificator/detail/registration/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataDetailRegistration.value = response.data;
      loadingDetailRegistration.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingDetailRegistration.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDetailRegistration.value = false;
  }
};

const loadItemById = async () => {
  try {
    loading.value = true;

    const response = await $api(`/shln/verificator/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      data.value = response.data;
      loading.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const loadItemTrackingById = async () => {
  try {
    loadingTracking.value = true;

    const response = await $api(`/shln/verificator/tracking/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      dataTracking.value = response.data;
      loadingTracking.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingTracking.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTracking.value = false;
  }
};

onMounted(async () => {
  await loadItemById();
  await loadItemTrackingById();
  await loadItemDetailRegistrationById();
});

const navigateAction = () => {
  navigateTo(`/sertifikasi-halal/luar-negeri/verification/${shlnId}/detail`);
};
</script>

<template>
  <SHLNVerfikasiLayout
    v-if="!loading && !loadingTracking && !loadingDetailRegistration"
  >
    <template #pageTitle>
      <VRow>
        <VCol><h3>Foreign Halal Certificate Requirements Details</h3></VCol>
      </VRow>

      <VRow>
        <VCol style="display: flex; justify-content: start">
          <VBtn
            variant="flat"
            prepend-icon=""
            color="primary"
            @click="navigateAction"
          >
            Detail
          </VBtn>
        </VCol>
        <VCol style="display: flex; justify-content: end">
          <VerificationReturnConfirmation />
          <VerificationRejectConfirmation />

          <VerificationApproveConfirmationDetail v-if="data?.ready_approve" />
        </VCol>
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenImporter">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2><b> Importer </b></h2>
              </VExpansionPanelTitle>

              <VExpansionPanelText>
                <Importer :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenImporterContract">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>
                  <b>Importer's Point of Contract </b>
                </h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <ImporterDetail :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Registration Data</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <RegisterDataShln :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle><h2>Tracking</h2></VCardTitle>
            <VCardText>
              <TrackingShln :data="dataTracking" />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
  </SHLNVerfikasiLayout>
</template>
