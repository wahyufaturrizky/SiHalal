<script setup lang="ts">
const router = useRouter()
const dataTable = ref<any[]>([])
const loading = ref<boolean>(false)
const page = ref<number>(1)
const size = ref<number>(10)
const searchQuery = ref<string>('')
const showFilterMenu = ref(false)
const getWithFilter = ref<boolean>(false)
const listChannel = ref<any[]>([])
const skalaUsaha = ref<any[]>([])
const provinceData = ref<any[]>([])

const invoiceHeader: any[] = [
  { title: 'No', value: 'index' },
  { title: 'Nomor Daftar', value: 'no_daftar', nowrap: true },
  { title: 'Tanggal', value: 'tanggal_daftar', nowrap: true },
  { title: 'Nama PU', value: 'nama_pu', nowrap: true },
  { title: 'Jenis Daftar', value: 'jenis_daftar', nowrap: true },
  { title: 'Jenis Produk', value: 'jenis_produk', nowrap: true },
  { title: 'Jenis Usaha dan Jumlah', value: 'businessType', nowrap: true },
  { title: 'Status', value: 'status', nowrap: true },
  { title: 'Tanggal Dikirim Oleh BPJPH', value: 'tgl_dikirim', nowrap: true },
  { title: 'Action', value: 'actions', align: 'center' },
]

const selectedFilters = ref({
  jenisLayanan: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lph: 'Semua',
})

const loadItem = async (pageNumber: number, sizeData: number, search: string = '', path: string) => {
  try {
    let params = {
      pageNumber,
      sizeData,
      search,
      url: path,
    }
    if (getWithFilter.value) {
      params = {
        ...params,
        skala_code: selectedFilters.value.jenisProduk.replace('Semua', ''),
        provinsi_code: selectedFilters.value.provinsi.replace('Semua', ''),
        channel_code: selectedFilters.value.jenisLayanan.replace('Semua', ''),
      }
    }

    const response: any = await $api('/reguler/lph/list', {
      method: 'get',
      params,
    })

    if (response?.code === 2000) {
      if (path === LIST_CHANNEL_PATH) {
        const newData: any = [{ name: 'Semua', code: '' }]

        response?.data.map((item: any) => {
          return newData.push(item)
        })

        return newData
      }

      return response.data
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const handleSearch = async (pageNumber: number, sizeData: number, search: string = '', path: string) => {
  try {
    let params = {
      pageNumber,
      sizeData,
      search,
      url: path,
    }
    if (getWithFilter.value) {
      params = {
        ...params,
        skala_code: selectedFilters.value.jenisProduk.replace('Semua', ''),
        provinsi_code: selectedFilters.value.provinsi.replace('Semua', ''),
        channel_code: selectedFilters.value.jenisLayanan.replace('Semua', ''),
      }
    }

    const response: any = await $api('/reguler/lph/list', {
      method: 'get',
      params,
    })

    if (response?.code === 2000)
      return dataTable.value = response.data
    else
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const getMasterSkalaUsaha = async () => {
  const response: any[] = await $api('/master/business-entity-scale',
    { method: 'get' },
  )

  const newData: any = { name: 'Semua', code: '' }

  response.unshift(newData)

  return response
}

const getMasterProvinsi = async () => {
  const response: any[] = await $api('/master/province',
    { method: 'get' },
  )

  const newData: any = { name: 'Semua', code: '' }

  response.unshift(newData)

  return response
}

const handleInput = (e: any) => {
  loading.value = true
  debounce(handleSearch(page.value, size.value, e.target.value, LIST_POST_AUDIT), 500)
  loading.value = false
}

const applyFilters = async () => {
  showFilterMenu.value = false
  getWithFilter.value = true
  handleSearch(page.value, size.value, searchQuery.value, LIST_POST_AUDIT)
}

onMounted(async () => {
  loading.value = true

  const responseData = await Promise.allSettled([
    loadItem(page.value, size.value, searchQuery.value, LIST_POST_AUDIT),
    loadItem(page.value, size.value, searchQuery.value, LIST_CHANNEL_PATH),
    getMasterSkalaUsaha(),
    getMasterProvinsi(),
  ])

  if (responseData) {
    dataTable.value = responseData?.[0]?.value || []
    listChannel.value = responseData?.[1]?.value || []
    skalaUsaha.value = responseData?.[2]?.value || []
    provinceData.value = responseData?.[3]?.value || []
  }
  loading.value = false
})
</script>

<template>
  <div
    class="d-flex align-center cursor-pointer"
    @click="router.go(-1)"
  >
    <VIcon
      icon="mdi-chevron-left"
      size="40px"
      color="primary"
    />
    <div class="text-primary">
      Kembali
    </div>
  </div>
  <VRow no-gutters>
    <VCol>
      <h1>Penyelesaian Data Post Audit</h1>
    </VCol>
  </VRow>
  <div v-if="!loading">
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle class="my-3 d-flex justify-space-between align-center">
            <div class="font-weight-bold text-h4">
              Data Pemeriksaan Produk
            </div>
          </VCardTitle>
          <VCardText>
            <VRow class="mb-4">
              <VCol cols="2">
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
                      :items="listChannel"
                      item-title="name"
                      item-value="code"
                    />
                    <VSelect
                      v-model="selectedFilters.jenisProduk"
                      label="Skala Usaha"
                      :items="skalaUsaha"
                      class="mt-3"
                      item-title="name"
                      item-value="code"
                    />
                    <VSelect
                      v-model="selectedFilters.provinsi"
                      label="Pusat"
                      :items="provinceData"
                      item-title="name"
                      item-value="code"
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
              <VSpacer />
              <VCol cols="9">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Cari Nama Pengajuan"
                  density="compact"
                  append-inner-icon="ri-search-line"
                  style="max-inline-size: 100%"
                  @input="handleInput"
                />
              </VCol>
            </VRow>
            <VDataTable
              class="examination-table border rounded"
              :headers="invoiceHeader"
              :items="dataTable"
              :page="1"
              hover
            >
              <template #no-data>
                <div class="w-full mt-2">
                  <div
                    class="pt-2"
                    style="justify-items: center"
                  >
                    <img
                      src="~/assets/images/empty-data.png"
                      alt="empty_data"
                    >
                    <div class="pt-2 pb-2 font-weight-bold">
                      Data Kosong
                    </div>
                  </div>
                </div>
              </template>
              <template #item.index="{ index }">
                {{ index + 1 }}
              </template>
              <template #item.tanggal_daftar="{ item }">
                <div v-if="item?.tanggal_daftar">
                  {{ formatDateIntl(new Date(item?.tanggal_daftar)) }}
                </div>
              </template>
              <template #item.businessType="{ item }">
                <div class="d-flex">
                  <div
                    v-for="(el, idx) in item.businessType"
                    :key="idx"
                    class="green-box py-1 px-3 me-3"
                  >
                    {{ el }}
                  </div>
                </div>
              </template>
              <template #item.status="{ item }">
                <div class="status-box py-1 px-3 cursor-pointer">
                  {{ item.status }}
                </div>
              </template>
              <template #item.actions>
                <VIcon
                  icon="mdi-arrow-right"
                  color="primary"
                  size="x-large"
                  @click="router.push(props.detailPath)"
                />
              </template>
              <template #bottom>
                <VDataTableFooter
                  v-if="props?.data.length > 10"
                  first-icon="mdi-chevron-double-left"
                  last-icon="mdi-chevron-double-right"
                  show-current-page
                />
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
