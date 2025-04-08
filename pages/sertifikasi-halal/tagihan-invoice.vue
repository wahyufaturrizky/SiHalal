<script setup lang="ts">
const items = [
  {
    No: 1,
    "No. Pembayaran": "1232131jnjadd",
    "No.Tagihan": "",
    "Tanggal Tagihan": "2024-10-05",
    "No. Ref": "",
    "Nama PU": "wdbadbaiwd",
    "Jenis Transaksi": "",
    "Jatuh Tempo": "2024-12-05",
    "Jumlah Tagihan": "",
    Status: "",
    Catatan: "",
  },
];
</script>

<template>
  <div>
    <VRow>
      <!-- <VCol><VBtn>Kembali</VBtn></VCol> -->
      <VCol><KembaliButton /></VCol>
    </VRow>
    <VRow>
      <VCol><h1>Tagihan/Invoice</h1></VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard class="w-100">
          <VCardTitle>Download Cara Bayar</VCardTitle>
          <VCardItem>
            <VRow>
              <VCol class="v-col-3">
                <p>Dokumen Cara Bayar</p>
              </VCol>
              <VCol class="v-col-1">
                <p>:</p>
              </VCol>
              <VCol class="align-self-start">
                <VBtn>Download</VBtn>
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
    <br />
    <VRow>
      <VCol>
        <VCard class="w-100">
          <VCardTitle>Daftar Tagihan/Invoice</VCardTitle>
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
      </VCol>
    </VRow>
  </div>
</template>
