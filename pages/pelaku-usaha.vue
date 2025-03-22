<script setup lang="ts">
import AspekLegalCard from "@/components/pelakuUsahaProfile/AspekLegalCard.vue";
import PerizinanCard from "@/components/pelakuUsahaProfile/PerizinanCard.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";
import { pelakuUsahaProfile } from "@/stores/pelaku-usaha-profile";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "detail-pu.pu-title", key: "name" },
  { title: "detail-pu.pu-fac-address", key: "address" },
  { title: "detail-pu.pu-fac-action", key: "action" },
];

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "detail-pu.pu-out-nama", key: "name" },
  { title: "detail-pu.pu-out-address", key: "address" },
];

const penyeliaHeader = [
  { title: "No", key: "no" },
  { title: "detail-pu.pu-ph-nama", key: "name" },
  { title: "detail-pu.pu-ph-ktp", key: "ktp_no" },
  { title: "detail-pu.pu-ph-telp", key: "no_kontak" },
  { title: "detail-pu.pu-ph-sertif", key: "certification_no" },
  { title: "detail-pu.pu-ph-sk", key: "sk_no" },
  // { title: "Action", key: "action" },
];
// const { canAccess } = useMyAuthUserStore();
const panelOpenPabrik = ref(0);
const panelOpenOutlet = ref(0);
const panelOpenPenyeliaHallal = ref(0);

const onEdit = () => {
  navigateTo("/pelaku-usaha-edit");
};

const store = pelakuUsahaProfile();
const { mdAndUp } = useDisplay();

onMounted(() => {
  store.fetchProfile();
});
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow align="center">
        <VCol>
          <!-- <h2 :class="mdAndUp ? 'text-menu' : 'mobile-text-menu'">Detail Pelaku Usaha</h2> -->
          <h1 style="font-size: 32px">{{ t("detail-pu.pu-title") }}</h1>
        </VCol>
        <VCol style="display: flex; justify-content: end">
          <VBtn
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onEdit"
          >
            {{ t("detail-pu.pu-head-edit") }}
          </VBtn>
        </VCol>
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <ProfileCard
            v-if="store.getProfileData"
            :profile-data="store.profileData"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <PenanggungJawabCard
            v-if="store.penanggungJawabHalal"
            :responsible-person-data="store.penanggungJawabHalal"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AspekLegalCard :aspek-legal-data="store.legal ? store.legal : []" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPabrik">
            <VExpansionPanel>
              <!-- <VExpansionPanelTitle><p :class="mdAndUp ? 'subtext-menu' : 'mobile-subtext-menu'">Pabrik</p></VExpansionPanelTitle> -->
              <VExpansionPanelTitle>
                <div class="text-h4 font-weight-bold">
                  {{ t("detail-pu.pu-fac-title") }}
                </div>
              </VExpansionPanelTitle>

              <VExpansionPanelText>
                <VDataTable
                  :headers="tablePabrikHeader"
                  :items="store.factory || []"
                >
                  <template #header.name="{ column }">
                    <div>
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.address="{ column }">
                    <div>
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.action="{ column }">
                    <div>
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #item.no="{ index }">
                    {{ index + 1 }}
                  </template>
                </VDataTable>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenOutlet">
            <VExpansionPanel>
              <!-- <VExpansionPanelTitle><p :class="mdAndUp ? 'subtext-menu' : 'mobile-subtext-menu'">Outlet</p></VExpansionPanelTitle> -->
              <VExpansionPanelTitle>
                <div class="text-h4 font-weight-bold">
                  {{ t("detail-pu.pu-out-title") }}
                </div>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="tableOutletHeader"
                  :items="store.outlet ? store.outlet : []"
                >
                  <template #header.name="{ column }">
                    <div>
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.address="{ column }">
                    <div>
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #item.no="{ index }">
                    {{ index + 1 }}
                  </template>
                </VDataTable>
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
                <!-- <p :class="mdAndUp ? 'subtext-menu' : 'mobile-subtext-menu'">Penyelia Halal</p> -->
                <div class="text-h4 font-weight-bold">
                  {{ t("detail-pu.pu-ph-title") }}
                </div>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="penyeliaHeader"
                  :items="store.supervisorData || []"
                >
                  <template #header.name="{ column }">
                    <div>
                      {{ t(column.title) ? t(column.title) : "Nama" }}
                    </div>
                  </template>

                  <template #header.ktp_no="{ column }">
                    <div>
                      {{ t(column.title) ? t(column.title) : "NO KTP" }}
                    </div>
                  </template>

                  <template #header.no_kontak="{ column }">
                    <div>
                      {{ t(column.title) ? t(column.title) : "NO KONTAK" }}
                    </div>
                  </template>

                  <template #header.sk_no="{ column }">
                    <div>
                      {{
                        t(column.title)
                          ? t(column.title)
                          : "NO/TGL SERTIF PENYELIA HALAL"
                      }}
                    </div>
                  </template>

                  <template #header.certification_no="{ column }">
                    <div>
                      {{ t(column.title) ? t(column.title) : "NO/TANGGAL SK" }}
                    </div>
                  </template>

                  <template #item.no="{ index }">
                    {{ index + 1 }}
                  </template>
                </VDataTable></VExpansionPanelText
              >
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template
      #rightContent
      v-if="store.profileData?.asal_usaha?.toLowerCase() !== 'luar negeri'"
    >
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
      <!-- <VRow>
        <VCol :cols="12">
          <DivisiUnitUsaha />
        </VCol>
      </VRow> -->
    </template>
  </SubPelakuUsahaLayout>
</template>
