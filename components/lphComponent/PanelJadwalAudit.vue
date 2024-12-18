<script setup lang="ts">
const props = defineProps<{
  data: object
}>()

const detail = props?.data
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Tanggal Mulai</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.tanggal_mulai }}
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Tanggal Selesai</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">
        {{ detail?.tanggal_selesai }}
      </VCol>
    </VRow>
  </div>
</template>

<style scoped></style>
