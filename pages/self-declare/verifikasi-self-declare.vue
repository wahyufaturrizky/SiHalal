<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import { VDataTableServer } from 'vuetify/components'

// Props and Emits
defineProps({ mode: String })

const emit = defineEmits(['confirm-add', 'cancel']);

// State variables
const isModalOpen = ref(false)
interface DataItem {
  id: number
  id_daftar: string
  TanggalDaftar: string
  Nama: string
  Alamat: string
  JenisProduk: string
  MerkDagang: string
  Status: string
}

const selectedItems = ref<DataItem[]>([])

// Dummy data for table
// Dummy data for the table
const tableData = ref([
  {
    id: 1,
    id_registrasi: 'D001',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-01',
    Nama: 'John Doe',
    Alamat: '1234 Elm Street, Springfield',
    JenisProduk: 'Electronics',
    MerkDagang: 'TechBrand',
    nama_pendamping: 'John',
    Status: 'OF74',
  },
  {
    id: 2,
    id_registrasi: 'D002',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-02',
    Nama: 'Jane Smith',
    Alamat: '5678 Oak Avenue, Riverdale',
    JenisProduk: 'Food & Beverages',
    MerkDagang: 'Tasty Treats',
    nama_pendamping: 'Ben',
    Status: 'OF74',
  },
  {
    id: 3,
    id_registrasi: 'D003',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-03',
    Nama: 'Alice Johnson',
    Alamat: '9102 Pine Lane, Metropolis',
    JenisProduk: 'Apparel',
    MerkDagang: 'FashionWear',
    nama_pendamping: 'Dodi',
    Status: 'OF74',
  },
  {
    id: 4,
    id_registrasi: 'D004',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-04',
    Nama: 'Bob Brown',
    Alamat: '1122 Maple Drive, Gotham',
    JenisProduk: 'Home Appliances',
    MerkDagang: 'HomeEase',
    nama_pendamping: 'Gus',
    Status: 'Verifikasi',
  },
  {
    id: 5,
    id_registrasi: 'D005',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-05',
    Nama: 'Emily Davis',
    Alamat: '3344 Birch Road, Star City',
    JenisProduk: 'Cosmetics',
    MerkDagang: 'BeautyGlow',
    nama_pendamping: 'Yun',
    Status: 'OF74',
  },
])

const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const page = ref(1)

// Table headers
const permohonanHeaders = [
  { title: 'No', key: 'id', align: 'center' },
  { title: 'ID Registrasi', key: 'id_registrasi' },
  { title: 'Nomor Daftar', key: 'nomor_daftar' },
  { title: 'Tanggal Daftar', key: 'TanggalDaftar' },
  { title: 'Nama PU', key: 'Nama' },
  { title: 'Alamat', key: 'Alamat' },
  { title: 'Jenis Produk', key: 'JenisProduk' },
  { title: 'Merk Dagang', key: 'MerkDagang' },
  { title: 'Nama Pendamping', key: 'nama_pendamping' },
  { title: 'Status', key: 'Status' },
  { title: 'Action', key: 'action' },
]

// Methods
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  emit('cancel')
}

const searchQuery = ref('')

const handleInput = () => {
  debouncedFetch(page.value, itemPerPage.value, searchQuery.value);
}

const handleCancel = (message: string) => {
  console.log('Cancel message:', message);
}

const navigateAction = (id: string) => {
  navigateTo(`/sertifikasi-halal/luar-negeri/verification/${id}`);
}

const loadItem = async (page, size) => {
  // Temporarily skip API call for dummy data testing
  items.value = items.value.slice((page - 1) * size, page * size) // Paginate dummy data
  totalItems.value = items.value.length
}

const debouncedFetch = debounce(loadItem, 500)
// Filter state
const showFilterMenu = ref(false);

const selectedFilters = ref({
  fasilitas: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lembaga: 'Semua',
  pendamping: 'Semua',
  kabupaten: 'Semua',
})

const applyFilters = () => {
  loadItem(page.value, itemPerPage.value, searchQuery.value, selectedFilters.value);
}

// Check if all items are selected
const isAllSelected = computed(() => selectedItems.value.length === tableData.value.length)

// Toggle select all
const toggleSelectAll = () => {
  selectedItems.value = isAllSelected.value ? [] : tableData.value.slice()
}

// Adaptive button text
const buttonText = computed(() =>
  selectedItems.value.length > 0
    ? `Pilih Data (${selectedItems.value.length})`
    : 'Pilih Data',
)

// Handle checkbox change
const handleCheckboxChange = (item: { id: number; id_daftar: string; TanggalDaftar: string; Nama: string; Alamat: string; JenisProduk: string; MerkDagang: string; Status: string }, checked: any) => {
  if (checked) {
    // Add item if not already selected
    if (!selectedItems.value.includes(item))
      selectedItems.value.push(item)
  }
  else {
    // Remove item by filtering out the current item
    selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== item.id)
  }
}

// Sample data for "Bahan Bersertifikat" and "Tidak Bersertifikat"
const StatusOptions = [
  { name: 'OF74', value: 'of74' },
  { name: 'Verifikasi', value: 'verifikasi' },
]

const bahanType = ref(null)
</script>

<template>
  <VCard
    variant="flat"
    class="pa-4"
  >
    <VCardTitle>
      <VRow>
        <VCol cols="10"><h3>Data Pengajuan</h3></VCol>
        <VCol cols="2" style="display: flex; justify-content: end">
          <DataPermohonanSertifikasi />
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol />
      </VRow>
      <VRow>
        <VCol cols="3">
          <VSelect
            v-model="bahanType"
            density="compact"
            :items="StatusOptions"
            item-title="name"
            item-value="value"
            placeholder="Status"
          />
        </VCol>
        <VCol class="d-flex justify-sm-space-between align-center" cols="9">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-width: 100%"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="permohonanHeaders"
          :items="tableData"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
          @update:options="loadItem(page, itemPerPage)"
        >
          <template #item.id="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #item.tgl_daftar="{ item }">
            {{ formatDateIntl(new Date(item.TanggalDaftar)) }}
          </template>
          <template #item.action="{ item }">
            <div class="d-flex gap-1">
              <IconBtn size="small">
                <VIcon
                  icon="ri-arrow-right-line"
                  color="primary"
                  @click="navigateAction(item.id)"
                />
              </IconBtn> <!-- Right arrow icon for action -->
            </div>
          </template>
          <template #item.pilih="{ item }">
            <VCheckbox
              v-model="selectedItems"
              :value="item"
            />
          </template>
          <template #item.Status="{ item }">
            <div v-if="item.Status === 'OF74'">
              <div class="status-container">
                <VBtn
                  variant="outlined"
                  style="border-color: #49a84c; background-color: #edf6ed;"
                >
                  <span style="color: #49a84c;">
                    {{ item.Status }}
                  </span>
                </VBtn>
              </div>
            </div>
            <div v-else>
              <div class="status-container">
                <VBtn
                  variant="outlined"
                  type="primary"
                  style="background-color: #f0e9f1;"
                >
                  <span>
                    {{ item.Status }}
                  </span>
                </VBtn>
              </div>
            </div>
          </template>
        </VDataTableServer>
      </VRow>
      <VPagination
        v-model="page"
        :total-visible="7"
        :length="totalPages"
      />
    </VCardText>
  </VCard>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.text-success {
  color: #4caf50;
}
.text-error {
  color: #e53935;
}
.text-primary {
  color: #1976d2;
}
.text-decoration-underline {
  text-decoration: underline;
}

custom-v-checkbox {
  --v-checkbox-size: 24px; /* Set size for outer box */
}

.custom-v-checkbox .v-checkbox__input {
  border: 2px solid #ccc !important; /* Outline border */
  border-radius: 6px; /* Rounded corners */
}

.custom-v-checkbox .v-checkbox__input::before {
  width: 16px !important; /* Inner box size */
  height: 16px !important;
  background: transparent !important;
  border: 2px solid transparent !important; /* Inner box border */
}

.custom-v-checkbox .v-checkbox__input--indeterminate::before,
.custom-v-checkbox .v-checkbox__input--checked::before {
  border-color: #000 !important; /* Inner box color */
  background: #ccc !important;
}
</style>
