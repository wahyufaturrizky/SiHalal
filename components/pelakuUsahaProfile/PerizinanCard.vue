<script setup lang="ts">
const tablePerizinanHeader = [
  { title: "No", key: "no" },
  { title: "Penerbit", key: "publisher" },
  { title: "Nama Izin", key: "permission_name" },
  { title: "Nomor", key: "number" },
  { title: "Tanggal", key: "date" },
  { title: "Document", key: "document" },
];

const panelOpen = ref(0);
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Perizinan</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <div style="max-block-size: 30svh; overflow-y: auto">
          <div
            style="
              padding: 2svh;
              border: dotted;
              max-inline-size: max-content;
              overflow-x: auto;
            "
          >
            <VRow>
              <VCol cols="12">
                <p>No.1</p>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                Penerbit: Badan Koordinasi Penanaman Modal
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12"> Nama Izin: NIB </VCol>
            </VRow>
          </div>
          <br />
          <div
            style="
              padding: 2svh;
              border: dotted;
              max-inline-size: max-content;
              overflow-x: auto;
            "
          >
            <VRow>
              <VCol cols="12">
                <p>No.2</p>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                Penerbit: Badan Koordinasi Penanaman Modal
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12"> Nama Izin: NIB </VCol>
            </VRow>
          </div>
        </div>
      </VExpansionPanelText>
      <VCardActions>
        <VRow>
          <VCol cols="12">
            <BasicDataPopup parent-btn-label="Lihat Data" :card-width="700">
              <template #content>
                <VDataTable :headers="tablePerizinanHeader" />
              </template>
            </BasicDataPopup>
          </VCol>
        </VRow>
      </VCardActions>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
