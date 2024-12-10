<script setup lang="ts">
import AspekLegalCard from "@/components/pelakuUsahaProfile/AspekLegalCard.vue";
import PerizinanCard from "@/components/pelakuUsahaProfile/PerizinanCard.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";
import { pelakuUsahaProfile } from "@/stores/pelaku-usaha-profile";

const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
  { title: "Action", key: "action" },
];

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
];

const penyeliaHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "No. KTP", key: "ktp_no" },
  { title: "No. Kontak", key: "no_contact" },
  { title: "No/Tgl Sertif Penyelia Halal", key: "certification_no" },
  { title: "No/Tanggal SK", key: "sk_no" },
  { title: "Action", key: "action" },
];
// const { canAccess } = useMyAuthUserStore();
const panelOpenPabrik = ref(0);
const panelOpenOutlet = ref(0);
const panelOpenPenyeliaHallal = ref(0);

const onEdit = () => {
  navigateTo("/pelaku-usaha-edit");
};

const store = pelakuUsahaProfile();

onMounted(() => {
  store.fetchProfile();
});

const downloadDOcument = async (filename: string) => {
  try {
    const response = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
      },
    });
    window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h3>Detail Pelaku Usaha</h3></VCol>
        <VCol style="display: flex; justify-content: end">
          <VBtn
            density="compact"
            variant="outlined"
            prepend-icon=""
            @click="onEdit"
          >
            Ubah
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
              <VExpansionPanelTitle><h2>Pabrik</h2></VExpansionPanelTitle>

              <VExpansionPanelText>
                <VDataTable
                  :headers="tablePabrikHeader"
                  :items="store.factory ? store.factory : []"
                >
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
              <VExpansionPanelTitle><h2>Outlet</h2></VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="tableOutletHeader"
                  :items="store.outlet ? store.outlet : []"
                >
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
                <h2>Penyelia Halal</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="penyeliaHeader"
                  :items="store.supervisorData"
                >
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
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <PerizinanCard :aspek-legal-data="store.legal" />
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
