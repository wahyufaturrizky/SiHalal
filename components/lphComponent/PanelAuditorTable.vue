<script setup lang="ts">
const auditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "name", nowrap: true },
  { title: "Tanggal Lahir", key: "birthDate", nowrap: true },
  { title: "JK", key: "jk" },
  { title: "No. Pendaftaran", key: "regisNumber", nowrap: true },
];
const auditorData = ref([
  {
    name: "Bambang",
    birthDate: "20/10/2000",
    jk: "-",
    regisNumber: "REG RI AHA 10102134",
  },
]);
</script>

<template>
  <VDataTable :headers="auditorHeader" :items="auditorData" hide-default-footer>
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>
  </VDataTable>
</template>

<style scoped></style>
