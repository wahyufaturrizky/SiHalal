<script setup lang="ts">
const items = [
  {
    No: "1",
    "No. Daftar": "1232131jnjadd",
    Tanggal: "2024-10-05",
    "Nama PU": "budi",
    "Jenis Daftar": "wdbadbaiwd",
    "Jenis Produk": "awdbuabdiawbdi",
    "Merk Dagangan": "awidbiabdiw",
    "Kode Fasilitasi": "O30F",
    Status: "Done",
  },
];
</script>

<template>
  <div>
    <VCard class="w-100">
      <VCardTitle class="mt-3"> Data Pengajuan Sertifikasi Halal </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol>
            <VDataTable :items="items" />
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </div>
</template>
