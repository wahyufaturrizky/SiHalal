<script setup lang="ts">
const props = defineProps({
  detaildata: {
    type: Object,
  },
});

const { detaildata } = props || {};
const { produk } = detaildata || {};

const expanded = ref(0);

const headers = ref([
  { title: "No", key: "no", align: "start" },
  { title: "Layanan Produk", key: "layanan_produk", align: "start" },
  { title: "Jenis Produk", key: "jenis_produk", align: "start" },
  { title: "Kelas Produk", key: "kelas_produk", align: "start" },
  { title: "Nama Produk", key: "nama_produk", align: "start" },
  { title: "Rincian Produk", key: "rincian_prooduk", align: "start" },
]);

const itemPerPage = ref(10);
const totalItems = ref(produk.length);
const page = ref(1);
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Daftar Nama Produk</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VDataTableServer
          :items-per-page-options="[10, 25, 50, 100]"
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items-length="totalItems"
          :items="produk"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.publikasi="{ item }">
            <VCheckbox
              v-model="(item as any).publikasi"
              :disabled="!(item as any).publikasi"
            />
          </template>
        </VDataTableServer>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
