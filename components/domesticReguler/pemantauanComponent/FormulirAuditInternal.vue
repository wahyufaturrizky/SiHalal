<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Deskripsi", value: "description" },
  { title: "Unggahan Bukti Pemenuhan", value: "upload_prove" },
  { title: "Keterangan", value: "notes" },
  { title: "Sesuai / Tidak Sesuai", value: "matched" },
];

const items = [
  {
    description: "xx",
    upload_prove: "xx",
    notes: "xx",
    matched: "xx",
  },
];
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Formulir Data Periksa Audit Internal</h3></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="tableHeader"
        :items="items"
      ></VDataTable>
    </VCardItem>
  </VCard>
</template>
