<script setup lang="ts">
const tableHeader = [
  { title: "No", key: "no" },
  { title: "No. Invoice", key: "invoice_no" },
  { title: "Tanggal Invoice", key: "invoice_date" },
  { title: "Nomor Pendaftaran", key: "registration_no" },
  { title: "Kode Pembayaran", key: "payment_code" },
  { title: "Nama Importir", key: "importer_name" },
  { title: "Batas Waktu", key: "exp_date" },
  { title: "Jumlah Biaya", key: "total_amount" },
  { title: "Catatan", key: "notes" },
  { title: "Status", key: "status" },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "lunas":
      return "success";
    case "pending":
      return "warning";
    case "telat":
      return "error";
    default:
      return "grey";
  }
};
</script>
<template>
  <VRow
    ><VCol cols="12"><h2>Invoice Fasilitasi</h2></VCol></VRow
  >
  <VRow>
    <VCol>
      <VCard style="padding: 1.5svw">
        <VCardTitle>
          <VRow>
            <VCol cols="6" style="display: flex; align-items: center"
              >Daftar Invoice Fasilitasi</VCol
            >
            <VCol cols="6" style="display: flex; justify-content: end"
              ><VBtn variant="flat" append-icon="fa-download"
                >Download Cara Pembayaran</VBtn
              ></VCol
            >
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VDataTable :headers="tableHeader">
            <template #item.status="{ item }">
              <VChip
                :color="getStatusColor(item.status)"
                text-color="white"
                small
              >
                {{ item.status }}
              </VChip>
            </template>
          </VDataTable>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
