<!-- eslint-disable regex/invalid -->
<script setup lang="ts">
const router = useRouter()
const dataTable = ref<any[]>([])
const loading = ref<boolean>(false)
const page = ref<number>(1)
const size = ref<number>(10)
const searchQuery = ref<string>('')

const invoiceHeader: any[] = [
  { title: 'No', value: 'index' },
  { title: 'Nomor Tagihan', value: 'no_tagihan', nowrap: true },
  { title: 'Tanggal Tagihan', value: 'tanggal_tagihan', nowrap: true },
  { title: 'No Ref', value: 'no_tagihan', nowrap: true },
  { title: 'Nama PU', value: 'nama_pu', nowrap: true },
  { title: 'Tanggal Dikirim Oleh BPJPH', value: 'tgl_dikirim', nowrap: true },
  { title: 'Jenis Transaksi', value: 'jenis_transaksi', nowrap: true },
  { title: 'Jatuh Tempo', value: 'tanggal_jatuh_tempo', nowrap: true },
  { title: 'Jumlah Tagihan', value: 'jumlah_tagihan', nowrap: true },
  { title: 'Tanggal Bayar', value: 'tanggal_bayar', nowrap: true },
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

const loadItem = async (pageNumber: number, sizeData: number, search: string = '', path: string) => {
  try {
    const response: any = await $api('/reguler/lph/list', {
      method: 'get',
      params: {
        pageNumber,
        sizeData,
        search,
        url: path,
      },
    })

    if (response?.code === 2000)
      dataTable.value = response?.data
    else
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const handleInput = (e: any) => {
  loading.value = true
  debounce(loadItem(page.value, size.value, e.target.value, LIST_INFORMASI_PEMBAYARAN), 500)
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  loadItem(page.value, size.value, searchQuery.value, LIST_INFORMASI_PEMBAYARAN)
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
          <div>
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
            class="invoice-table border rounded mt-5"
            :headers="invoiceHeader"
            :items="dataTable"
            :page="1"
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
            <template #item.actions="{ item }">
              <VIcon
                icon="mdi-arrow-right"
                color="primary"
                size="x-large"
                @click="router.push(`/reguler/payment-info/${item.id_reg}`)"
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
