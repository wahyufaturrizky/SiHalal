<script setup lang="ts">

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});
// TODO -> PERLU HIT API, APAKAH SUDAH MENYETUJUI PERNYTAAN BEBAS BABI (default nya false)
const isAgree = ref(false || !props.isEditable)


</script>

<template>
    <FormLayoutProduksiVerifikator/>
    <FormCatatanPenyimpananBahanDanProdukVerifikator/>
    <FormDiagramAlurProsesProduksiVerifikator/>
    <FormCatatanHasilProduksiVerifikator/>
    <FormCatatanDistribusiVerifikator/>
</template>

<style scoped lang="scss">

</style>
