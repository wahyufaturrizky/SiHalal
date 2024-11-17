<script lang="ts" setup>
import SHLNVerfikasiLayout from '@/layouts/SHLNVerfikasiLayout.vue';

const panelOpenImporter = ref(0)
const panelOpenImporterContract = ref(0)
const openPanelRegisterData = ref(0)
</script>

<template>
  <SHLNVerfikasiLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h3>Foreign Halal Cerficate Requirements Details</h3></VCol>
      </VRow>

      <VRow>
        <VCol style="display: flex; justify-content: start;">
          <VBtn
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onEdit"
          >
            Detail
          </VBtn>
        </VCol>
        <VCol style="display: flex; justify-content: end;">
          <VBtn
            class="mr-2"
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onReturn"
          >
            Return
          </VBtn>

          <VBtn
            class="mr-2"
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onReject"
          >
            Reject
          </VBtn>

          <VBtn
            class="mr-2"
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onApprove"
          >
            Approve
          </VBtn>
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
              <VExpansionPanelTitle><h2><b>Importer's Point of Contract </b> </h2></VExpansionPanelTitle>
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
              <VExpansionPanelTitle><h2>Registration Data</h2></VExpansionPanelTitle>
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
