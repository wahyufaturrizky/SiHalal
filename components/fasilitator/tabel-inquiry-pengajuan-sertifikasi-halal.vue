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
  { title: "No", key: "no" },
  { title: "No Daftar", key: "no_daftar" },
  { title: "Tanggal", key: "tgl_daftar" },
  { title: "Jenis Daftar", key: "jenis_daftar" },
  { title: "Jenis Produk", key: "jenis_produk" },
  // { title: "Merk Dagang", key: "merk_dagang" },
  { title: "Kode Fasilitasi", key: "kode_fac" },
  { title: "Status", key: "status" },
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
                {{ formatDateIntl(new Date((item as any).tgl_daftar)) }}
              </template>
              <template #item.merk_dagang="{ item }">
                {{ (item as any).merk_dagang || "NA" }}
              </template>
              <template #item.status="{ item }">
                <div class="status-box py-1 px-3 cursor-pointer">
                  {{ (item as any).status }}
                </div>
              </template>
            </VDataTableServer>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.status-box {
  color: #652672;
  background-color: #f0e9f1;
  border: 1px solid #652672;
  border-radius: 8px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
