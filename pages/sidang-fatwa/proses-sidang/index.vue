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
const filterLembaga = ref([])
const filterPendamping = ref([])
const filterFasilitasi = ref([])
const lembaga = ref('')
const fasilitasi = ref('')
const pendamping = ref('')

const loadItem = async (
  page: number,
  size: number,
  lembaga: string = '',
  fasilitasi: string = '',
  pendamping: string = '',
  namaPengajuan: string = '',
) => {
  try {
    loading.value = true

    const response: any = await $api('/self-declare/komite-fatwa/proses-sidang', {
      method: 'get',
      params: {
        page,
        size,
        lembaga,
        fasilitasi,
        pendamping,
        namaPengajuan,
      },
    })

    items.value = response.data || []
    totalItems.value = response.total_item || 0
    loading.value = false
    console.log(response.data, 'ini response data sidang fatwa')

    return response
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}

const loadFilter = async () => {
  try {
    loading.value = true

    const response1: any = await $api('/self-declare/komite-fatwa/proses-sidang/filter-fasilitasi', {
      method: 'get',
    })

    const response2: any = await $api('/self-declare/komite-fatwa/proses-sidang/filter-lembaga', {
      method: 'get',
    })

    const response3: any = await $api('/self-declare/komite-fatwa/proses-sidang/filter-pendamping', {
      method: 'get',
    })

    filterFasilitasi.value = response1.data || []
    filterLembaga.value = response2.data || []
    filterPendamping.value = response3.data || []
    loading.value = false
    console.log(response1.data, 'ini response filter fasilitasi')

    return response1
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  await loadItem(1, itemPerPage.value, lembaga.value, fasilitasi.value, pendamping.value, searchQuery.value)
  await loadFilter()
  loading.value = false
})

const refresh = async () => {
  await loadItem(1, itemPerPage.value, lembaga.value, fasilitasi.value, pendamping.value, searchQuery.value)
}

const verifikatorTableHeader = [
  { title: 'No', key: 'id' },
  { title: 'Nomor Daftar', key: 'no_daftar' },
  { title: 'Tanggal Daftar', key: 'tanggal_daftar' },
  { title: 'Nama PU', key: 'nama_pu' },
  { title: 'Alamat', key: 'alamat_pu' },
  { title: 'Skala Usaha', key: 'skala_usaha' },
  { title: 'Jenis Produk', key: 'jenis_produk' },
  { title: 'Merek Dagang', key: 'merek_dagang' },
  { title: 'Pendamping', key: 'pendamping' },
  { title: 'Action', key: 'action' },
]

const debouncedFetch = debounce(loadItem, 500)

const handleInput = () => {
  debouncedFetch(
    page.value,
    itemPerPage.value,
    lembaga.value, fasilitasi.value, pendamping.value,
    searchQuery.value,
  )
}

const navigateAction = (id: string) => {
  navigateTo(`/sidang-fatwa/proses-sidang/${id}`)
}

// Filter state
const showFilterMenu = ref(false)

const applyFilters = () => {
  loadItem(page.value, itemPerPage.value, lembaga.value, fasilitasi.value, pendamping.value, searchQuery.value)
  showFilterMenu.value = false
}

const reset = () => {
  lembaga.value = ''
  fasilitasi.value = ''
  pendamping.value = ''
  searchQuery.value = ''

  loadItem(page.value, itemPerPage.value, fasilitasi.value, pendamping.value, searchQuery.value)

  showFilterMenu.value = false
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
                v-model="fasilitasi"
                label="Fasilitas"
                placeholder="Pilih Fasilitas"
                :items="[{ id: '', name: 'Pilih Fasilitas' }, ...filterFasilitasi]"
                item-title="name"
                item-value="id"
                class="mt-3"
              />

              <VSelect
                v-model="lembaga"
                label="Lembaga"
                placeholder="Pilih Lembaga"
                :items="[{ id: '', name: 'Pilih Lembaga' }, ...filterLembaga]"
                item-title="name"
                item-value="id"
                class="mt-3"
              />

              <VSelect
                v-model="pendamping"
                label="Pendamping"
                placeholder="Pilih Pendamping"
                :items="[{ id: '', name: 'Pilih Pendamping' }, ...filterPendamping]"
                item-title="name"
                item-value="id"
                class="mt-3"
              />
              <br>
              <VBtn
                style="float: inline-start;"
                text="Reset Filter"
                @click="reset"
              />
              <VBtn
                style="float: inline-end;"
                color="primary"
                @click="applyFilters"
              >
                Apply Filters
              </VBtn>
            </VCard>
          </VMenu>
        </VCol>
        <VCol
          class="d-flex justify-sm-space-between align-center"
          cols="10"
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
            <!--
              <template #item.tanggal_daftar="{ item }">
              {{ formatDateIntl(new Date(item?.tanggal_daftar)) || "22-07-2024"}}
              </template>
            -->
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
