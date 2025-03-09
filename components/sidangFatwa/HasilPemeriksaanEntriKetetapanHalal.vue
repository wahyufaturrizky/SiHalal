<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
})

const { detaildata } = props || {}
const { hasil_audit } = detaildata || {}
const { tanggal_selesai, hasil } = hasil_audit || {}

const expanded = ref(0)
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Hasil Pemeriksaan</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow>
          <VCol cols="3">
            <p>Tanggal Selesai LPH</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>{{ formatDate(tanggal_selesai) }}</p>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3">
            <p>Hasil</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>{{ hasil === "PR001" ? "Lulus" : "Tidak Lulus" }}</p>
          </VCol>
        </VRow>
        <!--
          <VRow>
          <VCol cols="3">
          <p>Dokumen</p>
          </VCol>
          <VCol cols="1">
          <p>:</p>
          </VCol>
          <VCol cols="8">
          <p>{{ dokumen || "-" }}</p>
          </VCol>
          </VRow>
        -->
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
