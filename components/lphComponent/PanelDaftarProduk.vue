<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  handlePageChange: {
    type: Function,
    required: false,
  },
  page: {
    type: Number,
    required: false,
  },
});

const currentPage = ref(props.page);

const productNameHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Layanan Produk", key: "layanan_produk", nowrap: true },
  { title: "Jenis Produk", key: "jenis_produk", nowrap: true },
  { title: "Kelas Produk", key: "kelas_produk", nowrap: true },
  { title: "Rincian Produk", key: "rincian_produk", nowrap: true },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Publikasi", key: "publikasi_produk" },
];

const itemPerPage = ref(10);
</script>

<template>
  <VDataTable
    disable-sort
    v-model:page="currentPage"
    :items-per-page="itemPerPage"
    :items="props?.data"
    :headers="productNameHeader"
    :page="props.page"
    class="custom-table"
    hover
    @update:page="handlePageChange"
  >
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>
    <template #item.publikasi_produk="{ item }">
      <VCheckbox :model-value="item.publikasi_produk" class="non-clickable" />
    </template>
  </VDataTable>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-data-table-footer) {
  .v-data-table-footer__info {
    display: none;
  }
}
.non-clickable {
  pointer-events: none;
  opacity: 0.6;
}
</style>
