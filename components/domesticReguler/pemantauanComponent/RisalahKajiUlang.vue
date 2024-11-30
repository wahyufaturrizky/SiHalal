<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Materi", value: "material" },
  { title: "Hasil Pembahasan", value: "discussion_result" },
];

const items = [
  {
    material: "xx",
    discussion_result: "xx",
  },
];
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Risalah Kaji Ulang Manajemen</h3></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="tableHeader" :items="items"></VDataTable>
    </VCardItem>
  </VCard>
</template>
