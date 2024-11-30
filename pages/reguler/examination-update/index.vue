<script setup lang="ts">
const router = useRouter();

const invoiceHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nomor Daftar", value: "regisNumber", nowrap: true },
  { title: "Tanggal", value: "date", nowrap: true },
  { title: "Nama PU", value: "businessName", nowrap: true },
  { title: "Janis Daftar", value: "regisType", nowrap: true },
  { title: "Jenis Produk", value: "productType", nowrap: true },
  { title: "Jenis Usaha dan Jumlah", value: "businessType", nowrap: true },
  { title: "Status", value: "status", nowrap: true },
  { title: "Tanggal Dikirim Oleh BPJPH", value: "sentDate", nowrap: true },
  { title: "Action", value: "actions", align: "center" },
];
const invoiceData = [
  {
    regisNumber: "SH2024-225-29480",
    date: "22/08/2024",
    businessName: "Dapoer Boenda",
    regisType: "Baru",
    productType: "Produk Bakteri",
    businessType: ["4", "32"],
    status: "Proses di LPH",
    sentDate: "22/08/2024 06:38 (500 hari)",
  },
  {
    regisNumber: "SH2024-225-29480",
    date: "22/08/2024",
    businessName: "Dapoer Boenda",
    regisType: "SIUP",
    productType: "Produk Bakteri",
    businessType: ["4", "32"],
    status: "Proses di LPH",
    sentDate: "22/08/2024 06:38 (500 hari)",
  },
];

const isInfoModalOpen = ref(false);
const handleOpenInfoModal = () => {
  isInfoModalOpen.value = !isInfoModalOpen.value;
};
</script>

<template>
  <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow no-gutters>
    <VCol>
      <h1>Update Pemeriksaan</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">Daftar Pemeriksaan Produk</div>
        </VCardTitle>
        <VCardText>
          <VRow class="mb-4">
            <VCol cols="2">
              <VMenu :close-on-content-click="false">
                <template #activator="{ props }">
                  <VTextField
                    placeholder="Filter"
                    density="compact"
                    rounded="xl"
                    append-inner-icon="mdi-filter"
                    v-bind="props"
                  />
                </template>
                <VCard min-width="360px" class="mt-2">
                  <VCardText>
                    <VRow no-gutters class="mb-3">
                      <VCol>
                        <div class="text-h6 mb-1">Channel</div>
                        <VSelect
                          density="compact"
                          model-value="Samua"
                          menu-icon="fa-chevron-down"
                          rounded="xl"
                        />
                      </VCol>
                    </VRow>
                    <VRow no-gutters class="mb-3">
                      <VCol>
                        <div class="text-h6 mb-1">Skala Usaha</div>
                        <VSelect
                          density="compact"
                          model-value="Samua"
                          menu-icon="fa-chevron-down"
                          rounded="xl"
                        />
                      </VCol>
                    </VRow>
                    <VRow no-gutters class="mb-3">
                      <VCol>
                        <div class="text-h6 mb-1">Pusat</div>
                        <VSelect
                          density="compact"
                          model-value="Samua"
                          menu-icon="fa-chevron-down"
                          rounded="xl"
                        />
                      </VCol>
                    </VRow>
                  </VCardText>
                </VCard>
              </VMenu>
            </VCol>
            <VSpacer />
            <VCol cols="9">
              <VTextField
                placeholder="Cari Nama Pengajuan"
                density="compact"
                rounded="xl"
                append-inner-icon="mdi-magnify"
              />
            </VCol>
          </VRow>
          <VDataTable
            class="examination-table"
            :headers="invoiceHeader"
            :items="invoiceData"
            :page="1"
            hover
          >
            <template #item.index="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.businessType="{ item }">
              <div class="d-flex">
                <div
                  v-for="el in item.businessType"
                  class="green-box py-1 px-3 me-3"
                >
                  {{ el }}
                </div>
              </div>
            </template>
            <template #item.status="{ item }">
              <div
                class="status-box py-1 px-3 cursor-pointer"
                @click="handleOpenInfoModal"
              >
                {{ item.status }}
              </div>
            </template>
            <template #item.actions>
              <VIcon
                icon="mdi-arrow-right"
                color="primary"
                size="x-large"
                @click="router.push('/reguler/examination-update/detail')"
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
  <VDialog v-model="isInfoModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h3 font-weight-bold">Info</div>
        <VIcon @click="handleOpenInfoModal"> fa-times </VIcon>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol> SLA sudah melebihi 15 hari (433 hari) </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="px-4">
        <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenInfoModal"
          >Tutup</VBtn
        >
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
:deep(.v-data-table.examination-table > .v-table__wrapper) {
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

:deep(.v-data-table.examination-table > .v-data-table-footer) {
  .v-data-table-footer__info {
    display: none;
  }
}

.green-box {
  color: #49a84c;
  background-color: #edf6ed;
  border: 1px solid #49a84c;
  border-radius: 8px;
  font-size: 12px;
}

.status-box {
  color: #652672;
  background-color: #f0e9f1;
  border: 1px solid #652672;
  border-radius: 8px;
  font-size: 12px;
}
</style>
