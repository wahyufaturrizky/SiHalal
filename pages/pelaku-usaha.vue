<script setup lang="ts">
import AspekLegalCard from "@/components/pelakuUsahaProfile/AspekLegalCard.vue";
import DivisiUnitUsaha from "@/components/pelakuUsahaProfile/DivisiUnitUsaha.vue";
import PerizinanCard from "@/components/pelakuUsahaProfile/PerizinanCard.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";

const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "kind" },
  { title: "No. Dokumen", key: "no_docs" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "exp_date" },
  { title: "Instansi Penerbit", key: "publisher" },
];

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
];
const { canAccess } = useMyAuthUserStore();
const panelOpenPabrik = ref(0);
const panelOpenOutlet = ref(0);
const panelOpenPenyeliaHallal = ref(0);

const onEdit = () => {
  navigateTo("/pelaku-usaha-edit");
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
          <ProfileCard />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <PenanggungJawabCard />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AspekLegalCard />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPabrik">
            <VExpansionPanel>
              <VExpansionPanelTitle><h2>Pabrik</h2></VExpansionPanelTitle>

              <VExpansionPanelText>
                <VDataTable :headers="tablePabrikHeader" />
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
                <VDataTable :headers="tableOutletHeader" />
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
              <VExpansionPanelText><AspekLegalTable /></VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <PerizinanCard v-if="canAccess(['Pelaku Usaha'])" />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <KBLICard />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <DivisiUnitUsaha />
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
</template>
