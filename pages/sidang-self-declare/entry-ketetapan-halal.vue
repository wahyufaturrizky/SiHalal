<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { VDataTableServer } from 'vuetify/components';

const items = ref<
  {
    id: string
    no_daftar: string
    tgl_sidang: string
    tgl_daftar: string
    nama_pu: string
    alamat: string
    kota_pu: string
    jenis_produk: string
    merek_dagang: string
    no_kh: string
    keteteapan: string
    catatan1: string
    catatan2: string
  }[]
>([])

const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const loadingAll = ref(true)
const searchQuery = ref('')
const startDate = ref('')
const endDate = ref('')
const page = ref(1)
const ketetapan = ref('')

const filter = ref({
  startDate: '',
  endDate: '',
  ketetapan: '',
  totalWorkingDays: '',
  average: 21,
})

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Nomor Daftar', key: 'no_daftar', nowrap: true },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true },
  { title: 'Alamat', key: 'alamat', nowrap: true },
  { title: 'Kabupaten', key: 'kota_pu', nowrap: true },
  { title: 'Jenis Produk', key: 'jenis_produk', nowrap: true },
  { title: 'Merk Dagang', key: 'merek_dagang', nowrap: true },
  { title: 'Tanggal Sidang', key: 'tgl_sidang', nowrap: true },
  { title: 'Tanggal Daftar', key: 'tgl_daftar', nowrap: true },
  { title: 'Nomor KH', key: 'no_kh', nowrap: true },
  { title: 'Ketetapan', key: 'keteteapan', nowrap: true },
  { title: 'Catatan 1', key: 'catatan', nowrap: true },
  { title: 'Catatan 2', key: 'catatan2', nowrap: true },
]

const loadItem = async (
  page: number,
  size: number,
  startDate: string,
  endDate: string,
  ketetapan: string,
) => {
  try {
    loading.value = true

    const response: any = await $api('/self-declare/komite-fatwa/entri-ketetapan-halal', {
      method: 'get',
      params: {
        page,
        size,
        startDate,
        endDate,
        ketetapan,
      },
    })

    if (response.code === 2000) {
      console.log(response.data, 'ini response data')
      items.value = response.data || []
      totalItems.value = response.total_item || 0
      loading.value = false
      console.log('Total Items:', totalItems.value)

      return response
    }
    else {
      loading.value = false
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}

// const debouncedFetch = debounce(loadItem, 500)

// const handleInput = () => {
//   debouncedFetch({
//     page: page.value,
//     size: itemPerPage.value,
//     startDate: startDate.value,
//     endDate: endDate.value,
//     ketetapan: ketetapan.value,
//   })
// }

onMounted(async () => {
  const res = await Promise.all([
    loadItem(page.value, itemPerPage.value, startDate.value, endDate.value, ketetapan.value),
  ])

  const checkResIfUndefined = res.every(item => {
    return item !== undefined
  })

  if (checkResIfUndefined)
    loadingAll.value = false
  else
    loadingAll.value = false
})

// TODO -> LOGIC BUAT NGE UPDATE DATA BY FILTER
// const onUpdate = () => {
//   console.log('UPDATE FILTE ', filter.value)
// }

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === 'Ditetapkan Halal')
    return 'success'

  return 'primary'
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 400 : '90%'
})
</script>

<template>
  <VContainer>
    <KembaliButton class="pl-0" />
    <h3 class="text-h3">
      Hasil Penetapan
    </h3>
    <br>

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Daftar Hasil</span>
      </VCardTitle>
      <VCardItem>
        <VRow
          no-gutters
          class="d-flex align-center"
        >
          <VCol cols="2">
            <VBtn
              color="primary"
              append-icon="mdi-filter"
              variant="outlined"
            >
              Filter
              <VMenu
                activator="parent"
                :close-on-content-click="false"
                @update:model-value="onUpdate"
              >
                <VCard :min-width="dialogMaxWidth">
                  <VCardItem>
                    <VRow class="mb-1">
                      <VCol cols="6">
                        <VLabel for="startDate">
                          Tanggal Sidang
                        </VLabel>
                        <VTextField
                          id="startDate"
                          v-model="filter.startDate"
                          type="date"
                        />
                      </VCol>
                      <VCol cols="6">
                        <VLabel for="startDate">
                          Sampai
                        </VLabel>
                        <VTextField
                          id="startDate"
                          v-model="filter.endDate"
                          type="date"
                        />
                      </VCol>
                    </VRow>
                    <VSelect
                      v-model="filter.ketetapan"
                      :items="['Dikembalikan', 'Ditetapkan Halal', 'Ditolak']"
                      placeholder="Pilih Ketetapan"
                      class="mb-1"
                    />
                    <VCardText class="pa-0 mb-1">
                      <VLabel>Jumlah Hari Kerja</VLabel>
                      <VTextField
                        v-model="filter.totalWorkingDays"
                        type="number"
                        placeholder="Isi Jumlah Hari Kerja"
                      />
                    </VCardText>
                    <VCardText class="pa-0">
                      <VLabel>Rata-Rata</VLabel>
                      <VTextField
                        v-model="filter.average"
                        type="number"
                        placeholder="Isi Rata-Rata"
                      />
                    </VCardText>
                  </VCardItem>
                </VCard>
              </VMenu>
            </VBtn>
          </VCol>
          <VCol>
            <VTextField
              v-model="searchQuery"
              density="compact"
              placeholder="Search Data"
              append-inner-icon="ri-search-line"
              @input="handleInput"
            />
          </VCol>
        </VRow>
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items="items"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
          @update:options="loadItem(page, itemPerPage, searchQuery, status)"
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
          <template #[`item.keteteapan`]="{ item }">
            <div class="d-flex flex-wrap">
              <VChip
                :key="item.id"
                :color="getChipColor(item.keteteapan)"
                label
                class="ma-1"
              >
                {{ item.keteteapan }}
              </VChip>
            </div>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </VContainer>
</template>
