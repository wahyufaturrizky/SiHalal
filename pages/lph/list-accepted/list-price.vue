<script setup lang="ts">
const router = useRouter();

const domesticAuditHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Keterangan Biaya", key: "costName", nowrap: true },
  { title: "Jumlah", key: "quantity" },
  { title: "Harga", key: "price", nowrap: true },
  { title: "Sub Total", key: "subTotal", nowrap: true },
];
const domesticAuditData = ref([
  {
    costName: "Biaya Pemeriksaan",
    quantity: "1",
    price: "Rp 6.000.000",
    subTotal: "Rp 6.000.000",
  },
  {
    costName: "Biaya Audit",
    quantity: "1",
    price: "Rp 1.000.000",
    subTotal: "Rp 1.000.000",
  },
  {
    costName: "",
    quantity: "",
    price: "Total",
    subTotal: "Rp 7.000.000",
  },
]);

const checkingCostHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Keterangan Biaya", key: "costName", nowrap: true },
  { title: "Jumlah", key: "quantity" },
  { title: "Harga", key: "price", nowrap: true },
  { title: "Sub Total", key: "subTotal", nowrap: true },
  { title: "Action", key: "actions", align: "center" },
];
const checkingCostData = ref([
  {
    costName: "Biaya Pemeriksaan",
    quantity: "1",
    price: "Rp 6.000.000",
    subTotal: "Rp 6.000.000",
  },
  {
    costName: "Biaya Audit",
    quantity: "1",
    price: "Rp 1.000.000",
    subTotal: "Rp 1.000.000",
  },
  {
    costName: "",
    quantity: "",
    price: "Total",
    subTotal: "Rp 7.000.000",
  },
]);

const totalAuditHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Keterangan", key: "description", nowrap: true },
  { title: "", key: "price" },
  { title: "Sub Total", key: "subTotal", nowrap: true },
];
const totalAuditData = ref([
  {
    description: "Keterangan Apapun",
    price: "",
    subTotal: "Rp 850.000",
  },
  {
    description: "Coba dulu",
    price: "",
    subTotal: "Rp 740.000",
  },
  {
    description: "",
    price: "Total",
    subTotal: "Rp 1.590.000",
  },
]);
</script>

<template>
  <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow no-gutters>
    <VCol>
      <h1>
        Informasi Penetapan Biaya Audit Untuk Fasilitas Produksi di Indonesia
      </h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">
            Penetapan Biaya Audit untuk Fasilitas Produksi di Indonesia
          </div>
          <VBtn variant="outlined" text="Tambah Biaya Pesawat" />
        </VCardTitle>
        <VCardText>
          <VDataTable
            class="cost-table"
            :headers="domesticAuditHeader"
            :items="domesticAuditData"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index !== domesticAuditData.length - 1 ? index + 1 : "" }}
            </template>
            <template #item.price="{ index, item }">
              <div
                :class="
                  index !== domesticAuditData.length - 1
                    ? ''
                    : 'font-weight-bold'
                "
              >
                {{ item.price }}
              </div>
            </template>
            <template #item.subTotal="{ index, item }">
              <div
                :class="
                  index !== domesticAuditData.length - 1
                    ? ''
                    : 'font-weight-bold'
                "
              >
                {{ item.subTotal }}
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">
            Penetapan Biaya Audit untuk Fasilitas Produksi di Luar Negeri
          </div>
          <VBtn variant="outlined" text="Tambah Biaya" />
        </VCardTitle>
        <VCardText>
          <VDataTable
            class="cost-table"
            :headers="checkingCostHeader"
            :items="checkingCostData"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index !== checkingCostData.length - 1 ? index + 1 : "" }}
            </template>
            <template #item.price="{ index, item }">
              <div
                :class="
                  index !== checkingCostData.length - 1
                    ? ''
                    : 'font-weight-bold'
                "
              >
                {{ item.price }}
              </div>
            </template>
            <template #item.subTotal="{ index, item }">
              <div
                :class="
                  index !== checkingCostData.length - 1
                    ? ''
                    : 'font-weight-bold'
                "
              >
                {{ item.subTotal }}
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">Total Biaya Audit</div>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :headers="totalAuditHeader"
            :items="totalAuditData"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index !== totalAuditData.length - 1 ? index + 1 : "" }}
            </template>
            <template #item.price="{ index, item }">
              <div
                :class="
                  index !== totalAuditData.length - 1 ? '' : 'font-weight-bold'
                "
              >
                {{ item.price }}
              </div>
            </template>
            <template #item.subTotal="{ index, item }">
              <div
                :class="
                  index !== totalAuditData.length - 1 ? '' : 'font-weight-bold'
                "
              >
                {{ item.subTotal }}
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
:deep(.v-data-table.cost-table > .v-table__wrapper) {
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
</style>
