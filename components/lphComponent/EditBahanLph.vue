<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <FormDaftarNamaBahanDanKemasan :is-editable="props.isEditable" />
  <FormDaftarNamaProduk :is-editable="props.isEditable" />
  <FormCatatanPembelianBahan :is-editable="props.isEditable" />
  <FormPemeriksaanBahan :is-editable="props.isEditable" />
</template>

<style scoped lang="scss"></style>
