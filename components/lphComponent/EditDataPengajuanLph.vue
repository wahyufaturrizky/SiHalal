<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <FormPengajuanSertifikasiHalal :is-editable="props.isEditable" />
  <FormPenanggungJawab :is-editable="props.isEditable" />
  <FormAspekLegal :is-editable="props.isEditable" />
  <FormPabrik :is-editable="props.isEditable" />
  <FormOutlet :is-editable="props.isEditable" />
  <FormPenyeliaHalal :is-editable="props.isEditable" />
</template>
