<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { mdAndUp } = useDisplay();

const tablePerizinanHeader = [
  { title: "No", key: "no" },
  { title: `${t("detail-pu.pu-izin-penerbit")}`, key: "instansi" },
  { title: `${t("detail-pu.pu-izin-namaizin")}`, key: "nama_izin" },
  { title: `${t("detail-pu.pu-izin-nomor")}`, key: "no_izin" },
  { title: `${t("detail-pu.pu-izin-date")}`, key: "tgl_izin" },
  { title: `${t("detail-pu.pu-izin-document")}`, key: "file_izin" },
  { title: `${t("detail-pu.pu-izin-document")}`, key: "file_izin_oss" },
];

const panelOpen = ref([0]);
const store = pelakuUsahaProfile();

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

// onMounted(async () => {
//   try {
//     // console.log("Before loading:", store.legal);
//     // Simulate loading data
//     await store.fetchProfile(null); // Ensure `loadData` populates `store.legal`
//     // console.log("After loading:", store.legal);
//   } catch (error) {
//     console.error("Failed to load data:", error);
//   } finally {
//     isLoading.value = false;
//   }
// });

const handleOssUpdate = () => {
  const legal = JSON.parse(JSON.stringify(store.legal));

  if (legal) {
    const eligibleCriteria = ["nib", "lgl01", "lgl09"];

    const nib = legal.filter((val: any) =>
      eligibleCriteria.includes(val.type?.toLowerCase())
    )[0].doc_number;

    if (nib) {
      store.fetchProfile(nib);

      return;
    }
  }
  useSnackbar().sendSnackbar(
    "Tidak bisa melakukan update data OSS, NIB tidak ditemukan",
    "error"
  );
};

const closeModal = ref(false);
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <!--
        <VExpansionPanelTitle
        ><p :class="mdAndUp ? 'subtext-menu' : 'mobile-subtext-menu'">
        Perizinan
        </p></VExpansionPanelTitle
        >
      -->
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">
          {{ t("detail-pu.pu-izin-title") }}
        </div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VContainer style="max-block-size: 35svh; overflow-y: auto">
          <p v-if="store.perizinan?.length === 0">No data</p>
          <p v-if="store.isLoading">Loading...</p>
          <div
            v-for="(item, index) in store.perizinan"
            v-else-if="store.perizinan && !store.isLoading"
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
                <VCol cols="12">
                  {{ t("detail-pu.pu-izin-penerbit") }}:
                  {{ item?.instansi || "-" }}
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12">
                  {{ t("detail-pu.pu-izin-namaizin") }}:
                  {{ item?.nama_izin || "-" }}
                </VCol>
              </VRow>
            </div>
            <br />
          </div>
          <p v-else>No data available</p>
        </VContainer>
        <VRow>
          <VCol cols="12">
            <VDialog max-width="800">
              <template #activator="{ props: openModal }">
                <VBtn
                  variant="outlined"
                  style="inline-size: 100%"
                  v-bind="openModal"
                >
                  {{ t("detail-pu.pu-izin-act-detail") }}
                </VBtn>
              </template>
              <template #default="{ isActive }">
                <VCard>
                  <VCardTitle style="padding: 3svh">
                    <VRow>
                      <VCol cols="10">
                        <div class="text-h4 font-weight-bold">
                          Lihat Data Perizinan
                        </div>
                      </VCol>
                      <VCol
                        cols="2"
                        style="display: flex; justify-content: end"
                      >
                        <VIcon
                          size="small"
                          icon="fa-times"
                          @click="isActive.value = false"
                        />
                      </VCol>
                    </VRow>
                  </VCardTitle>
                  <VCardItem
                    style="
                      margin: 2svh;
                      max-block-size: 60svh;
                      overflow-y: auto;
                    "
                  >
                    <VRow>
                      <VCol cols="12">
                        <VDataTable
                          disable-sort
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
                                : formatDateId(item.tgl_izin)
                            }}
                          </template>
                          <template #item.file_izin="{ item }">
                            <VBtn
                              v-if="item.file_izin && item.file_izin != '-'"
                              color="primary"
                              variant="plain"
                              prepend-icon="mdi-download"
                              @click="download(item.file_izin)"
                            >
                              File
                            </VBtn>
                            <p v-else>File not available</p>
                          </template>
                          <template #item.file_izin_oss="{ item }">
                            <VBtn
                              v-if="item.file_izin_oss"
                              color="primary"
                              variant="plain"
                              prepend-icon="mdi-download"
                              @click="download(item.file_izin_oss)"
                            >
                              File
                            </VBtn>
                            <p v-else>File not available</p>
                          </template>
                        </VDataTable>
                      </VCol>
                    </VRow>
                  </VCardItem>
                </VCard>
              </template>
            </VDialog>
          </VCol>
        </VRow>
        <VRow dense>
          <VCol cols="12">
            <VBtn style="inline-size: 100%" @click="handleOssUpdate">
              Update Data OSS
            </VBtn>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
