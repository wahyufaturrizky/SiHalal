<script lang="ts" setup>
import SHLNVerfikasiLayout from "@/layouts/SHLNVerfikasiLayout.vue";

const panelOpenImporter = ref(0);
const panelOpenImporterContract = ref(0);
const openPanelRegisterData = ref(0);
const loading = ref(false);
const data = ref(false);

const route = useRoute();

const loadItemById = async () => {
  try {
    loading.value = true;

    const response = await $api(`/shln/verificator/${route.params.id}`, {
      method: "get",
    });

    data.value = response.data;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

onMounted(async () => {
  await loadItemById();
});

const navigateAction = () => {};
</script>

<template>
  <SHLNVerfikasiLayout>
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

          <VerificationApproveConfirmationDetail />
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
                <Importer />
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
                <ImporterDetail />
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
                <RegisterDataShln />
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
              <TrackingShln />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
  </SHLNVerfikasiLayout>
</template>
