<script setup lang="ts">
import { formatDateIntl } from "#imports";
import { onMounted, ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const items = ref([
  {
    id: 1,
    nomor_daftar: "SH2024-225-29480",
    tanggal_daftar: "2024-11-01",
    nama_pu: "John Doe",
    alamat: "Sumbawa Banget RT002/ RW002",
    skala_usaha: "Mikro",
    jenis_produk: "Makanan",
    merek_dagang: "BrandX",
    laporan_sph: true,
    action: true,
  },
  {
    id: 2,
    nomor_daftar: "SH2024-225-29481",
    tanggal_daftar: "2024-11-02",
    nama_pu: "Jane Smith",
    alamat: "Surabaya, Jl. Mawar No. 5",
    skala_usaha: "Kecil",
    jenis_produk: "Minuman",
    merek_dagang: "BrandY",
    laporan_sph: true,
    action: true,
  },
  {
    id: 3,
    nomor_daftar: "SH2024-225-29482",
    tanggal_daftar: "2024-11-03",
    nama_pu: "Robert Johnson",
    alamat: "Jakarta Selatan, Blok C",
    skala_usaha: "Menengah",
    jenis_produk: "Elektronik",
    merek_dagang: "BrandZ",
    laporan_sph: false,
    action: true,
  },
]);

const itemPerPage = ref(10);
const totalItems = ref(items.value.length); // Total dummy data
const loading = ref(false);
const page = ref(1);

const debouncedFetch = debounce(() => {}, 500); // Tidak digunakan untuk dummy data

onMounted(() => {
  // Dummy data tidak memerlukan pemanggilan API
});

const verifikatorTableHeader = [
  { title: "No", key: "id" },
  { title: "Nomor Daftar", key: "nomor_daftar" },
  { title: "Tanggal Daftar", key: "tanggal_daftar" },
  { title: "Nama PU", key: "nama_pu" },
  { title: "Alamat", key: "alamat" },
  { title: "Skala Usaha", key: "skala_usaha" },
  { title: "Jenis Produk", key: "jenis_produk" },
  { title: "Merek Dagang", key: "merek_dagang" },
  { title: "Lihat Laporan SPH", key: "laporan_sph" },
  { title: "Action", key: "action" },
];

const searchQuery = ref("");

const handleInput = () => {
  console.log("Search:", searchQuery.value);
};

const navigateAction = (id: string) => {
  alert(`Navigating to detail page for ID: ${id}`);
};
</script>

<template>
  <div>
    <p class="text-h4">Tabel Pengajuan Proses Sidang</p>
    <VCard class="pa-4">
      <VRow>
        <VCol>
          <p class="text-h5">Data Pengajuan</p>
        </VCol>
      </VRow>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTableServer
            v-model:items-per-page="itemPerPage"
            v-model:page="page"
            :headers="verifikatorTableHeader"
            :items="items"
            :loading="loading"
            :items-length="totalItems"
            loading-text="Loading..."
          >
            <template #item.id="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tanggal_daftar="{ item }">
              {{ formatDateIntl(new Date(item.tanggal_daftar)) }}
            </template>
            <template #item.laporan_sph="{ item }">
              <VBtn color="primary" @click="navigateAction(item.id)">
                {{ item.laporan_sph ? "Lihat Dokumen" : "Tidak Ada Dokumen" }}
              </VBtn>
            </template>
            <template #item.action="{ item }">
              <div class="d-flex gap-1">
                <VIcon
                  icon="ri-arrow-right-line"
                  color="primary"
                  @click="navigateAction(item.id)"
                />
              </div>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss"></style>
