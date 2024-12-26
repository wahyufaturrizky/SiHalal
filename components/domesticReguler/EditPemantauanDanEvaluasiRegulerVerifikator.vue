<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <VRow>
    <VCol cols="12"><UploadDocumentVerifikator></UploadDocumentVerifikator></VCol>
  </VRow>
  <VRow>
    <VCol cols="12"><SignagePemantauanVerifikator></SignagePemantauanVerifikator></VCol>
  </VRow>
  <VRow>
    <VCol cols="12"><FormulirAuditInternalVerifikator></FormulirAuditInternalVerifikator></VCol>
  </VRow>
  <VRow>
    <VCol cols="12"><RisalahKajiUlangVerifikator></RisalahKajiUlangVerifikator></VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
