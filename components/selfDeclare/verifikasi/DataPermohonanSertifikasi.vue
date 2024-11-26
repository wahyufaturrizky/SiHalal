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
  d_daftar: string
  TanggalDaftar: number
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
    id_daftar: 'D001',
    TanggalDaftar: '2024-11-01',
    Nama: 'John Doe',
    Alamat: '1234 Elm Street, Springfield',
    JenisProduk: 'Electronics',
    MerkDagang: 'TechBrand',
    Status: 'OF7',
  },
  {
    id: 2,
    id_daftar: 'D002',
    TanggalDaftar: '2024-11-02',
    Nama: 'Jane Smith',
    Alamat: '5678 Oak Avenue, Riverdale',
    JenisProduk: 'Food & Beverages',
    MerkDagang: 'Tasty Treats',
    Status: 'OF7',
  },
  {
    id: 3,
    id_daftar: 'D003',
    TanggalDaftar: '2024-11-03',
    Nama: 'Alice Johnson',
    Alamat: '9102 Pine Lane, Metropolis',
    JenisProduk: 'Apparel',
    MerkDagang: 'FashionWear',
    Status: 'OF7',
  },
  {
    id: 4,
    id_daftar: 'D004',
    TanggalDaftar: '2024-11-04',
    Nama: 'Bob Brown',
    Alamat: '1122 Maple Drive, Gotham',
    JenisProduk: 'Home Appliances',
    MerkDagang: 'HomeEase',
    Status: 'OF7',
  },
  {
    id: 5,
    id_daftar: 'D005',
    TanggalDaftar: '2024-11-05',
    Nama: 'Emily Davis',
    Alamat: '3344 Birch Road, Star City',
    JenisProduk: 'Cosmetics',
    MerkDagang: 'BeautyGlow',
    Status: 'OF7',
  },
])

const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const page = ref(1)

// Table headers
const permohonanHeaders = [
  { title: 'No', key: 'id', align: 'center' },
  { title: 'ID Daftar', key: 'id_daftar' },
  { title: 'Pilih', key: 'pilih' },
  { title: 'Tanggal Daftar', key: 'TanggalDaftar' },
  { title: 'Nama', key: 'Nama' },
  { title: 'Alamat', key: 'Alamat' },
  { title: 'Jenis Produk', key: 'JenisProduk' },
  { title: 'Merk Dagang', key: 'MerkDagang' },
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
  jenisLayanan: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lph: 'Semua',
})

const applyFilters = () => {
  loadItem(page.value, itemPerPage.value, searchQuery.value, selectedFilters.value);
}

// Checkbox selection logic
const isAllSelected = computed(() => {
  return selectedItems.value.length === tableData.value.length
})

const toggleSelectAll = () => {
  selectedItems.value = isAllSelected.value ? [] : tableData.value.slice()
}

const handleCheckboxChange = (item: DataItem, checked: boolean) => {
  if (checked) {
    selectedItems.value.push(item)
  }
  else {
    const index = selectedItems.value.findIndex(selectedItem => selectedItem.id === item.id)
    if (index > -1)
      selectedItems.value.splice(index, 1)
  }
}
</script>

<template>
  <VDialog width="1200">
    <template #activator="{ props: openModal }">
      <VBtn
        variant="outlined"
        prepend-icon="fa-plus"
        style="margin: 1svw"
        v-bind="openModal"
      >
        Tambah
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Data Permohonan Sertifikasi</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <VBtn disabled>
                Pilih Data
              </VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="1">
              <VCheckbox v-model="isAllSelected" @click="toggleSelectAll" />
            </VCol>
            <VCol class="d-flex justify-start align-center" cols="2">
              <VMenu v-model="showFilterMenu" :close-on-content-click="false" offset-y>
                <template #activator="{ props }">
                  <VBtn color="primary" variant="outlined" v-bind="props" append-icon="ri-filter-fill">
                    Filter
                  </VBtn>
                </template>
                <VCard class="pa-3" width="300">
                  <VSelect
                    v-model="selectedFilters.jenisLayanan"
                    label="Jenis Layanan"
                    :items="['Semua', 'Layanan B', 'Layanan C']"
                  />
                  <VSelect
                    v-model="selectedFilters.jenisProduk"
                    label="Jenis Produk"
                    :items="['Semua', 'Produk Y', 'Produk Z']"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.provinsi"
                    label="Provinsi"
                    :items="['Semua', 'Jakarta', 'Jawa Barat']"
                    class="mt-3"
                  />
                  <VSelect
                    v-model="selectedFilters.lph"
                    label="LPH"
                    :items="['Semua', 'Approved', 'Rejected']"
                    class="mt-3"
                  />
                  <VBtn block color="primary" class="mt-3" @click="applyFilters">
                    Apply Filters
                  </VBtn>
                </VCard>
              </VMenu>
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
                <VCheckbox v-model="selectedItems" :value="item" />
              </template>
              <template #item.Status="{ item }">
                <div>
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
  </VDialog>
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
</style>
