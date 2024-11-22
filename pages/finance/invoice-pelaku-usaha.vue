<script setup lang="ts">
import Vuepicdatepicker from "@/components/Vuepicdatepicker.client.vue";
const data = {
  bill_date: ref([]),
};

const tableHeader = [
  { title: "No", value: "no" },
  { title: "No Invoice", value: "invoice_no" },
  { title: "Tanggal Invoice", value: "invoice_date" },
  { title: "Register Number", value: "registration_no" },
  { title: "Payment Code", value: "payment_code" },
  { title: "Due Date", value: "due_date" },
  { title: "Payment Date", value: "payment_date" },
  { title: "Amount", value: "amount" },
  { title: "Status", value: "status" },
  { title: "", value: "actions" },
];
</script>
<template>
  <VRow>
    <VCol cols="12"><h2>Invoice</h2></VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle><h4>Invoice List</h4></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <VBtn variant="flat">Download Excel</VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="4"
              ><VTextField
                density="compact"
                placeholder="Cari"
                append-inner-icon="mdi-magnify"
              ></VTextField
            ></VCol>
            <VCol cols="3"
              ><VSelect
                density="compact"
                :items="['Menunggu Pembayaran', 'Paid']"
              ></VSelect
            ></VCol>
            <VCol cols="3">
              <Vuepicdatepicker>
                <template #trigger>
                  <Vuepicdatepicker
                    v-model:model-value="data.bill_date.value"
                    auto-apply
                    model-type="dd-MM-yyyy"
                    :enable-time-picker="false"
                    :teleport="true"
                    range
                    clearable
                  >
                    <template #trigger>
                      <VTextField
                        label="Tanggal Tagihan"
                        density="compact"
                        disabled
                        prepend-inner-icon="fa-calendar"
                        :model-value="data.bill_date.value"
                      ></VTextField>
                    </template>
                  </Vuepicdatepicker>
                </template>
              </Vuepicdatepicker>
            </VCol>
          </VRow>
          <VRow>
            <VDataTable :headers="tableHeader">
              <template #item.action>
                <VIcon icon="fa-file-text"></VIcon>
              </template>
            </VDataTable>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
