<script setup lang="ts">
const props = defineProps<{
  data?: object
}>()

const productNameHeader: any[] = [
  { title: 'No', key: 'index' },
  { title: 'Layanan Produk', key: 'layanan_produk', nowrap: true },
  { title: 'Jenis Produk', key: 'jenis_produk', nowrap: true },
  { title: 'Kelas Produk', key: 'kelas_produk', nowrap: true },
  { title: 'Rincian Produk', key: 'rincian_produk', nowrap: true },
  { title: 'Nama Produk', key: 'nama_produk', nowrap: true },
  { title: 'Publikasi', key: 'publikasi_produk' },
]

const productNameData = ref([
  {
    service: 'Makanan',
    type: 'Penyedia minuman dan makanan dengan pengolahan',
    class: 'Resto',
    detail: 'Makanan Mie',
    name: 'Ramen Double Spicy lvl 2',
    isPublished: true,
  },
  {
    service: 'Makanan',
    type: 'Penyedia minuman dan makanan dengan pengolahan',
    class: 'Resto',
    detail: 'Makanan Mie',
    name: 'Ramen Double Spicy lvl 2',
    isPublished: false,
  },
  {
    service: 'Makanan',
    type: 'Penyedia minuman dan makanan dengan pengolahan',
    class: 'Resto',
    detail: 'Makanan Mie',
    name: 'Ramen Double Spicy lvl 2',
    isPublished: true,
  },
])
</script>

<template>
  <VDataTable
    :headers="productNameHeader"
    :items="props?.data"
    :hide-default-footer="props?.data.length === 0"
    class="border rounded"
  >
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>
    <template #item.publikasi_produk="{ item }">
      <VCheckbox
        :model-value="item.publikasi_produk"
        class="non-clickable"
      />
    </template>
    <template #bottom>
      <VDataTableFooter
        v-if="productNameData.length > 5"
        class="custom-table"
        first-icon="mdi-chevron-double-left"
        last-icon="mdi-chevron-double-right"
        show-current-page
      />
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
