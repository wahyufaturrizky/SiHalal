<script setup lang="ts">
const store = useMyVerifikatorRegulerStore();
const { dokumen } = storeToRefs(store);
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
          <VBtn :disabled="dokumen.permohonan == ''" @click="download(dokumen.permohonan,'FILES')" append-icon="fa-download" variant="flat">Unduh</VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="4">Dokumen SJPH</VCol>
        <VCol cols="1">:</VCol>
        <VCol cols="7" style="display: flex; justify-content: start;">
          <VBtn :disabled="dokumen.sjph == ''" @click="download(dokumen.sjph,'FILES')" append-icon="fa-download" variant="flat">Unduh</VBtn>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
