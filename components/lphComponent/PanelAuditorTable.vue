<script setup lang="ts">
const props = defineProps<{
  data: object;
}>();

const auditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "nama", nowrap: true },
  { title: "Tanggal Lahir", key: "tanggal_lahir", nowrap: true },
  { title: "JK", key: "jk" },
  { title: "No. Pendaftaran", key: "no_reg", nowrap: true },
];
</script>

<template>
  <VDataTable
    disable-sort
    :headers="auditorHeader"
    :items="props?.data"
    hide-default-footer
    class="border rounded"
  >
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>

    <template #item.tanggal_lahir="{ item }">
      {{ formatDateId(item.tanggal_lahir) }}
    </template>
  </VDataTable>
</template>

<style scoped></style>
