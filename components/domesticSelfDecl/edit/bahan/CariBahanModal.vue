<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Bahan", value: "ingr_name" },
  { title: "Produsen", value: "manufacturer" },
  { title: "No. Sertifikat", value: "sh_number" },
  { title: "Action", value: "action" },
];
</script>
<template>
  <VDialog>
    <template #activator="{ props: openModal }">
      <VIcon v-bind="openModal" icon="mdi-magnify"></VIcon>
    </template>
    <template #default>
      <VCard>
        <VCardTitle>Cari Bahan</VCardTitle>
        <VCardItem>
          <VDataTable :headers="tableHeader">
            <template #item.action="{ item }">
              <VIcon icon="fa-arrow-right"></VIcon>
            </template>
          </VDataTable>
        </VCardItem>
      </VCard>
    </template>
  </VDialog>
</template>
