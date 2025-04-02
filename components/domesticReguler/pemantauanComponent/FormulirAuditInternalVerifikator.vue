<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Deskripsi", value: "deskripsi" },
  { title: "Unggahan Bukti Pemenuhan", value: "upload_prove" },
  { title: "Keterangan", value: "notes" },
  { title: "Sesuai / Tidak Sesuai", value: "matched" },
];
const store = useMyVerifikatorRegulerStore();
const { formulir_data_periksa_audit_internal } = storeToRefs(store);
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
        :items="formulir_data_periksa_audit_internal"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>
