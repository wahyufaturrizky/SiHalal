<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const tablePerizinanHeader = [
  { title: "No", key: "no" },
  { title: "Penerbit", key: "publishing_agency" },
  { title: "Nama Izin", key: "type" },
  { title: "Nomor", key: "doc_number" },
  { title: "Tanggal", key: "date" },
  { title: "Document", key: "document" },
];

const panelOpen = ref([0]);
const store = reactive(pelakuUsahaProfile());
const isLoading = ref(true);

onMounted(async () => {
  try {
    console.log("Before loading:", store.legal);
    // Simulate loading data
    await store.fetchProfile(); // Ensure `loadData` populates `store.legal`
    console.log("After loading:", store.legal);
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Perizinan</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VContainer style="max-height: 35svh; overflow-y: auto">
          <div v-if="isLoading">Loading...</div>
          <div
            v-else-if="store.legal?.length"
            v-for="(item, index) in store.legal"
            :key="index"
          >
            <div style="padding: 2svh; border: dotted; overflow-x: auto">
              <VRow>
                <VCol cols="12">
                  <p>No. {{ index + 1 }}</p>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  Penerbit: {{ item?.publishing_agency || "-" }}
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">Nama Izin: {{ item?.type || "-" }}</VCol>
              </VRow>
            </div>
          </div>
          <p v-else>No data available</p>
        </VContainer>
        <VRow>
          <VCol cols="12">
            <BasicDataPopup parent-btn-label="Lihat Data" :card-width="700">
              <template #content>
                <VDataTable
                  :headers="tablePerizinanHeader"
                  :items="store.legal ?? store.legal"
                />
              </template>
            </BasicDataPopup>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
