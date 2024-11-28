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
  (event: "formvalue", value: any): void;
}>();

const { items, size, page, totalitems, loading } = props || {};

const form = ref({
  keyword: null,
  query_by: null,
});

const filterOptions = ["Semua", "Perusahaan", "Individu", "UMKM"];

const headers = [
  {
    title: "No",
    key: "id",
  },
  {
    title: "No Daftar",
    key: "no_daftar",
  },
  {
    title: "Tanggal",
    key: "tgl_daftar",
  },
  {
    title: "Nama PU",
    key: "nama_pu",
  },
  {
    title: "Jenis Daftar",
    key: "jenis_daftar",
  },
  {
    title: "Jenis Produk",
    key: "jenis_produk",
  },
  {
    title: "No Sertifikat",
    key: "no_sert",
  },
  {
    title: "Status",
    key: "status",
  },
];

const handleSearch = () => {
  emit("formvalue", form.value);
};
</script>

<template>
  <VCard class="pa-4">
    <h2 class="text-h5 mb-4">Data Pengajuan Sertifikasi Halal</h2>

    <div class="d-flex gap-4 mb-4">
      <VSelect
        v-model="form.query_by"
        :items="filterOptions"
        placeholder="Nama Pelaku Usaha"
        class="max-w-[200px]"
      />

      <VTextField
        v-model="form.keyword"
        placeholder="Isian pencarian data"
        class="max-w-[300px]"
      />
      <VBtn
        color="primary"
        elevation="2"
        class="max-w-[500px] w-full"
        variant="flat"
        @click="handleSearch"
      >
        Cari
      </VBtn>
    </div>

    <VCard>
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
    </VCard>
  </VCard>
</template>

<style scoped>
th {
  color: #333; /* Warna teks */
  font-size: 14px; /* Sesuaikan ukuran font */
  font-weight: normal; /* Tidak terlalu tebal */
  text-transform: none !important; /* Tidak mengubah teks menjadi uppercase */
}
</style>
