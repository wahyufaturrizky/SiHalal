<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "No. Daftar", value: "regist_no" },
  { title: "Tanggal Daftar", value: "regist_date" },
  { title: "Nama PU", value: "pu_name" },
  { title: "Alamat", value: "address" },
  { title: "Jenis Usaha", value: "kind" },
  { title: "Skala Usaha", value: "scale" },
  { title: "Merk Dagang", value: "brand" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

const items = [
  {
    id: 1,
    regist_no: "xx",
    regist_date: "xx",
    pu_name: "xx",
    address: "xx",
    kind: "xx",
    scale: "xx",
    brand: "xx",
    status: "success",
  },
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
  <VRow>
    <VCol cols="12">
      <h2>Proses Verval</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle><h3>Data Proses Verval</h3></VCardTitle>
        <VCardItem>
          <VRow
            ><VCol cols="12"
              ><VTextField
                placeholder="Cari Pengajuan"
                density="compact"
                append-inner-icon="mdi-magnify"
              ></VTextField></VCol
          ></VRow>
          <VRow>
            <VCol cols="12">
              <VDataTable :items="items" :headers="tableHeader">
                <template #item.status="{ item }">
                  <VChip
                    :color="getStatusColor(item.status)"
                    text-color="white"
                    small
                  >
                    {{ item.status }}
                  </VChip>
                </template>
                <template #item.action>
                  <VIcon icon="mdi-arrow-right"></VIcon>
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
