<script setup lang="ts">
const productNameHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Layanan Produk", key: "service", nowrap: true },
  { title: "Jenis Produk", key: "type", nowrap: true },
  { title: "Kelas Produk", key: "class", nowrap: true },
  { title: "Rincian Produk", key: "detail", nowrap: true },
  { title: "Nama Produk", key: "name", nowrap: true },
  { title: "Publikasi", key: "isPublished" },
];
const productNameData = ref([
  {
    service: "Makanan",
    type: "Penyedia minuman dan makanan dengan pengolahan",
    class: "Resto",
    detail: "Makanan Mie",
    name: "Ramen Double Spicy lvl 2",
    isPublished: true,
  },
  {
    service: "Makanan",
    type: "Penyedia minuman dan makanan dengan pengolahan",
    class: "Resto",
    detail: "Makanan Mie",
    name: "Ramen Double Spicy lvl 2",
    isPublished: false,
  },
  {
    service: "Makanan",
    type: "Penyedia minuman dan makanan dengan pengolahan",
    class: "Resto",
    detail: "Makanan Mie",
    name: "Ramen Double Spicy lvl 2",
    isPublished: true,
  },
]);
</script>

<template>
  <VDataTable
    :headers="productNameHeader"
    :items="productNameData"
    hide-default-footer
  >
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>
    <template #item.isPublished="{ item }">
      <VCheckbox :model-value="item.isPublished" />
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
</style>
