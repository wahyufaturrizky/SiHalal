<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VDataTableServer } from 'vuetify/components';

const items = ref<
  {
    id: string
    nomor_daftar: string
    tanggal_daftar: string
    nama_pu: string
    alamat: string
    skala_usaha: string
    jenis_produk: string
    merek_dagang: string
    laporan_sph: string
  }[]
>([])

const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const searchQuery = ref('')
const page = ref(1)

const loadItem = async (
  page: number,
  size: number,
  lembaga_pendamping_id: string = '',
  pendamping_id: string = '',
  fac_id: string = '',
  nama_pengajuan: string = '',
) => {
  try {
    loading.value = true

    const response: any = await $api('/self-declare/komite-fatwa/proses-sidang', {
      method: 'get',
      params: {
        page,
        size,
        lembaga_pendamping_id,
        pendamping_id,
        fac_id,
        nama_pengajuan,
      },
    })

    items.value = response.data || []
    totalItems.value = response.total_item || 0
    loading.value = false
    console.log(response.data, 'ini response data')

    return response
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}

onMounted(async () => {
  await loadItem(1, itemPerPage.value, '73376711-e2d2-4523-8e83-28d327de926e', '', '', '')
})

const refresh = async () => {
  await loadItem(1, itemPerPage.value, '73376711-e2d2-4523-8e83-28d327de926e', '', '', '')
}

const verifikatorTableHeader = [
  { title: 'No', key: 'id' },
  { title: 'Nomor Daftar', key: 'nomor_daftar' },
  { title: 'Tanggal Daftar', key: 'tanggal_daftar' },
  { title: 'Nama PU', key: 'nama_pu' },
  { title: 'Alamat', key: 'alamat' },
  { title: 'Skala Usaha', key: 'skala_usaha' },
  { title: 'Jenis Produk', key: 'jenis_produk' },
  { title: 'Merek Dagang', key: 'merek_dagang' },
  { title: 'Lihat Laporan SPH', key: 'laporan_sph' },
  { title: 'Action', key: 'action' },
]

const selectedFilters = ref({
  jenisLayanan: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lph: 'Semua',
})

const debouncedFetch = debounce(loadItem, 500)

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    searchQuery.value,
  )
}

const navigateAction = (id: string) => {
  navigateTo(`/sidang-fatwa/detail/${id}`)
}

// Filter state
const showFilterMenu = ref(false)

const applyFilters = () => {
  loadItem(page.value, itemPerPage.value, '73376711-e2d2-4523-8e83-28d327de926e', '', '', '')
}
</script>

<template>
  <div>
    <p class="text-h4">
      Tabel Pengajuan Proses Sidang
    </p>
    <VCard class="pa-4">
      <VRow>
        <VCol>
          <p class="text-h5">
            Data Pengajuan
          </p>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          class="d-flex justify-start align-center"
          cols="2"
        >
          <VMenu
            v-model="showFilterMenu"
            :close-on-content-click="false"
            offset-y
          >
            <template #activator="{ props }">
              <VBtn
                color="primary"
                variant="outlined"
                v-bind="props"
                append-icon="ri-filter-fill"
              >
                Filter
              </VBtn>
            </template>
            <VCard
              class="pa-3"
              width="300"
            >
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
              <VBtn
                block
                color="primary"
                class="mt-3"
                @click="applyFilters"
              >
                Apply Filters
              </VBtn>
            </VCard>
          </VMenu>
        </VCol>
        <VCol
          class="d-flex justify-sm-space-between align-center"
          cols="5"
        >
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-inline-size: 100%;"
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
            @update:options="loadItem(page, itemPerPage, searchQuery)"
          >
            <template #item.id="{ index }">
              {{ index + 1 + (page - 1) * itemPerPage }}
            </template>
            <template #item.tanggal_daftar="{ item }">
              {{ formatDateIntl(new Date(item?.tanggal_daftar)) || "22-07-2024"}}
            </template>
            <template #item.merek_dagang="{ item }">
              {{ item.merek_dagang || 'N/A' }} <!-- Display Merek Dagang value or N/A if not available -->
            </template>
            <template #item.laporan_sph="{ item }">
              <VBtn
                color="secondary"
                @click="navigateAction(item.id)"
              >
                Lihat Dokumen
              </VBtn> <!-- Button changed to "Lihat Dokumen" -->
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
          </VDataTableServer>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped lang="scss"></style>
