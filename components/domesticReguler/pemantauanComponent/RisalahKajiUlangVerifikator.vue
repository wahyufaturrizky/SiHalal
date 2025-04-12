<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Materi", value: "aspek" },
  { title: "Hasil Pembahasan", value: "deskripsi" },
];

const store = useMyVerifikatorRegulerStore();
const { risalah_kaji_ulang } = storeToRefs(store);
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Risalah Kaji Ulang Manajemen</h3></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        disable-sort
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="tableHeader"
        :items="risalah_kaji_ulang"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
