<script lang="ts" setup>
interface Pemeriksaan {
  dokumen: string;
  hasil: string;
  lph: string;
  tgl_selesai_lph: string;
}
const props = defineProps<{data : Pemeriksaan}>();

const dataDetail = ref(props.data)
watchEffect(()=> {
  dataDetail.value = props.data
})
</script>

<template>
  <VContainer>
  <VRow>
    <VCol cols="3"> LPH </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8">{{dataDetail.lph}}</VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Tanggal Selesai LPH </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.tgl_selesai_lph}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Hasil </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.hasil}} </VCol>
  </VRow>
  <VRow>
    <VCol cols="3"> Dokumen </VCol>
    <VCol cols="1"> : </VCol>
    <VCol cols="8"> {{dataDetail.dokumen}} </VCol>
  </VRow>
</VContainer>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
