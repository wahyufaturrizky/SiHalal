<script setup lang="ts">



const daftarTagihanHeader = [
  { title: "No", key: "no"},
  { title: "No. Tagihan", key: "noTagihan"},
  { title: "Tanggal", key: "tanggal"},
  { title: "Total", key: "total"},
  { title: "Status", key: "status"},
  { title: "Bukti Bayar", key: "buktiBayar"},
  { title: "Invoice", key: "invoice"}

]

const daftarTagihanItem = [
  {
    noTagihan: "321032103210",
    tanggal: "16/01/2024",
    total: "100.000.000",
    status: "Terbayar",
  },
  {
    noTagihan: "321032103210",
    tanggal: "16/01/2024",
    total: "100.000.000",
    status: "Terbayar",
  },
  {
    noTagihan: "321032103210",
    tanggal: "16/01/2024",
    total: "100.000.000",
    status: "Terbayar",
  },
  {
    noTagihan: "321032103210",
    tanggal: "16/01/2024",
    total: "100.000.000",
    status: "Terbayar",
  },
  {
    noTagihan: "321032103210",
    tanggal: "16/01/2024",
    total: "100.000.000",
    status: "Terbayar",
  },
  {
    noTagihan: "321032103210",
    tanggal: "16/01/2024",
    total: "100.000.000",
    status: "Terbayar",
  },
]

const downloadBuktiBayar = (item) => {
  console.log("downloadBuktiBayar : ", item)
}

const previewInvoice = (item) => {
  console.log("previewInvoice : ", item)
}

</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-4">
        <h3 class="text-h3">
          Daftar Tagihan ke BPJPH
        </h3>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard class="pa-2">
          <VCardTitle class="text-h4 mx-0">
            Daftar Tagihan
          </VCardTitle>
          <VCardItem>
            <VDataTableServer
              :headers="daftarTagihanHeader"
              :items="daftarTagihanItem"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
              </template>


              <template #item.buktiBayar="{ item }">
                <VBtn icon variant="text" @click="downloadBuktiBayar(item)">
                  <VIcon size="24" color="primary">mdi-download</VIcon>
                </VBtn>
              </template>

              <template #item.invoice="{ item }">
                <VBtn icon variant="text" @click="previewInvoice(item)">
                  <VIcon size="24" color="primary">mdi-eye</VIcon>
                </VBtn>
              </template>

              <template #item.status="{ item }">
                <VChip :color="item.status === 'Terbayar' ? 'success' : 'error'"
                       variant="outlined"
                       label
                >
                  {{ item.status }}
                </VChip>
              </template>

            </VDataTableServer>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
   </VContainer>
</template>

<style scoped lang="scss">

</style>
