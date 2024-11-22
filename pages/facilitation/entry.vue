<script setup lang="ts">
const tableHeader = [
  { title: "No", key: "no" },
  { title: "Kode Fasilitasi", key: "facility_code" },
  { title: "Tahun", key: "year" },
  { title: "Nama Fasilitasi", key: "facilitate_name" },
  { title: "Sumber Pembiayaan", key: "source_of_fund" },
  { title: "Jenis", key: "kind" },
  { title: "Action", key: "action" },
];
</script>
<template>
  <VRow>
    <VCol><h3>Entri Fasilitasi</h3></VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle><h4>List Fasilitasi</h4></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="6">
              <VTextField
                placeholder="Cari data"
                append-icon="mdi-magnify"
              ></VTextField>
            </VCol>
            <VCol cols="6" style="display: flex; justify-content: end">
              <EntryFacilitateModal></EntryFacilitateModal>
            </VCol>
          </VRow>
          <VRow>
            <VDataTable :headers="tableHeader">
              <template #item.action="{ item }">
                <VIcon icon="fa-plus"></VIcon>
              </template>
            </VDataTable>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
