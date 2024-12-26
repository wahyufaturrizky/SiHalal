<script setup lang="ts">

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});
// TODO -> PERLU HIT API, APAKAH SUDAH MENYETUJUI PERNYTAAN BEBAS BABI (default nya false)
const isAgree = ref(false || !props.isEditable)

const confirm = check => isAgree.value = check

</script>

<template>
    <FormLayoutProduksiVerifikator/>
    <FormCatatanPenyimpananBahanDanProduk :is-editable="props.isEditable"/>
    <FormDiagramAlurProsesProduksi :is-editable="props.isEditable"/>
    <FormCatatanHasilProduksi :is-editable="props.isEditable"/>
    <FormCatatanDistribusi :is-editable="props.isEditable"/>
</template>

<style scoped lang="scss">

</style>
