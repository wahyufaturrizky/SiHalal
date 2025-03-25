<script setup lang="ts">
const searchQuery = ref(null)

const itemPerPage = ref(10)
const totalItems = ref(0)
const page = ref(1)
const loading = ref(true)

const menu = ref(false)
const selectedFasilitas = ref('4e792bfe-b16a-4ce0-8092-42b2185e2789')

const fasilitas = ref([])

const jenisFasilitas = ref([
  { title: 'SEHATI', value: 'SEHATI' },
  { title: 'NON SEHATI', value: 'NON SEHATI' },
  { title: 'SELFDECLARE MANDIRI', value: 'SELFDECLARE MANDIRI' },
])

const selectedJenisFasilitas = ref(jenisFasilitas.value[0].value)

const firstNoSelected = ref('')
const secondNoSelected = ref('')

const items = ref([])

const selectOptionDisable = ref(true)

const selected = ref([])

const years = ref([
  { title: 2025, value: 2025 },
])

const selectedYear = ref(years.value[0].value)

const onSelectUpdate = () => {
  if (firstNoSelected.value !== '' && secondNoSelected.value !== '') {
    selectOptionDisable.value = false
  }
  else {
    selectOptionDisable.value = true
    selected.value = []
  }
}

const generateRange = (a, b) => [...Array(b - a + 1)].map((_, i) => a + i)

const onNoSelected = () => {
  firstNoSelected.value = firstNoSelected.value.replace(/\D/g, '')
  secondNoSelected.value = secondNoSelected.value.replace(/\D/g, '')

  if (firstNoSelected.value !== '' && secondNoSelected.value !== '') {
    //
    // if(secondNoSelected.value > items.value.length){
    //   itemPerPage.value = secondNoSelected.value
    // }
    //
    // if(firstNoSelected.value > secondNoSelected.value){
    //   selected = []
    //   return
    // }
    selected.value = generateRange(Number(firstNoSelected.value), Number(secondNoSelected.value))
  }
  else {
    selected.value = []
  }
}


const headers = [
  { title: 'No', key: 'no' },
  { title: 'No. Daftar', key: 'no_daftar', nowrap: true },
  { title: 'Tanggal', key: 'tanggal', nowrap: true },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true },
  { title: 'Jenis Produk & Merek', key: 'jenis_produk', nowrap: true },
  { title: 'Nama Fasilitasi', key: 'nama_fasilitasi', nowrap: true },
  { title: 'Nama Pendamping', key: 'nama_pendamping', nowrap: true },
  { title: 'Catatan', key: 'catatan' },
  { title: 'Status', key: 'status' },
]

const dialog = ref(false)

const buatInvoiceHandler = async () => {
  // console.log("BUAT INVOICE, SELECTED ITEM : ", selected)
  dialog.value = false

  const listSelected = items.value.filter(i => selected.value.includes(i.no_urut)).map(j => j.id)

  const body = {
    id_reg: listSelected,
  }

  try {
    const response = await $api('/lp3h/create-invoice', {
      method: 'post',
      body,
    })

    if (response.code !== 2000) {
      useSnackbar().sendSnackbar(response.message, 'error')
    }
    else {
      selected.value = []
      useSnackbar().sendSnackbar('Berhasil membuat invoice ', 'success')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }

  debouncedFetch(1, itemPerPage.value, selectedFasilitas.value, selectedYear.value, searchQuery.value, selectedJenisFasilitas.value)
}

const loadFasilitasi = async () => {
  try {
    loading.value = true

    const response = await $api('/lp3h/list-fasilitasi', {
      method: 'get',
    })

    const data = response.data

    if (selectedJenisFasilitas.value === 'SEHATI') {
      fasilitas.value = [
        { title: 'BPJPH SEHATI', value: '4e792bfe-b16a-4ce0-8092-42b2185e2789' },
      ]

      selectedFasilitas.value = '4e792bfe-b16a-4ce0-8092-42b2185e2789'

      selectedYear.value = 2025 

      years.value = [{ title: 2025, value: 2025 }]
    }
    else {
      fasilitas.value = [
        { title: 'Semua', value: null },
        ...data.map(i => ({
          title: i.fac_name,
          value: i.fac_id,
        })),
      ]
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const loadListDokumen = async (page: number, limit: number, fac_id: string, tahun: number, search: string, jenis: string) => {
  try {
    await loadFasilitasi()

    loading.value = true

    const response = await $api('/lp3h/list-dokumen', {
      method: 'get',
      params: {
        page,
        limit,
        fac_id,
        tahun,
        search,
        jenis,
      },
    })

    totalItems.value = response.totalItems

    const data = response.data

    items.value = []

    if (data !== null) {
      data.forEach((v, i) => {
        items.value.push({
          no_urut: i + 1,
          id: v.id_reg,
          no_daftar: v.no_daftar,
          tanggal: v.tgl_daftar,
          nama_pu: v.nama_pu,
          jenis_produk: v.jenis_produk,
          nama_fasilitasi: v.fac_name,
          nama_pendamping: v.nama_pendamping,
          catatan: v.catatan,
        })
      })
    }

    // console.log("items : ", items.value)
    loading.value = false
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const debouncedFetch = debounce(loadListDokumen, 500)

const changeFilterByJenisFasilitasi = () => {
  if (selectedJenisFasilitas.value === 'SEHATI') {
    fasilitas.value = [
      { title: 'BPJPH SEHATI', value: '4e792bfe-b16a-4ce0-8092-42b2185e2789' },
    ]

    selectedFasilitas.value = '4e792bfe-b16a-4ce0-8092-42b2185e2789'

    // asdasd
    selectedYear.value = 2025 // Ensure it matches the value type in `years`
    years.value = [{ title: 2025, value: 2025 }]  
  }
  else {
    selectedFasilitas.value = null

    const currentYear = new Date().getFullYear()

    years.value = [
      { title: 'Semua', value: null },
      ...Array.from({ length: currentYear - 2020 }, (_, i) => {
        const year = 2021 + i

        return { title: year.toString(), value: year }
      }),
    ]

    selectedYear.value = null // Ensure it resets properly
  }

  debouncedFetch(
    page.value,
    itemPerPage.value,
    selectedFasilitas.value,
    selectedYear.value,
    searchQuery.value,
    selectedJenisFasilitas.value,
  )
}

const changeFilterBy = () => {
  debouncedFetch(page.value, itemPerPage.value, selectedFasilitas.value, selectedYear.value, searchQuery.value, selectedJenisFasilitas.value)
}

onMounted(async () => {
  await loadFasilitasi()
})
</script>

<template>
  <VContainer>
    <VDialog
      v-model="dialog"
      max-width="700"
    >
      <VCard class="pa-4">
        <VCardTitle>Konfirmasi Buat Invoice </VCardTitle>
        <VCardText>Yakin akan membuat tagihan untuk data data yang di contreng tersebut ?</VCardText>
        <VRow>
          <VCol class="d-flex justify-end ga-4">
            <VBtn
              variant="outlined"
              color="primary"
              @click="dialog = false"
            >
              Batal
            </VBtn>
            <VBtn
              variant="flat"
              color="primary"
              @click="buatInvoiceHandler"
            >
              Ya, Setuju
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">
          Buat Tagihan Ke BPJPH
        </h3>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VCard class="pa-2">
          <VCardTitle class="text-h4 mx-0">
            Daftar Dokumen
          </VCardTitle>
          <VCardItem>
            <VRow class="pa-0">
              <VCol cols="9">
                <VRow>
                  <VCol cols="2">
                    <VMenu
                      v-model="menu"
                      :close-on-content-click="false"
                    >
                      <template #activator="{ props }">
                        <VBtn
                          class="d-flex justify-space-between"
                          v-bind="props"
                          variant="outlined"
                          append-icon="mdi-filter"
                          min-width="130px"
                        >
                          Filter
                        </VBtn>
                      </template>
                      <VCard
                        class="pa-4 text-xs"
                        min-width="400px"
                      >
                        <VLabel
                          for="fasilitas"
                          class="mb-2"
                        >
                          Jenis Fasilitasi
                        </VLabel>
                        <VSelect
                          id="fasilitas"
                          v-model="selectedJenisFasilitas"
                          label=""
                          :items="jenisFasilitas"
                          variant="solo"
                          class="mb-2"
                          @update:model-value="changeFilterByJenisFasilitasi"
                        />
                        <VLabel
                          for="fasilitas"
                          class="mb-2"
                        >
                          Fasilitas
                        </VLabel>
                        <VSelect
                          id="fasilitas"
                          v-model="selectedFasilitas"
                          label=""
                          :items="fasilitas"
                          variant="solo"
                          class="mb-2"
                          @update:model-value="changeFilterBy"
                        />
                        <VLabel
                          for="tahun"
                          class="mb-2"
                        >
                          Tahun Terbit SH
                        </VLabel>
                        <VSelect
                          id="tahun"
                          v-model="selectedYear"
                          label=""
                          :items="years"
                          variant="solo"
                          @update:model-value="changeFilterBy"
                        />
                      </VCard>
                    </VMenu>
                  </VCol>
                  <VCol cols="4">
                    <VTextField
                      v-model="searchQuery"
                      density="compact"
                      placeholder="Cari Dokumen "
                      append-inner-icon="ri-search-line"
                      @input="changeFilterBy"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="firstNoSelected"
                      density="compact"
                      placeholder="Pilih No."
                      @input="onSelectUpdate"
                    />
                  </VCol>
                  <VCol cols="3">
                    <VTextField
                      v-model="secondNoSelected"
                      density="compact"
                      placeholder="Sampai"
                      @input="onSelectUpdate"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="3">
                <VRow>
                  <VCol
                    cols="12"
                    class="d-flex justify-space-between"
                  >
                    <VBtn
                      :disabled="selectOptionDisable"
                      @click="onNoSelected"
                    >
                      Pilih
                    </VBtn>
                    <VBtn
                      append-icon="mdi-file-document"
                      :disabled="selected.length === 0"
                      @click="dialog = true"
                    >
                      Buat Invoice
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCardItem>
          <VCardItem>
            <VDataTableServer
              v-model="selected"
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :headers="headers"
              :items="items"
              item-value="no_urut"
              show-select
              :loading="loading"
              loading-text="Loading..."
              :items-length="totalItems"
              @update:options="loadListDokumen(page, itemPerPage, selectedFasilitas, selectedYear, searchQuery, selectedJenisFasilitas)"
            >
              <template #item.no="{ index }">
                {{ index + 1 }}
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
