<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const tablePerizinanHeader = [
  { title: "No", key: "no" },
  { title: "Penerbit", key: "instansi" },
  { title: "Nama Izin", key: "nama_izin" },
  { title: "Nomor", key: "no_izin" },
  { title: "Tanggal", key: "tgl_izin" },
  { title: "Document", key: "file_izin" },
  { title: "Document", key: "file_izin_oss" },
];

const panelOpen = ref([0]);
const store = reactive(pelakuUsahaProfile());
const isLoading = ref(true);

// TODO -> LOGIC TO DONWLOAD FILE
const download = (item) => {
  console.log("item url", item);
  try {
    window.open(item, "_blank", "noopener,noreferrer");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
  // console.log("DOWNLOAD FILE ", item.file)
};

onMounted(async () => {
  try {
    // console.log("Before loading:", store.legal);
    // Simulate loading data
    await store.fetchProfile(); // Ensure `loadData` populates `store.legal`
    // console.log("After loading:", store.legal);
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
            v-else-if="store.perizinan?.length"
            v-for="(item, index) in store.perizinan"
            :key="index"
          >
            <div
              style="
                padding: 2svh;
                border: solid #eae9eb;
                border-radius: 10px;
                overflow-x: auto;
              "
            >
              <VRow>
                <VCol cols="12">
                  <p>No. {{ index + 1 }}</p>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12"> Penerbit: {{ item?.instansi || "-" }} </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">Nama Izin: {{ item?.nama_izin || "-" }}</VCol>
              </VRow>
            </div>
            <br />
          </div>
          <p v-else>No data available</p>
        </VContainer>
        <VRow>
          <VCol cols="12">
            <BasicDataPopup parent-btn-label="Lihat Data" :card-width="700">
              <template #content>
                <VRow style="max-height: 60svh; overflow-y: auto">
                  <VCol cols="12">
                    <VDataTable
                      :headers="tablePerizinanHeader"
                      :items="store.perizinan ?? store.perizinan"
                    >
                      <template #item.no="{ index }">
                        {{ index + 1 }}
                      </template>
                      <template #item.tgl_izin="{ item }">
                        {{
                          item?.tgl_izin == null
                            ? "-"
                            : new Date(item.tgl_izin)
                                .toISOString()
                                .substring(0, 10)
                        }}
                      </template>
                      <template #item.file_izin="{ item }">
                        <v-btn
                          v-if="item.file_izin && item.file_izin != '-'"
                          color="primary"
                          variant="plain"
                          prepend-icon="mdi-download"
                          @click="download(item.file_izin)"
                        >
                          File
                        </v-btn>
                        <p v-else>File not available</p>
                      </template>
                      <template #item.file_izin_oss="{ item }">
                        <v-btn
                          v-if="item.file_izin_oss"
                          color="primary"
                          variant="plain"
                          prepend-icon="mdi-download"
                          @click="download(item.file_izin_oss)"
                        >
                          File
                        </v-btn>
                        <p v-else>File not available</p>
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
