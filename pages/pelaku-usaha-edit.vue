<script setup lang="ts">
import DivisiUnitUsaha from "@/components/pelakuUsahaProfile/DivisiUnitUsaha.vue";
import PerizinanCard from "@/components/pelakuUsahaProfile/PerizinanCard.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";

// import DeleteConfirmation from "@/views/pages/pelaku-usaha/DeleteConfirmation.vue";
// import SaveConfirmation from "@/views/pages/pelaku-usaha/SaveConfirmation.vue";

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

// const onEdit = () => {
//   navigateTo("/pelaku-usaha-edit");
// };
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h3>Ubah Pelaku Usaha</h3></VCol>
        <VCol style="display: flex; justify-content: end">
          <DeleteConfirmation />
          <SaveConfirmation />
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
          <PenanggungJawabCardEdit />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AspekLegalCardEdit />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <PabrikCardEdit />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <OutletEdit />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <PenyeliaHallalEdit />
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
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
      <VRow>
        <VCol :cols="12">
          <DivisiUnitUsaha />
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
</template>
