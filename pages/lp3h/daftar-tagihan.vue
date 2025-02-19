<script setup lang="ts">
const itemPerPage = ref(10)
const totalItems = ref(0)
const page = ref(1)
const loading = ref(true)

const daftarTagihanHeader = [
  { title: 'No', key: 'no' },
  { title: 'No. Tagihan', key: 'noTagihan' },
  { title: 'Tanggal', key: 'tanggal' },
  { title: 'Total', key: 'total' },
  { title: 'Status', key: 'status' },
  { title: 'Bukti Bayar', key: 'buktiBayar' },
  { title: 'Invoice', key: 'invoice' },
  { title: 'Action', key: 'action' },
]

const daftarTagihanItem = ref([])

const downloadBuktiBayar = async item => {
  console.log('downloadBuktiBayar : ', item)

  try {
    const response = await $api('/shln/submission/document/download', {
      method: 'post',
      body: {
        filename: item.buktiTransfer,
      },
    })

    if (response.url)
      window.open(response.url, '_blank', 'noopener,noreferrer')
  }
  catch (error) {
    console.log(error)
  }
}

const previewInvoice = async item => {
  console.log('previewInvoice : ', item)

  try {
    const response = await $api('/shln/submission/document/download', {
      method: 'post',
      body: {
        filename: item.invoice,
      },
    })

    if (response.url)
      window.open(response.url, '_blank', 'noopener,noreferrer')
  }
  catch (error) {
    console.log(error)
  }
}

const authUser = useMyAuthUserStore()

const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true

    const idUser = authUser.user.id

    const response = await $api('/lp3h/list-tagihan', {
      method: 'get',
      params: {
        page,
        limit: itemPerPage,
        ref_unik: idUser,
      },
    })

    const data = response.data

    if (data != null) {
      daftarTagihanItem.value = data.map(
        i => ({
          id: i.id,
          noTagihan: i.nomor,
          tanggal: i.tanggal,
          total: i.total,
          status: i.status_payment,
          buktiTransfer: i.file_bukti_transfer,
          invoice: i.file_invoice,
          jumlahPu: i.jumlah_pu,
        }),
      )
    }

    totalItems.value = response.totalItems
    loading.value = false
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loading.value = false
  }
}

const debouncedFetch = debounce(loadItem, 500)

onMounted(async () => {
  debouncedFetch(page.value, itemPerPage.value)
})
</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-4">
        <h3 class="text-h3">
          Daftar Tagihan ke BPJPH
        </h3>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard class="pa-2">
          <VCardTitle class="text-h4 mx-0">
            Daftar Tagihan
          </VCardTitle>
          <VCardItem>
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :items-length="totalItems"
              :loading="loading"
              loading-text="Loading..."
              :headers="daftarTagihanHeader"
              :items="daftarTagihanItem"
              @update:options="loadItem(page, itemPerPage)"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template #item.buktiBayar="{ item }">
                <VBtn
                  icon
                  variant="text"
                  @click="downloadBuktiBayar(item)"
                >
                  <VIcon
                    size="24"
                    color="primary"
                  >
                    mdi-download
                  </VIcon>
                </VBtn>
              </template>

              <template #item.invoice="{ item }">
                <VBtn
                  icon
                  variant="text"
                  @click="previewInvoice(item)"
                >
                  <VIcon
                    size="24"
                    color="primary"
                  >
                    mdi-eye
                  </VIcon>
                </VBtn>
              </template>

              <template #item.status="{ item }">
                <VChip
                  :color="item.status === 'Terbayar' ? 'success' : 'error'"
                  variant="outlined"
                  label
                >
                  {{ item.status }}
                </VChip>
              </template>

              <template #item.action="{ item }">
                <VBtn
                  icon
                  variant="text"
                  @click="navigateTo({
                    path: `/lp3h/detail-tagihan/${item.id}`,
                    query: {
                      data: JSON.stringify({
                        no: item.noTagihan,
                        total: item.total,
                        jumlahPu: item.jumlahPu,
                        status: item.status,
                        tanggal: item.tanggal
                      }),
                    },
                  })"
                >
                  <VIcon
                    size="24"
                    color="primary"
                  >
                    mdi-arrow-right
                  </VIcon>
                </VBtn>
              </template>
            </VDataTableServer>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">

</style>
