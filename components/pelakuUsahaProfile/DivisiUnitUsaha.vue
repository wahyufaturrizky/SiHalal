<script setup lang="ts">
const tableBussinessUnitHeader = [
  { title: "No", key: "no" },
  { title: "Divisi / Unit Usaha", key: "bussiness_unit" },
  { title: "Alamat", key: "address" },
  { title: "Username", key: "username" },
];

const panelOpen = ref(0);
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Divisi / Unit Usaha</h2></VExpansionPanelTitle>

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
              <VCol cols="12"> Divisi / Unit Usaha: - </VCol>
            </VRow>
            <VRow>
              <VCol cols="12"> Alamat: - </VCol>
            </VRow>
          </div>
        </div>
      </VExpansionPanelText>
      <VCardActions>
        <VRow>
          <VCol cols="12">
            <BasicDataPopup parent-btn-label="Lihat Data">
              <template #content>
                <VDataTable
                  :items-per-page-options="[10, 25, 50, 100]"
                  :headers="tableBussinessUnitHeader"
                />
              </template>
            </BasicDataPopup>
          </VCol>
        </VRow>
      </VCardActions>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
