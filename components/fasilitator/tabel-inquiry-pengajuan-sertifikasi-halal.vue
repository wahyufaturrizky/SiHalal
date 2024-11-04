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
    Status: "Done",
    "Kode Fasilitasi": "O30F",
  },
];
</script>

<template>
  <div>
    <VRow>
      <VCard class="w-100">
        <VCardTitle>Data Pengajuan Sertifikasi Halal</VCardTitle>
        <VCardItem>
          <VRow>
            <VCol>
              <VDataTable :items="items" />
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VRow>
  </div>
</template>
