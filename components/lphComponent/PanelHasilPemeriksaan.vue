<script setup lang="ts">
const props = defineProps<{
  type?: "READ" | "EDIT";
}>();

const panelType = computed(() => (props.type ? props.type : "READ"));
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Tanggal Selesai LPH</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">10/12/2023</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Hasil</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">{{ panelType == "READ" ? "-" : "Lulus" }}</VCol>
    </VRow>
    <VRow no-gutters>
      <VCol cols="5">
        <div class="d-flex justify-space-between">
          <div class="text-h6">Dokumen</div>
          <div class="me-2">:</div>
        </div>
      </VCol>
      <VCol cols="7">-</VCol>
    </VRow>
  </div>
</template>

<style scoped></style>
