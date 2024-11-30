<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "No Invoice", value: "invoice_no" },
  { title: "Tanggal Invoice", value: "invoice_date" },
  { title: "Register Number", value: "registration_no" },
  { title: "Payment Code", value: "payment_code" },
  { title: "Importer's Name", value: "importer_name" },
  { title: "Due Date", value: "due_date" },
  { title: "Amount", value: "amount" },
  { title: "Note", value: "notes" },
  { title: "Status", value: "status" },
  { title: "Invoice File", value: "invoice" },
];

const items = [
  {
    invoice_no: "xx",
    invoice_date: "xx",
    registration_no: "xx",
    payment_code: "xx",
    importer_name: "xx",
    due_date: "xx",
    amount: "xx",
    notes: "xx",
    status: "xx",
    invoice: "xx",
  },
];
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
              <VDataTable :headers="tableHeader" :items="items">
                <template #item.invoice>
                  <VIcon icon="fa-file" color="primary"></VIcon>
                </template>
                <template #item.status="{ item }">
                  <VChip
                    v-if="item.status == 'xx'"
                    color="danger"
                    style="
                      background-color: #fef8e6;
                      color: #f6bc03;
                      border-radius: 10px;
                      outline: auto;
                    "
                    >{{ item.status }}</VChip
                  >
                  <VChip
                    v-if="item.status == 'renew'"
                    color="danger"
                    style="
                      background-color: #fef8e6;
                      color: #f6bc03;
                      border-radius: 10px;
                      outline: auto;
                    "
                    >{{ item.status }}</VChip
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
