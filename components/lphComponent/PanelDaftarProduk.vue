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
  perPage: {
    type: Number,
    required: false,
  },
  total: {
    type: Number,
    required: false,
  },
});

const currentPage = ref(props.page);
const itemPerPage = ref(props.perPage);
const totalItems = ref(props.total);

const productNameHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Layanan Produk", key: "layanan_produk", nowrap: true },
  { title: "Jenis Produk", key: "jenis_produk", nowrap: true },
  { title: "Kelas Produk", key: "kelas_produk", nowrap: true },
  { title: "Rincian Produk", key: "rincian_produk", nowrap: true },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Publikasi", key: "publikasi_produk" },
];

</script>

<template>
  <VDataTableServer
    v-model:items-per-page="itemPerPage"
    v-model:page="currentPage"
    :items-length="totalItems"
    :items="props?.data"
    :headers="productNameHeader"
    class="custom-table"
    hover
    disable-sort
    @update:options="props.handlePageChange"
  >
    <template #item.index="{ index }">
      {{ index + 1 + (+currentPage - 1) * +itemPerPage }}
    </template>
    <template #item.publikasi_produk="{ item }">
      <VCheckbox :model-value="item.publikasi_produk" class="non-clickable" />
    </template>
  </VDataTableServer>
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
