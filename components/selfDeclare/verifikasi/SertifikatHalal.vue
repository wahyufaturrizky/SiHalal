<script lang="ts" setup>
interface Sertifikat {
  no_sertifikat: string;
  tgl_sertifikat: string;
}
const props = defineProps<{ data: Sertifikat }>();

const dataDetail = ref(props.data);
watchEffect(() => {
  dataDetail.value = props.data;
});

</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="3"> Nomor Sertifikat </VCol>
      <VCol cols="1"> : </VCol>
      <VCol cols="8"> {{ dataDetail.no_sertifikat }} </VCol>
    </VRow>
    <VRow>
      <VCol cols="3"> Tanggal Terbit </VCol>
      <VCol cols="1"> : </VCol>
      <VCol cols="8">{{ dataDetail.tgl_sertifikat }} </VCol>
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
