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
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h3>Detail Pelaku Usaha</h3></VCol>
        <VCol style="display: flex; justify-content: end"
        ><VBtn density="compact" variant="outlined" prepend-icon=""
        >Ubah</VBtn
        ></VCol
        >
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow
      ><VCol cols="12"><ProfileCard></ProfileCard></VCol
      ></VRow>
      <VRow>
        <VCol cols="12">
          <PenanggungJawabCard></PenanggungJawabCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AspekLegalCard></AspekLegalCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="6"><h4>Pabrik</h4></VCol>
              </VRow>
            </VCardTitle>
            <VCardText>
              <VDataTable :headers="tablePabrikHeader"></VDataTable>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="6"><h4>Outlet</h4></VCol>
              </VRow>
            </VCardTitle>
            <VCardText>
              <VDataTable :headers="tableOutletHeader"></VDataTable>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5"><p>Penyelia Halal</p></VCol>
              </VRow>
            </VCardTitle>
            <VCardText><AspekLegalTable></AspekLegalTable></VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <PerizinanCard></PerizinanCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <KBLICard></KBLICard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <DivisiUnitUsaha></DivisiUnitUsaha>
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
</template>
