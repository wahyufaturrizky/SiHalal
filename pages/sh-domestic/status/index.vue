<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "No. Daftar", value: "regist_no" },
  { title: "Tanggal", value: "date" },
  { title: "Nama PU", value: "pu_name" },
  { title: "Jenis Daftar", value: "regist_kind" },
  { title: "Jenis Produk", value: "product_kind" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

const items = [
  {
    no: "xx",
    regist_no: "xx",
    date: "xx",
    pu_name: "xx",
    regist_kind: "xx",
    product_kind: "xx",
    status: "xx",
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

const navigateToDetail = (id: string) => {
  navigateTo(`/sh-domestic/status/2`);
};
</script>
<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton></KembaliButton>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <h2>Status Permohonan</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle><h3>Data Pengajuan</h3></VCardTitle>
        <VCardItem>
          <VRow
            ><VCol cols="12"
              ><VTextField
                placeholder="Search"
                append-inner-icon="mdi-magnify"
                density="compact"
              ></VTextField></VCol
          ></VRow>
          <VRow
            ><VCol cols="12">
              <VDataTable :headers="tableHeader" :items="items">
                <template #item.status="{ item }">
                  <VChip
                    color="success"
                    text-color="white"
                    small
                    variant="outlined"
                    style="margin-right: 1svw; background-color: #edf6ed"
                  >
                    1
                  </VChip>
                  <VChip
                    color="success"
                    text-color="white"
                    small
                    variant="outlined"
                    style="margin-right: 1svw; background-color: #edf6ed"
                  >
                    3
                  </VChip>
                  <VChip
                    color="primary"
                    text-color="white"
                    small
                    variant="outlined"
                    style="margin-right: 1svw; background-color: #f0e9f1"
                  >
                    {{ item.status }}
                  </VChip>
                </template>
                <template #item.action="{ item }">
                  <VIcon
                    @click="navigateToDetail(item.regist_no)"
                    color="primary"
                    icon="mdi-arrow-right"
                  ></VIcon>
                </template>
              </VDataTable> </VCol
          ></VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
