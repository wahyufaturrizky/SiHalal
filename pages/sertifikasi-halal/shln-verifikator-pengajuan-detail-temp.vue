<script lang="ts" setup>
const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "kind" },
  { title: "No. Dokumen", key: "no_docs" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "exp_date" },
  { title: "Instansi Penerbit", key: "publisher" },
];

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
];

const panelOpenPabrik = ref(0);
const panelOpenOutlet = ref(0);
const panelOpenPenyeliaHallal = ref(0);
</script>

<template>
  <SHLNVerfikasiLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h3>Foreign Halal Cerficate Requirements Details</h3></VCol>
        <VCol style="display: flex; justify-content: end">
          <VBtn
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onEdit"
          >
            Detail
          </VBtn>

          <VBtn
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onEdit"
          >
            Return
          </VBtn>

          <VBtn
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onEdit"
          >
            Reject
          </VBtn>

          <VBtn
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onEdit"
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
          <VExpansionPanels v-model="panelOpenPabrik">
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
          <VExpansionPanels v-model="panelOpenOutlet">
            <VExpansionPanel>
              <VExpansionPanelTitle><h2>Outlet</h2></VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable :headers="tableOutletHeader" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="panelOpenPenyeliaHallal">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Penyelia Halal</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText><AspekLegalTable /></VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <PerizinanCard />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <KBLICard />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <DivisiUnitUsaha />
        </VCol>
      </VRow>
    </template>
  </SHLNVerfikasiLayout>
</template>
