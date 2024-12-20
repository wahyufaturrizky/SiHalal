<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <VRow no-gutters class="mb-4">
    <VCol cols="3">
      <div class="d-flex justify-space-between">
        <div class="text-h6 font-weight-bold">Nama</div>
        <div class="me-2">:</div>
      </div>
    </VCol>
    <VCol cols="9">{{ props.data.nama_pu ? props.data.nama_pu : "-" }}</VCol>
  </VRow>
  <VRow no-gutters class="mb-4">
    <VCol cols="3">
      <div class="d-flex justify-space-between">
        <div class="text-h6 font-weight-bold">Alamat</div>
        <div class="me-2">:</div>
      </div>
    </VCol>
    <VCol cols="9">{{
      props.data.alamat_pu ? props.data.alamat_pu : "-"
    }}</VCol>
  </VRow>
  <VRow no-gutters class="mb-4">
    <VCol cols="3">
      <div class="d-flex justify-space-between">
        <div class="text-h6 font-weight-bold">Jenis Badan Usaha</div>
        <div class="me-2">:</div>
      </div>
    </VCol>
    <VCol cols="9">{{
      props.data.jenis_badan_usaha ? props.data.jenis_badan_usaha : "-"
    }}</VCol>
  </VRow>
  <VRow no-gutters class="mb-4">
    <VCol cols="3">
      <div class="d-flex justify-space-between">
        <div class="text-h6 font-weight-bold">Skala usaha</div>
        <div class="me-2">:</div>
      </div>
    </VCol>
    <VCol cols="9">{{
      props.data.skala_usaha ? props.data.skala_usaha : "-"
    }}</VCol>
  </VRow>
  <VRow no-gutters class="mb-4">
    <VCol cols="3">
      <div class="d-flex justify-space-between">
        <div class="text-h6 font-weight-bold">Penanggung Jawab</div>
        <div class="me-2">:</div>
      </div>
    </VCol>
    <VCol cols="9">{{ props.data.nama_pj ? props.data.nama_pj : "-" }}</VCol>
  </VRow>
</template>
