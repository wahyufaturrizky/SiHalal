<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <VRow>
    <VCol cols="12"
      ><UploadDocument :is-editable="props.isEditable"></UploadDocument
    ></VCol>
  </VRow>
  <VRow>
    <VCol cols="12"
      ><SignagePemantauan :is-editable="props.isEditable"></SignagePemantauan
    ></VCol>
  </VRow>
  <VRow>
    <VCol cols="12"><FormulirAuditInternal></FormulirAuditInternal></VCol>
  </VRow>
  <VRow>
    <VCol cols="12"><RisalahKajiUlang></RisalahKajiUlang></VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
