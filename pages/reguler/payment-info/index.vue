<!-- eslint-disable regex/invalid -->
<script setup lang="ts">
const router = useRouter()
const dataTable = ref<any[]>([])
const listChannel = ref<any[]>([])
const skalaUsaha = ref<any[]>([])
const provinceData = ref<any[]>([])
const loading = ref<boolean>(false)
const page = ref<number>(1)
const size = ref<number>(10)
const searchQuery = ref<string>('')

const invoiceHeader: any[] = [
  { title: 'No', value: 'index' },
  { title: 'Nomor Tagihan', value: 'billNumber', nowrap: true },
  { title: 'Tanggal Tagihan', value: 'billDate', nowrap: true },
  { title: 'No Ref', value: 'refNumber', nowrap: true },
  { title: 'Nama PU', value: 'businessName', nowrap: true },
  { title: 'Tanggal Dikirim Oleh BPJPH', value: 'sentDate', nowrap: true },
  { title: 'Jenis Transaksi', value: 'trxType', nowrap: true },
  { title: 'Jatuh Tempo', value: 'dueDate', nowrap: true },
  { title: 'Jumlah Tagihan', value: 'totalBill', nowrap: true },
  { title: 'Tanggal Bayar', value: 'payDate', nowrap: true },
  { title: 'Action', value: 'actions', align: 'center' },
]

const invoiceData = [
  {
    billNumber: 'SH2024-225-29480',
    billDate: '22/08/2024',
    refNumber: 'SH2024-225-29480',
    businessName: 'Dapoer Boenda',
    sentDate: '22/08/2024 06:38 (500 hari)',
    trxType: 'Sertifikasi Halal',
    dueDate: '22/08/2024',
    totalBill: 'Rp 200,000',
    payDate: '22/08/2024',
  },
  {
    billNumber: 'SH2024-225-29480',
    billDate: '22/08/2024',
    refNumber: 'SH2024-225-29480',
    businessName: 'Dapoer Boenda',
    sentDate: '22/08/2024 06:38 (500 hari)',
    trxType: 'Sertifikasi Halal',
    dueDate: '22/08/2024',
    totalBill: 'Rp 200,000',
    payDate: '22/08/2024',
  },
]

const showFilterMenu = ref(false)

const selectedFilters = ref({
  jenisLayanan: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lph: 'Semua',
})

const loadItem = async (pageNumber: number, sizeData: number, search: string = '', path: string) => {
  try {
    const response: any = await $api('/lph/list', {
      method: 'get',
      params: {
        pageNumber,
        sizeData,
        search,
        url: path,
      },
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

const handleInput = (e: any) => {
  loading.value = true
  debounce(loadItem(page.value, size.value, e.target.value), 500)
  loading.value = false
}

const getMasterSkalaUsaha = async () => {
  const response: any[] = await $api('/master/business-entity-scale',
    { method: 'get' },
  )

  const newData: any = [{ name: 'Semua', code: '' }]

  response.unshift(newData)

  return response
}

const getMasterProvinsi = async () => {
  const response: any[] = await $api('/master/province',
    { method: 'get' },
  )

  const newData: any = [{ name: 'Semua', code: '' }]

  response.unshift(newData)

  return response
}

onMounted(async () => {
  loading.value = true

  const responseData = await Promise.allSettled([
    loadItem(page.value, size.value, searchQuery.value, LIST_PEMERIKSAAN_PATH),
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
  <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow no-gutters>
    <VCol>
      <h1>Informasi Pembayaran</h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="font-weight-bold text-h4">
            Daftar Invoice Yang Sudah Dibayar
          </div>
        </VCardTitle>
        <VCardText>
          <div class="d-flex gap-10 mb-5">
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
                  :items="['Semua', 'Produk Y', 'Produk Z']"
                  class="mt-3"
                />
                <VSelect
                  v-model="selectedFilters.provinsi"
                  label="Pusat"
                  :items="['Semua', 'Jakarta', 'Jawa Barat']"
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
            <VTextField
              v-model="searchQuery"
              placeholder="Cari Nama Pengajuan"
              density="compact"
              append-inner-icon="ri-search-line"
              style="max-inline-size: 100%"
              @input="handleInput"
            />
          </div>
          <VDataTable
            class="invoice-table border rounded"
            :headers="invoiceHeader"
            :items="invoiceData"
            :page="1"
          >
            <template #item.index="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.actions>
              <VIcon
                icon="mdi-arrow-right"
                color="primary"
                size="x-large"
                @click="router.push('/reguler/payment-info/detail')"
              />
            </template>
            <template #bottom>
              <VDataTableFooter
                v-if="invoiceData.length > 10"
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
</template>

<style scoped lang="scss">
:deep(.v-data-table.invoice-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }
    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}

:deep(.v-data-table.invoice-table > .v-data-table-footer) {
  .v-data-table-footer__info {
    display: none;
  }
}
</style>
