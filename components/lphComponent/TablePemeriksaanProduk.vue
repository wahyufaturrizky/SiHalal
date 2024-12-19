<script setup lang="ts">
const props = defineProps<{
  detailPath: string
  data: array
}>()
const emit = defineEmits(["show:modal-info", 'tes']);

const router = useRouter();

const invoiceHeader: any[] = [
  { title: "No", value: "index" },
  { title: "Nomor Daftar", value: "no_daftar", nowrap: true },
  { title: "Tanggal", value: "tanggal_daftar", nowrap: true },
  { title: "Nama PU", value: "nama_pu", nowrap: true },
  { title: "Jenis Daftar", value: "jenis_daftar", nowrap: true },
  { title: "Jenis Produk", value: "jenis_produk", nowrap: true },
  { title: "Jenis Usaha dan Jumlah", value: "businessType", nowrap: true },
  { title: "Status", value: "status", nowrap: true },
  { title: "Tanggal Dikirim Oleh BPJPH", value: "tgl_dikirim", nowrap: true },
  { title: "Action", value: "actions", align: "center" },
]
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
</script>

<template>
  <VDataTable
    class="examination-table"
    :headers="invoiceHeader"
    :items="props?.data"
    :page="1"
    hover
  >
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>
    <template #item.businessType="{ item }">
      <div class="d-flex">
        <div v-for="el in item.businessType" class="green-box py-1 px-3 me-3">
          {{ el }}
        </div>
      </div>
    </template>
    <template #item.status="{ item }">
      <div
        class="status-box py-1 px-3 cursor-pointer"
        @click="emit('show:modal-info', item.status)"
      >
        {{ item.status }}
      </div>
    </template>
    <template #item.actions>
      <VIcon
        icon="mdi-arrow-right"
        color="primary"
        size="x-large"
        @click="router.push(props.detailPath)"
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
</template>

<style scoped lang="scss">
.v-data-table.examination-table {
  :deep(.v-table__wrapper) {
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
  :deep(.v-data-table-footer) {
    justify-content: space-between;

    .v-data-table-footer__info {
      display: none;
    }
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
