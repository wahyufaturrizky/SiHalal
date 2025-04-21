<script setup lang="ts">
const props = defineProps<{
  detailPath: string;
  data: array;
}>();

const emit = defineEmits(["show:modal-info", "tes"]);

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
];
</script>

<template>
  <VDataTable
    disable-sort
    class="examination-table"
    :headers="invoiceHeader"
    :items="props?.data"
    :page="1"
    hover
  >
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>
    <template #item.tanggal_daftar="{ item }">
      {{ formatDateId(item.tanggal_daftar) }}
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
        v-if="props?.data.length > 10"
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
        position: sticky;
        border-inline-start: 1px solid rgba(#000, 0.12);
        inset-inline-end: 0;
      }

      tbody > tr > td:last-of-type {
        position: sticky;
        background: white;
        border-inline-start: 1px solid rgba(#000, 0.12);
        inset-inline-end: 0;
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
  border: 1px solid #49a84c;
  border-radius: 8px;
  background-color: #edf6ed;
  color: #49a84c;
  font-size: 12px;
}

.status-box {
  border: 1px solid #652672;
  border-radius: 8px;
  background-color: #f0e9f1;
  color: #652672;
  font-size: 12px;
}
</style>
