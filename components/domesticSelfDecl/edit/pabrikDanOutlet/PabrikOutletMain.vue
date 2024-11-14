<script setup lang="ts">
const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "kind" },
  { title: "No. Dokumen", key: "no_docs" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "exp_date" },
  { title: "Instansi Penerbit", key: "publisher" },
  { title: "Action", key: "action" },
];

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
  { title: "Action", key: "action" },
];
</script>
<template>
  <div style="max-height: 50svh; overflow-y: auto">
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>
            <VRow>
              <VCol cols="6"><h4>Pabrik</h4></VCol>
              <VCol cols="6" style="display: flex; justify-content: end"
                ><VBtn density="compact" variant="outlined">Tambah</VBtn></VCol
              >
            </VRow>
          </VCardTitle>
          <VCardText>
            <VDataTable :headers="tablePabrikHeader"></VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>
            <VRow>
              <VCol cols="6"><h4>Outlet</h4></VCol>
              <VCol cols="6" style="display: flex; justify-content: end"
                ><VBtn density="compact" variant="outlined">Tambah</VBtn></VCol
              >
            </VRow>
          </VCardTitle>
          <VCardText>
            <VDataTable :headers="tableOutletHeader"></VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
