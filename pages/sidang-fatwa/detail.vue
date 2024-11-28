<script lang="ts" setup>
import SubPelakuUsahaLayout from '@/layouts/subPelakuUsahaLayout.vue';
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h2>Detail Data Pengajuan</h2></VCol>
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <ProfileDetailPengajuan />
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
          <HasilAuditDetailPengajuan />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <KBLICard />
        </VCol>
      </VRow>
      <VRow>
        ;
        <VCol :cols="12">
          <DivisiUnitUsaha />
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
</template>

<style lang="scss" scoped>

</style>
