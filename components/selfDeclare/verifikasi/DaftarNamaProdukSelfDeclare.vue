<script lang="ts" setup>
interface Produk {
  jenis_produk: string;
  kelas_produk: string;
  layanan_produk: string;
  nama_produk: string;
  publikasi: boolean;
  rincian_prooduk: string;
}

const props = defineProps<{ data: Produk[] }>();

const produkData = ref<Produk[]>(props.data);
watchEffect(() => {
  produkData.value = props.data;
});

// Table headers
const produkHeaders = [
  { title: "No", key: "index", align: "center" },
  { title: "Layanan Produk", key: "layanan" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Kelas Produk", key: "kelas_produk" },
  { title: "Rincian Produk", key: "rincian_produk" },
  { title: "Nama Produk", key: "nama_produk" },
  { title: "Publikasi", key: "publikasi" },
];
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VDataTable disable-sort :items="produkData">
          <template #item.index="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.publikasi="{ item }">
            <VCheckbox v-model="selectedItems" :value="item" readonly />
          </template>
        </VDataTable>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
