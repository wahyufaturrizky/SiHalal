<script setup lang="ts">

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});
// TODO -> PERLU HIT API, APAKAH SUDAH MENYETUJUI PERNYTAAN BEBAS BABI
const isAgree = ref(false)

const confirm = check => isAgree.value = check

</script>

<template>
  <FormCheckPernyataanBebasBabi @confirm="confirm" v-if="!isAgree" />
  <div v-if="isAgree">
    <FormLayoutProduksi :is-editable="props.isEditable"/>
    <FormCatatanPenyimpananBahanDanProduk :is-editable="props.isEditable"/>
    <FormDiagramAlurProsesProduksi :is-editable="props.isEditable"/>
    <FormCatatanHasilProduksi :is-editable="props.isEditable"/>
    <FormCatatanDistribusi :is-editable="props.isEditable"/>
  </div>
</template>

<style scoped lang="scss">

</style>
