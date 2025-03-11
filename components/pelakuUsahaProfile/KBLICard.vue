<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { mdAndUp } = useDisplay();
const tableKBLIHeader = [
  { title: "No", key: "no_idx" },
  { title: `${t("detail-pu.pu-kbli-no")}`, key: "No" },
  { title: `${t("detail-pu.pu-kbli-nama")}`, key: "KBLI" },
  { title: `${t("detail-pu.pu-kbli-namausaha")}`, key: "Name" },
  { title: `${t("detail-pu.pu-kbli-address")}`, key: "Address" },
  { title: `${t("detail-pu.pu-kbli-modal")}`, key: "BusinessCapital" },
];

const panelOpen = ref(0);
const store = pelakuUsahaProfile();
const isLoading = ref(true);

onMounted(async () => {
  // try {
  //   // console.log("Before loading KBLI:", store.kbli);
  //   // Simulate API call or asynchronous data fetch
  //   await store.fetchProfile(); // Assume this fetches `kbli` data
  //   // console.log("After loading KBLI:", store.kbli);
  // } catch (error) {
  //   console.error("Failed to load KBLI data:", error);
  // } finally {
  //   isLoading.value = false;
  // }
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <!-- <VExpansionPanelTitle
        ><p :class="mdAndUp ? 'subtext-menu' : 'mobile-subtext-menu'">
          KBLI
        </p></VExpansionPanelTitle
      > -->
      <VExpansionPanelTitle>
        <div class="text-h4 font-weight-bold">KBLI</div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <!-- Check if KBLI data exists -->
        <p v-if="!store.kbli">No data</p>
        <p v-if="store.isLoading">Loading...</p>
        <VRow v-else-if="store.kbli && !store.isLoading">
          <VCol style="max-block-size: 30svh; overflow-y: auto">
            <VRow v-for="(item, key) in store.kbli" :key="key">
              <VCol cols="12">
                <div>
                  <div
                    style="
                      padding: 2svh;
                      border: solid #eae9eb;
                      border-radius: 10px;
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
                      <VCol cols="12">
                        {{ t("detail-pu.pu-kbli-nama") }}:
                        {{ item.Name || "-" }}
                      </VCol>
                    </VRow>
                    <VRow>
                      <VCol cols="12">
                        {{ t("detail-pu.pu-kbli-address") }}:
                        {{ item.Address || "-" }}
                      </VCol>
                    </VRow>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <p v-else>No data available</p>
        <VRow>
          <VCol cols="12">
            <VDialog max-width="800">
              <template #activator="{ props: openModal }">
                <VBtn
                  variant="outlined"
                  style="inline-size: 100%"
                  v-bind="openModal"
                >
                  {{ t("detail-pu.pu-izin-act-detail") }}</VBtn
                >
              </template>
              <template #default="{ isActive }">
                <VCard>
                  <VCardTitle style="padding: 3svh">
                    <VRow>
                      <VCol cols="10">
                        <div class="text-h4 font-weight-bold">
                          {{ t("detail-pu.pu-izin-act-detail") }} KBLI
                        </div>
                      </VCol>
                      <VCol cols="2" style="display: flex; justify-content: end"
                        ><VIcon
                          size="small"
                          @click="isActive.value = false"
                          icon="fa-times"
                        ></VIcon
                      ></VCol>
                    </VRow>
                  </VCardTitle>
                  <VCardItem>
                    <VDataTable :headers="tableKBLIHeader" :items="store.kbli">
                      <template #item.no_idx="{ index }">
                        {{ index + 1 }}
                      </template>
                    </VDataTable>
                  </VCardItem>
                </VCard>
              </template>
            </VDialog>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
