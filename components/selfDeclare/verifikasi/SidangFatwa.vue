<script lang="ts" setup>
interface SidangFatwa {
  dokumen: string;
  nomor_penetapan: string;
  penetapan: string;
  tanggal_penetapan: string;
}
const props = defineProps<{ data: SidangFatwa }>();
const dataDetail = ref(props.data);

watchEffect(() => {
  dataDetail.value = props.data;
});

const { data } = props || {};
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="3"> Nomor Penetapan </VCol>
      <VCol cols="1"> : </VCol>
      <VCol cols="8">
        {{ dataDetail.nomor_penetapan }}
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="3"> Tanggal Penetapan </VCol>
      <VCol cols="1"> : </VCol>
      <VCol cols="8">
        {{ formatDateId(dataDetail.tanggal_penetapan) }}
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="3"> Hasil Penetapan </VCol>
      <VCol cols="1"> : </VCol>
      <VCol cols="8">
        {{ dataDetail.penetapan }}
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="3"> Dokumen </VCol>
      <VCol cols="1"> : </VCol>
      <VCol cols="8">
        {{ dataDetail.dokumen }}
      </VCol>
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
