<script setup lang="ts">
const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const tableHeader = [
  { title: "No", value: "index" },
  { title: "No Invoice", value: "no" },
  { title: "Tanggal Invoice", value: "date" },
  { title: "Register Number", value: "shln_no" },
  { title: "Payment Code", value: "va" },
  { title: "Importer's Name", value: "importer_name" },
  { title: "Due Date", value: "due_date" },
  { title: "Amount", value: "amount" },
  { title: "Note", value: "note" },
  { title: "Status", value: "status" },
  { title: "Invoice File", value: "invoice" },
];

// const items = [
//   {
//     invoice_no: "xx",
//     invoice_date: "xx",
//     registration_no: "xx",
//     payment_code: "xx",
//     importer_name: "xx",
//     due_date: "xx",
//     amount: "xx",
//     notes: "xx",
//     status: "xx",
//     invoice: "xx",
//   },
// ];
const items = ref([]);
const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api("/shln/invoice", {
      method: "get",
      params: {
        page,
        size,
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const statusInvoice = {
  SB001: { color: "warning", desc: "Menunggu Pembayaran" },
  SB002: { color: "warning", desc: "Kurang Bayar" },
  SB003: { color: "warning", desc: "Lebih Bayar" },
  SB004: { color: "success", desc: "Lunas" },
  SB005: { color: "warning", desc: "Konfirmasi Pembayaran" },
  default: { color: "error", desc: "No Status" },
};
</script>
<template>
  <VRow>
    <VCol cols="12">
      <h2>Invoice</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle style="padding: 1.5svw">
          <VRow>
            <VCol cols="6"><h3>Invoice List</h3></VCol>
            <VCol cols="6" style="display: flex; justify-content: end"
              ><VBtn append-icon="fa-download"
                >Download Payment Instructions</VBtn
              ></VCol
            >
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="8"
              ><VTextField
                append-inner-icon="mdi-magnify"
                label="Search Data"
              ></VTextField
            ></VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTable
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :items-length="totalItems"
                :loading="loading"
                loading-text="Loading..."
                @update:options="loadItem(page, itemPerPage)"
                :headers="tableHeader"
                :items="items"
              >
                <template #item.index="{ index }">
                  {{ index + 1 + (page - 1) * itemPerPage }}
                </template>
                <template #item.invoice>
                  <VIcon icon="fa-file" color="primary"></VIcon>
                </template>
                <template #item.status="{ item }">
                  <VChip
                    :color="statusInvoice[item.status].color"
                    style="
                      background-color: #fef8e6;
                      color: #f6bc03;
                      border-radius: 10px;
                      outline: auto;
                    "
                    >{{ statusInvoice[item.status].desc }}</VChip
                  >
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
