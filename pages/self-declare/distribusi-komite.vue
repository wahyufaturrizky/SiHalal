<script setup lang="ts">
import { useDisplay } from "vuetify";
import { defineProps, ref } from 'vue';
import { VDataTableServer } from 'vuetify/components';

defineProps({ mode: String })
const selectAll = ref([])

interface DataItem {
  id: number
  id_daftar: string
  TanggalDaftar: string
  Nama: string
  Alamat: string
  MerkDagang: string
  Status: string
}

const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const page = ref(1)
const permohonanHeaders = [
  { title: 'No', key: 'id', maxWidth: 25},
  { title: 'Pilih', key: 'pilih', maxWidth: 60},
  { title: 'ID Daftar', key: 'id_registrasi' , nowrap: true},
  { title: 'Nomor Daftar', key: 'nomor_daftar' , nowrap: true},
  { title: 'Tanggal Daftar', key: 'TanggalDaftar' , nowrap: true},
  { title: 'Nama PU', key: 'Nama' , nowrap: true},
  { title: 'Alamat', key: 'Alamat' , nowrap: true},
  { title: 'Merk Dagang', key: 'MerkDagang' , nowrap: true},
  { title: 'Status', key: 'Status' },
  { title: 'Action', key: 'action' },
]
const items = ref([
  {
    id: 1,
    id_registrasi: 'D001',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-01',
    Nama: 'John Doe',
    Alamat: '1234 Elm Street, Springfield',
    MerkDagang: 'TechBrand',
    Status: 'OF74',
  },
  {
    id: 2,
    id_registrasi: 'D002',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-02',
    Nama: 'Jane Smith',
    Alamat: '5678 Oak Avenue, Riverdale',
    MerkDagang: 'Tasty Treats',
    Status: 'OF74',
  },
  {
    id: 3,
    id_registrasi: 'D003',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-03',
    Nama: 'Alice Johnson',
    Alamat: '9102 Pine Lane, Metropolis',
    MerkDagang: 'FashionWear',
    Status: 'OF74',
  },
  {
    id: 4,
    id_registrasi: 'D004',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-04',
    Nama: 'Bob Brown',
    Alamat: '1122 Maple Drive, Gotham',
    MerkDagang: 'HomeEase',
    Status: 'Verifikasi',
  },
  {
    id: 5,
    id_registrasi: 'D005',
    nomor_daftar: 'SH2024-225-29480',
    TanggalDaftar: '2024-11-05',
    Nama: 'Emily Davis',
    Alamat: '3344 Birch Road, Star City',
    MerkDagang: 'BeautyGlow',
    Status: 'OF74',
  },
])
const selectedItems = ref<String[]>([])


const searchQuery = ref('')

const handleInput = () => {
  // TODO -> UPDATE TABLE ON INPUT QUERY
  console.log("SEARCH DATA : ", searchQuery)
}


const navigateAction = (id: string) => {
  navigateTo(`/sh-domestic/submission/self-declare/${id}`)
}


const handleSelectAll = () => {
  if(selectAll.value.length === 1){
    for (const item of items.value) {
      selectedItems.value.push(item.id_registrasi)
    }
  }else {
    selectedItems.value = []
  }
}


const isVisible = ref(false);
const openDialog = () => isVisible.value = true
const closeDialog = () => isVisible.value = false

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => mdAndUp.value ? 700 : "90%")

const selectedProses = ref(null)
// TODO -> HANDLE DISTRIBUSI
const onHandleDistribusi = () => {
  console.log("DISTRIBUSI : ", selectedItems.value)
  console.log("SELECTED PROSES : ", selectedProses.value)

  closeDialog()
}


// TODO -> IMPLEMENT FILTER
const onFiltersUpdate = (filter) => {
  console.log("UPDATE FILTER : ", filter)
}

</script>

<template>
  <VCard
    variant="flat"
    class="pa-4"
  >
    <VCardTitle class="mb-6 px-2">
      <VRow>
        <VCol cols="10">
          <h3 class="font-weight-bold">Data Pengajuan</h3>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VBtn @click="openDialog">
          Distribusi ({{selectedItems.length}})
        </VBtn>
      </VRow>
      <VRow >
        <VCol cols="3" class="px-0">
          <VRow class="ga-4" no-gutters>
            <div class="border rounded-lg d-flex justify-center align-center pa">
              <VCheckbox v-model="selectAll" @change="handleSelectAll"></VCheckbox>
            </div>
            <DistribusiKomiteSelfDeclareTableFilter @updateFilter="onFiltersUpdate" />
          </VRow>
        </VCol>
        <VCol
          class="d-flex justify-sm-space-between align-center"
          cols="9"
        >
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Cari Nama Pengajuan"
            append-inner-icon="ri-search-line"
            style="max-inline-size: 100%;"
            @input="handleInput"
          />
        </VCol>
      </VRow>
      <VRow>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="permohonanHeaders"
          :items="items"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
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
                  @click="navigateAction(item.id_registrasi)"
                />
              </IconBtn>
            </div>
          </template>
          <template #item.pilih="{ item }">
            <VCheckbox
              v-model="selectedItems"
              :value="item.id_registrasi"
            />
          </template>
          <template #item.Status="{ item }">
            <div v-if="item.Status === 'OF74'">
              <div class="status-container">
                <VChip
                  variant="outlined"
                  style="border-color: #49a84c; border-radius: 8px; background-color: #edf6ed;"
                >
                  <span style="color: #49a84c;">
                    {{ item.Status }}
                  </span>
                </VChip>
              </div>
            </div>
            <div v-else>
              <div class="status-container">
                <VChip
                  variant="outlined"
                  style="border-color: #652672; border-radius: 8px; background-color: #f0e9f1;"
                >
                  <span style="color: #652672;">
                    {{ item.Status }}
                  </span>
                </VChip>
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

  <VDialog v-model="isVisible" :max-width="dialogMaxWidth" location="top">
    <VCard class="pa-4">
      <VCardTitle class="px-2 font-weight-bold">
        Distribusi
      </VCardTitle>
      <VCardItem class="px-2 mb-4">
        <VLabel for="proses">
          Proses Distribusi Untuk Data Data Yang Dipilih
        </VLabel>
        <VSelect
          id="proses"
          placeholder="Pilih Proses Distribusi"
          v-model="selectedProses"
          :items="['Proses Distribusi 1', 'Proses Distribusi 2']"
        />
      </VCardItem>
      <VCardActions class="d-flex justify-end ga-4">
        <VBtn @click="closeDialog" variant="outlined" min-width="100px">
          Batal
        </VBtn>
        <VBtn min-width="100px" variant="flat" @click="onHandleDistribusi">
          Simpan
        </VBtn>
      </VCardActions>
    </VCard>
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

custom-v-checkbox {
  --v-checkbox-size: 24px; /* Set size for outer box */
}

.custom-v-checkbox .v-checkbox__input {
  border: 2px solid #ccc !important; /* Outline border */
  border-radius: 6px; /* Rounded corners */
}

.custom-v-checkbox .v-checkbox__input::before {
  border: 2px solid transparent !important; /* Inner box border */
  background: transparent !important;
  block-size: 16px !important;
  inline-size: 16px !important; /* Inner box size */
}

.custom-v-checkbox .v-checkbox__input--indeterminate::before,
.custom-v-checkbox .v-checkbox__input--checked::before {
  border-color: #000 !important; /* Inner box color */
  background: #ccc !important;
}
</style>
