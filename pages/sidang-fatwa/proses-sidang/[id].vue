<script setup lang="ts">
import HasilPemeriksaan from "@/components/sidangFatwa/HasilPemeriksaan.vue";
</script>

<!-- role pendamping -->

<template>
  <VRow>
    <VCol cols="12"><KembaliButton></KembaliButton></VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <h2>Laporan Hasil Pendampingan</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VRow>
        <VCol cols="12"><ProfilPendampingan></ProfilPendampingan></VCol>
      </VRow>
      <VRow>
        <VCol cols="12"
          ><DaftarNamaBahanPendampingan></DaftarNamaBahanPendampingan
        ></VCol>
      </VRow>
      <VRow>
        <VCol cols="12"><BiayaPemeriksaan></BiayaPemeriksaan></VCol>
      </VRow>
      <VRow>
        <VCol cols="12"><JadwalAudit></JadwalAudit></VCol>
      </VRow>
      <VRow>
        <VCol cols="12"><AuditorList></AuditorList></VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <HasilPemeriksaan></HasilPemeriksaan>
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="4">
      <VRow
        ><VCol cols="12"><PendaftaranPendamping></PendaftaranPendamping></VCol
      ></VRow>
      <VRow
        ><VCol cols="12"><MelacakPendamping></MelacakPendamping></VCol
      ></VRow>
      <RestPanelPendamping></RestPanelPendamping>
    </VCol>
  </VRow>
</template>
