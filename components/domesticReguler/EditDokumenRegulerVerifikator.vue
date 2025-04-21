<script setup lang="ts">
const props = defineProps({
  permohonan: {
    type: Object,
    default: {},
    required: false,
  },
  sjph: {
    type: Object,
    default: {},
    required: false,
  },
})

const suratPermohonan = ref(props.permohonan.file || '')
const suratSjph = ref(props.sjph.file || '')
const download = async (item:string,directori:string) => {
  await downloadDocument(item,directori);
};
</script>

<template>
  <VCard>
    <VCardTitle><h3>Unduh Dokumen kelengkapan</h3></VCardTitle>
    <VCardItem>
      <VRow>
        <VCol cols="4">Dokumen Surat Permohonan</VCol>
        <VCol cols="1">:</VCol>
        <VCol cols="7" style="display: flex; justify-content: start;">
          <VBtn :disabled="suratPermohonan === ''" @click="download(suratPermohonan,'FILES')" append-icon="fa-download" variant="flat">Unduh</VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="4">Dokumen SJPH</VCol>
        <VCol cols="1">:</VCol>
        <VCol cols="7" style="display: flex; justify-content: start;">
          <VBtn :disabled="suratSjph === ''" @click="download(suratSjph,'FILES')" append-icon="fa-download" variant="flat">Unduh</VBtn>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
