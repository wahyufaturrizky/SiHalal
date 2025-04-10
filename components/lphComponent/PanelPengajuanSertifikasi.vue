<script setup lang="ts">
const props = defineProps<{
  dataPengajuan: object;
}>();

const detail = props?.dataPengajuan;
</script>

<template>
  <div v-if="detail" class="d-flex flex-column ga-4">
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">No / Tanggal Permohonan</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ formatDateId((detail as any)?.tanggal_buat) }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Jenis Layanan</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.jenis_usaha }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Jenis Pengajuan</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.jenis_pendaftaran }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Jenis Produk</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.jenis_produk }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Merek Dagang</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.nama_pu }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Area Pemasaran</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ (detail as any)?.provinsi }}
      </VCol>
    </VRow>
  </div>
</template>

<style scoped></style>
