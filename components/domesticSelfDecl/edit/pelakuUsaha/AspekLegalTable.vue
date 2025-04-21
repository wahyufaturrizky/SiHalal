<script setup lang="ts">
const legalHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "kind" },
  { title: "No. Dokumen", key: "no_docs" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "exp_date" },
  { title: "Instansi Penerbit", key: "publisher" },
  { title: "Action", key: "action" },
];
</script>

<template>
  <VDataTable
    disable-sort
    :items-per-page-options="[10, 25, 50, 100]"
    :headers="legalHeader"
  >
    <template #item.date="{ item }">
      {{ item.date ? formatDateId(item.date) : "NA" }}
    </template>
  </VDataTable>
</template>
