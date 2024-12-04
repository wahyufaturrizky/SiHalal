<script setup>
import { ref } from 'vue'
</script>

<template>
  <div>
    <VCard>
      <VCardTitle><h3>Unduh Dokumen kelengkapan</h3></VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="4">
            Dokumen Surat Permohonan
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol
            cols="7"
            style="display: flex; justify-content: start"
          >
            <VBtn
              append-icon="fa-download"
              variant="flat"
            >
              Unduh
            </VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4">
            Dokumen SJPH
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol
            cols="7"
            style="display: flex; justify-content: start"
          >
            <VBtn
              append-icon="fa-download"
              variant="flat"
            >
              Unduh
            </VBtn>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </div>
</template>

  <style scoped>
  .text-center {
    text-align: center;
  }
  .bgContent {
    background-color: #F0E9F1;
    border-radius: 10px;
  }
  .progress-text {
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 20px !important;
  }
  </style>
