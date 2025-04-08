<script setup lang="ts">
const items = [
  {
    No: 1,
    "No. Sertifikat": "1232131jnjadd",
    "Tanggal Terbit": "2024-10-05",
    "Jatuh Tempo": "2024-12-05",
    "Nama PU": "wdbadbaiwd",
    "Jenis Produk": "awdbuabdiawbdi",
    Hari: "awidbiabdiw",
  },
];
</script>

<template>
  <div>
    <VRow>
      <VCol><KembaliButton /></VCol>
    </VRow>
    <VRow>
      <VCol><h1>Sertifikat Halal Jatuh Tempo</h1></VCol>
    </VRow>
    <VRow>
      <VCard class="w-100">
        <VCardTitle>Daftar Sertifikat Jatuh Tempo</VCardTitle>
        <VCardItem>
          <VRow
            ><VCol><VTextField label="Searching" /></VCol
          ></VRow>
          <VRow>
            <VCol>
              <VDataTable
                :items-per-page-options="[10, 25, 50, 100]"
                :items="items"
              />
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VRow>
  </div>
</template>
