<script setup lang="ts">
const router = useRouter();

const invoiceHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nomor Tagihan", value: "billNumber", nowrap: true },
  { title: "Tanggal Tagihan", value: "billDate", nowrap: true },
  { title: "No Ref", value: "refNumber", nowrap: true },
  { title: "Nama PU", value: "businessName", nowrap: true },
  { title: "Tanggal Dikirim Oleh BPJPH", value: "sentDate", nowrap: true },
  { title: "Jenis Transaksi", value: "trxType", nowrap: true },
  { title: "Jatuh Tempo", value: "dueDate", nowrap: true },
  { title: "Jumlah Tagihan", value: "totalBill", nowrap: true },
  { title: "Tanggal Bayar", value: "payDate", nowrap: true },
  { title: "Action", value: "actions", align: "center" },
];
const invoiceData = [
  {
    billNumber: "SH2024-225-29480",
    billDate: "22/08/2024",
    refNumber: "SH2024-225-29480",
    businessName: "Dapoer Boenda",
    sentDate: "22/08/2024 06:38 (500 hari)",
    trxType: "Sertifikasi Halal",
    dueDate: "22/08/2024",
    totalBill: "Rp 200,000",
    payDate: "22/08/2024",
  },
  {
    billNumber: "SH2024-225-29480",
    billDate: "22/08/2024",
    refNumber: "SH2024-225-29480",
    businessName: "Dapoer Boenda",
    sentDate: "22/08/2024 06:38 (500 hari)",
    trxType: "Sertifikasi Halal",
    dueDate: "22/08/2024",
    totalBill: "Rp 200,000",
    payDate: "22/08/2024",
  },
];
</script>

<template>
  <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow no-gutters>
    <VCol>
      <h1>Informasi Pembayaran</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">
            Daftar Invoice Yang Sudah Dibayar
          </div>
        </VCardTitle>
        <VCardText>
          <VTextField
            placeholder="Cari Nama Pengajuan"
            density="compact"
            rounded="xl"
            class="mb-5"
            append-inner-icon="mdi-magnify"
          />
          <VDataTable
            class="invoice-table"
            :headers="invoiceHeader"
            :items="invoiceData"
            :page="1"
          >
            <template #item.index="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.actions>
              <VIcon
                icon="mdi-arrow-right"
                color="primary"
                size="x-large"
                @click="router.push('/reguler/payment-info/detail')"
              />
            </template>
            <template #bottom>
              <VDataTableFooter
                v-if="invoiceData.length > 10"
                first-icon="mdi-chevron-double-left"
                last-icon="mdi-chevron-double-right"
                show-current-page
              />
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
:deep(.v-data-table.invoice-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}

:deep(.v-data-table.invoice-table > .v-data-table-footer) {
  .v-data-table-footer__info {
    display: none;
  }
}
</style>
