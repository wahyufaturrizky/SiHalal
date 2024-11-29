<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  totalitems: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "updatetable"): void;
}>();

const { items, size, page, totalitems, loading } = props || {};

const headers = [
  { title: "No", key: "id_reg" },
  { title: "Kode Fasilitasi", key: "kode_fac" },
  { title: "Tahun", key: "tgl_daftar" },
  { title: "Nama Fasilitasi", key: "nama_pu" },
  { title: "Sumber Pembiayaan", key: "merek_dagang" },
  { title: "Jenis", key: "jenis_produk" },
];
</script>

<template>
  <div>
    <VCard class="w-100">
      <VCardTitle class="mt-3"> Data Pengajuan Sertifikasi Halal </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol>
            <VDataTableServer
              v-model:items-per-page="size"
              v-model:page="page"
              :headers="headers"
              :items="items"
              :loading="loading"
              :items-length="totalitems"
              loading-text="Loading..."
              @update:options="emit('updatetable')"
            >
              <template #item.no="{ index }">
                {{ index + 1 + (page - 1) * size }}
              </template>
              <template #item.tgl_daftar="{ item }">
                {{ formatDateIntl(new Date(item.tgl_daftar)) }}
              </template>
            </VDataTableServer>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </div>
</template>
