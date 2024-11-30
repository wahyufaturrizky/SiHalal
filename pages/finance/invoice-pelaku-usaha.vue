<script setup lang="ts">
const data = {
  bill_date: ref([]),
};

const tableHeader = [
  { title: "No", value: "no" },
  { title: "No Invoice", value: "invoice_no" },
  { title: "Tanggal Invoice", value: "invoice_date" },
  { title: "Register Number", value: "registration_no" },
  { title: "Payment Code", value: "payment_code" },
  { title: "Importer's Name", value: "importer_name" },
  { title: "Due Date", value: "due_date" },
  { title: "Payment Date", value: "payment_date" },
  { title: "Amount", value: "amount" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

const items = [
  {
    invoice_no: "xx",
    invoice_date: "xx",
    registration_no: "xx",
    payment_code: "xx",
    importer_name: "xx",
    due_date: "xx",
    payment_date: "xx",
    amount: "xx",
    status: "xx",
  },
];

const selectedStatus = ref([]);

const selectedDate = ref([]);
</script>
<template>
  <VRow>
    <VCol cols="12"><h2>Bukti Bayar SHLN</h2></VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="6"><h4>Invoice List</h4></VCol>
            <VCol cols="6" style="display: flex; justify-content: end">
              <VBtn variant="flat">Download Excel</VBtn>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
              <VMenu :close-on-content-click="false" persistent>
                <template #activator="{ props: openMenu }">
                  <VBtn
                    append-icon="fa-filter"
                    v-bind="openMenu"
                    variant="outlined"
                    style="width: 100%"
                    >Filter</VBtn
                  >
                </template>
                <template #default="{ isActive }">
                  <VList>
                    <VListItem>
                      <VItemGroup>
                        <VLabel><b>Status</b></VLabel>
                        <VSelect
                          v-model="selectedStatus"
                          density="compact"
                          placeholder="Semua"
                        ></VSelect>
                      </VItemGroup>
                    </VListItem>
                    <VListItem>
                      <VItemGroup>
                        <VLabel><b>Range</b></VLabel>
                        <AppDateTimePicker
                          v-model="selectedDate"
                          placeholder="Select date"
                          :config="{ mode: 'range' }"
                        />
                      </VItemGroup>
                    </VListItem>
                    <VListItem>
                      <VBtn
                        style="width: 100%"
                        variant="flat"
                        density="compact"
                        @click="isActive.value = false"
                        >Apply</VBtn
                      >
                    </VListItem>
                  </VList>
                </template>
              </VMenu>
            </VCol>
            <VCol cols="1"></VCol>
            <VCol cols="8">
              <VTextField
                density="compact"
                placeholder="Cari Nama Pengajuan"
                append-inner-icon="mdi-magnify"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow>
            <VDataTable :headers="tableHeader" :items="items">
              <template #item.action>
                <VMenu :close-on-content-click="false">
                  <template #activator="{ props: openMenu }">
                    <VIcon icon="mdi-dots-vertical" v-bind="openMenu"></VIcon>
                  </template>
                  <template #default="{ isActive }">
                    <VList>
                      <VListItem>
                        <p>
                          <VIcon
                            icon="fa-download"
                            size="xs"
                            color="primary"
                          ></VIcon>
                          Unduh Invoice
                        </p>
                      </VListItem>
                      <VListItem>
                        <p>
                          <VIcon
                            icon="fa-download"
                            size="xs"
                            color="primary"
                          ></VIcon>
                          Unduh Bukti
                        </p>
                      </VListItem>
                    </VList>
                  </template>
                </VMenu>
              </template>
            </VDataTable>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
