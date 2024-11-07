<script setup>
const selectedFilter = ref("");
const searchQuery = ref("");
const items = ref([]);

const filterOptions = ["Semua", "Perusahaan", "Individu", "UMKM"];

const handleSearch = () => {
  // Here you would typically make an API call with the filter and search parameters
  // For now we'll just simulate an empty result
  items.value = [];
};
</script>

<template>
  <VCard class="pa-4">
    <h2 class="text-h5 mb-4">Data Pengajuan Sertifikasi Halal</h2>

    <div class="d-flex gap-4 mb-4">
      <VSelect
        v-model="selectedFilter"
        :items="filterOptions"
        label="Nama Pelaku Usaha"
        class="max-w-[200px]"
      />

      <VTextField
        v-model="searchQuery"
        label="Isian pencarian data"
        append-inner-icon="mdi-magnify"
        class="max-w-[300px]"
      />

      <VBtn color="primary" @click="handleSearch"> View </VBtn>
    </div>

    <VTable>
      <thead>
        <tr>
          <th>No</th>
          <th>No Daftar</th>
          <th>Tanggal</th>
          <th>Nama PU</th>
          <th>Jenis Daftar</th>
          <th>Jenis Produk</th>
          <th>No Sertifikat</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!items.length">
          <td colspan="8" class="text-center py-4">Tidak ada data ditemukan</td>
        </tr>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.no }}</td>
          <td>{{ item.noDaftar }}</td>
          <td>{{ item.tanggal }}</td>
          <td>{{ item.namaPU }}</td>
          <td>{{ item.jenisDaftar }}</td>
          <td>{{ item.jenisProduk }}</td>
          <td>{{ item.noSertifikat }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
