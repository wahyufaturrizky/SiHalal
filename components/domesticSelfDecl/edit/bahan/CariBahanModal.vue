<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Bahan", value: "ingr_name" },
  { title: "Produsen", value: "manufacturer" },
  { title: "No. Sertifikat", value: "sh_number" },
  { title: "Action", value: "action" },
];

const showDialog = ref(false);
</script>
<template>
  <VIcon icon="mdi-magnify"></VIcon>
  <VDialog>
    <VCard>
      <VCardTitle>Cari Bahan</VCardTitle>
      <VCardItem>
        <VDataTable
          disable-sort
          :items-per-page-options="[10, 25, 50, 100]"
          :headers="tableHeader"
        >
          <template #item.action="{ item }">
            <VIcon icon="fa-arrow-right"></VIcon>
          </template>
        </VDataTable>
      </VCardItem>
    </VCard>
  </VDialog>
</template>
