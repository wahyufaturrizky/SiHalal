<script setup lang="ts">
const expanded = [0];

const data = [
  { id: 1, key: "Nomor STTD", value: "SH-283448698" },
  { id: 2, key: "Nama PU", value: "Amanda Nugraga" },
  { id: 3, key: "Jenis Produk", value: "Minuman Dengan Pengolahan" },
];

const selectable = [
  { id: 1, value: "", title: "Ditetapkan Halal" },
  { id: 2, value: "", title: "Dikembalikan" },
  { id: 3, value: "", title: "Ditolak" },
];
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Pendaftaran</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-for="item in data" :key="item.id">
          <VCol cols="3">
            <p>{{ item.key }}</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8">
            <p>{{ item.value }}</p>
          </VCol>
        </VRow>
        <VRow style="display: flex; align-items: center">
          <VCol cols="3">
            <p>Keterangan</p>
          </VCol>
          <VCol cols="1">
            <p>:</p>
          </VCol>
          <VCol cols="8"
            ><VSelect density="compact" :items="selectable"></VSelect
          ></VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
