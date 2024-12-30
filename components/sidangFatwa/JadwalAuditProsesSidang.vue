<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
const { jadwal_audit } = detaildata || {};
const { tanggal_mulai, tanggal_selesai } = jadwal_audit || {};

const expanded = [0];
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Jadwal Audit</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow>
          <VCol cols="3">
            <p>Tanggal Mulai</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>{{ formatDate(tanggal_mulai) }}</p>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="3">
            <p>Tanggal Selesai</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>{{ formatDate(tanggal_selesai) }}</p>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
