<script lang="ts" setup>
import BiayaPemeriksaan from '@/components/sidangFatwa/BiayaPemeriksaan.vue';
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
          <PengajuanSertifikat />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <DaftarNamaProduk />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <BiayaPemeriksaan />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <JadwalAudit />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AuditorList />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <HasilPemeriksaan />
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
          <BiayaPemeriksaanDetail />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <DokumenUnduhan />
        </VCol>
        <VCol :cols="12">
          <MelacakDetaikFatwa />
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
</template>

<style lang="scss" scoped>

</style>
