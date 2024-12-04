<script lang="ts" setup>
import BiayaPemeriksaan from '@/components/sidangFatwa/BiayaPemeriksaan.vue';
import SubPelakuUsahaLayout from '@/layouts/subPelakuUsahaLayout.vue';
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow
        justify="space-between"
        align="center"
      >
        <VCol cols="12">
          <h2 class="font-weight-bold">
            Detail Data Pengajuan
          </h2>
        </VCol>
        <VCol cols="auto">
          <VBtn
            color="primary"
            outlined
            class="text-capitalize"
            @click="updateStatus"
          >
            Update Status Selesai Sidang Fatwa
          </VBtn>
          <VBtn
            color="primary"
            class="text-capitalize ml-4"
            @click="unggahKetetapanHalal"
          >
            Unggah Ketetapan Halal
          </VBtn>
        </VCol>
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
