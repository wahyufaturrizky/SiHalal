<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const tableKBLIHeader = [
  { title: "No", key: "no" },
  { title: "No. KBLI", key: "kbli_number" },
  { title: "Nama KBLI", key: "kbli_name" },
  { title: "Nama Usaha", key: "business_name" },
  { title: "Alamat", key: "address" },
  { title: "Modal Usaha", key: "business_capital" },
];

const panelOpen = ref(0);
const store = reactive(pelakuUsahaProfile());
const isLoading = ref(true);

onMounted(async () => {
  try {
    console.log("Before loading KBLI:", store.kbli);
    // Simulate API call or asynchronous data fetch
    await store.fetchProfile(); // Assume this fetches `kbli` data
    console.log("After loading KBLI:", store.kbli);
  } catch (error) {
    console.error("Failed to load KBLI data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>KBLI</h2></VExpansionPanelTitle>
      <VExpansionPanelText>
        <!-- Check if KBLI data exists -->
        <p v-if="!store.kbli || store.kbli.length === 0">No data</p>
        <VRow v-else v-for="(item, key) in store.kbli" :key="key">
          <VCol cols="12">
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
                    <p>{{ item.no }}</p>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12"> {{ item.kbli || "-" }} </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12"> {{ item.name || "-" }} </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12"> {{ item.address || "-" }} </VCol>
                </VRow>
              </div>
            </div>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <BasicDataPopup parent-btn-label="Lihat Data">
              <template #content>
                <VDataTable :headers="tableKBLIHeader" :items="store.kbli" />
              </template>
            </BasicDataPopup>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
