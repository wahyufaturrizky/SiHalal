<script setup>
const search = ref("");

const headers = [
  {
    title: "No",
    align: "start",
    key: "no",
  },
  {
    title: "No Tagihan",
    align: "start",
    key: "noTagihan",
  },
  {
    title: "Tgl Tagihan",
    key: "tglTagihan",
  },
  {
    title: "Nama Fasilitasi",
    key: "namaFasilitasi",
  },
  {
    title: "Jatuh Tempo",
    key: "jatuhTempo",
  },
  {
    title: "Jumlah Tagihan",
    key: "jumlahTagihan",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];

// Sample data
const tagihan = ref([
  {
    no: 1,
    noTagihan: "000002",
    tglTagihan: "22/10/2024",
    namaFasilitasi: "andi",
    jatuhTempo: "01/11/2024",
    jumlahTagihan: 230000000,
    status: "Lunas",
  },
]);

// Helper functions
const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const getStatusColor = (status) => {
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

// Action handlers
const editItem = (item) => {
  console.log("Edit item:", item);

  // Implement edit logic
};

const deleteItem = (item) => {
  console.log("Delete item:", item);

  // Implement delete logic
};
</script>

<template>
  <VContainer>
    <VCard>
      <VCardTitle class="text-h5 py-4"> Daftar Tagihan </VCardTitle>

      <VCardText>
        <!-- <div class="text-subtitle-1 mb-4"></div> -->

        <VTextField
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mb-4"
        />

        <VDataTable
          disable-sort
          :headers="headers"
          :items="tagihan"
          :search="search"
          class="elevation-1"
        >
          <!-- Custom column formatting -->
          <template #item.jumlahTagihan="{ item }">
            {{ formatCurrency(item.jumlahTagihan) }}
          </template>

          <template #item.status="{ item }">
            <VChip
              :color="getStatusColor(item.status)"
              text-color="white"
              small
            >
              {{ item.status }}
            </VChip>
          </template>

          <template #item.actions="{ item }">
            <VIcon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </VIcon>
            <VIcon small @click="deleteItem(item)"> mdi-delete </VIcon>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<style scoped>
.v-data-table {
  inline-size: 100%;
}
</style>
