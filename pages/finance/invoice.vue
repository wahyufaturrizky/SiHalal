<script setup lang="ts">
import Vuepicdatepicker from "@/components/Vuepicdatepicker.client.vue";

const tableHeader = [
  { title: "No", key: "no" },
  { title: "Kode Fasilitasi", key: "fac_code" },
  { title: "Nama Fasilitasi", key: "fac_name" },
  { title: "Jenis Transaksi", key: "trans_type" },
  { title: "Jumlah Tagihan", key: "total_amount" },
  { title: "Tanggal Tagihan", key: "invoice_Date" },
  { title: "Jatuh Tempo", key: "due_date" },
  { title: "Status", key: "status" },
  { title: "Tanggal Bayar", key: "payment_date" },
  { title: "Download Invoice", key: "invoice_uri" },
  { title: "Download Bukti Bayar", key: "payment_uri" },
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

const data = {
  bill_date: ref([]),
  due_date: ref([]),
  status: ref(""),
};
</script>
<template>
  <VRow
    ><VCol cols="12"><h2>Bukti Bayar Fasilitator</h2></VCol></VRow
  >
  <VRow>
    <VCol>
      <VCard style="padding: 1.5svw">
        <VCardTitle>
          <VRow>
            <VCol cols="6" style="display: flex; align-items: center"
              >Daftar Lunas Invoice Fasilitator</VCol
            >
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
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
            </VCol>
            <VCol cols="3">
              <Vuepicdatepicker
                :teleport="true"
                v-model:model-value="data.due_date.value"
                :enable-time-picker="false"
                auto-apply
                model-type="dd-MM-yyyy"
                range
                clearable
              >
                <template #trigger>
                  <VTextField
                    label="Due Date"
                    density="compact"
                    disabled
                    prepend-inner-icon="fa-calendar"
                    :model-value="data.due_date.value"
                  ></VTextField>
                </template>
              </Vuepicdatepicker>
            </VCol>
            <VCol cols="3">
              <VSelect
                placeholder="Status"
                density="compact"
                :items="['Lunas']"
              ></VSelect>
            </VCol>
            <VCol cols="3" style="display: flex; justify-content: end"
              ><VBtn variant="flat" append-icon="fa-download"
                >Download Rekap</VBtn
              ></VCol
            >
          </VRow>
          <VRow>
            <VCol cols="12">
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
                <template #item.invoice_uri="{ item }">
                  <VIcon icon="fa-download"></VIcon>
                </template>
                <template #item.payment_uri="{ item }">
                  <VIcon icon="fa-download"></VIcon>
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
