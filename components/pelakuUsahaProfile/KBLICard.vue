<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const tableKBLIHeader = [
  { title: "No", key: "no_idx" },
  { title: "No. KBLI", key: "No" },
  { title: "Nama KBLI", key: "KBLI" },
  { title: "Nama Usaha", key: "Name" },
  { title: "Alamat", key: "Address" },
  { title: "Modal Usaha", key: "BusinessCapital" },
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
        <VRow v-else>
          <VCol style="max-block-size: 30svh; overflow-y: auto">
            <VRow v-for="(item, key) in store.kbli" :key="key">
              <VCol cols="12">
                <div>
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
                        <p>No. {{ item.No }}</p>
                      </VCol>
                    </VRow>
                    <VRow>
                      <VCol cols="12">KBLI: {{ item.KBLI || "-" }} </VCol>
                    </VRow>
                    <VRow>
                      <VCol cols="12">Nama KBLI: {{ item.Name || "-" }} </VCol>
                    </VRow>
                    <VRow>
                      <VCol cols="12">Alamat: {{ item.Address || "-" }} </VCol>
                    </VRow>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <BasicDataPopup parent-btn-label="Lihat Data">
              <template #content>
                <VRow style="max-height: 60svh; overflow-y: auto">
                  <VCol cols="12">
                    <VDataTable :headers="tableKBLIHeader" :items="store.kbli">
                      <template #item.no_idx="{ index }">
                        {{ index + 1 }}
                      </template>
                    </VDataTable>
                  </VCol>
                </VRow>
              </template>
            </BasicDataPopup>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
