<script setup lang="ts">
// const tableHeader = [
//   { title: 'No', value: 'no' },
//   { title: 'No. Daftar', value: 'regist_no' },
//   { title: 'Tanggal Daftar', value: 'regist_date' },
//   { title: 'Nama PU', value: 'pu_name' },
//   { title: 'Alamat', value: 'address' },
//   { title: 'Jenis Usaha', value: 'kind' },
//   { title: 'Skala Usaha', value: 'scale' },
//   { title: 'Merk Dagang', value: 'brand' },
//   { title: 'Status', value: 'status' },
//   { title: 'Action', value: 'action' },
// ]

interface Payload {
  page: number
  size: number
  search?: string
}
const searchQuery = ref('')
const page = ref(1)
const size = ref(10)

const headers = [
  { title: 'No', value: 'no' },
  { title: 'No. Daftar', key: 'no_daftar', nowrap: true },
  { title: 'Tanggal Daftar', key: 'tgl_daftar', nowrap: true },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true },
  { title: 'Alamat', key: 'alamat_pu', nowrap: true },
  { title: 'Jenis Usaha', key: 'jenis_usaha', nowrap: true },
  { title: 'Skala Usaha', key: 'skala_usaha', nowrap: true },
  { title: 'Merk Dagang', key: 'merek_dagang', nowrap: true },
  { title: 'Status', key: 'status', nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
]

// const handleInput = () => debouncedFetch(1, size.value, searchQuery.value)

// const items = [
//   {
//     id: 1,
//     regist_no: 'ss',
//     regist_date: 'xx',
//     pu_name: 'xx',
//     address: 'xx',
//     kind: 'xx',
//     scale: 'xx',
//     brand: 'xx',
//     status: 'success',
//   },
// ]
const items = ref([])

// const getStatusColor = (status: string) => {
//   switch (status.toLowerCase()) {
//     case 'lunas':
//       return 'success'
//   case 'pending':
//       return 'warning'
//   case 'telat':
//       return 'error'
//   default:
//       return 'grey'
//   }
// }

const loadItem = async (page: number, size: number, search: string): void => {
  try {
    const response = await $api('self-declare/proses-verval/list', {
      method: 'GET',
      params: { page, size, search },
    })

    if (response.code === 2000)
      items.value = response.data
  }
  catch (e) {
    snackBar.sendSnackbar('Terjadi Kesalahan ', 'error')
  }
}

// TODO -> BIKIN LOGIC BUAT SET CHIP COLOR
const getChipColor = (status: string) => {
  if (status === '')
    return 'primary'
  else if (status === 'Pengajuan')
    return 'success'

  return 'success'
}

const debouncedFetch = debounce(loadItem, 500)
const handleInput = () => debouncedFetch(1, size.value, searchQuery.value)
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h2>Proses Verval</h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle><h3>Data Proses Verval</h3></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="7">
              <VTextField
                v-model="searchQuery"
                density="compact"
                placeholder="Cari Tagihan"
                append-inner-icon="ri-search-line"
                style="max-inline-size: 100%;"
                @input="handleInput"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VDataTable
                v-model:items-per-page="size"
                v-model:page="page"
                :headers="headers"
                :items="items"
                item-value="no"
                class="elevation-1"
                @update:options="loadItem(page, size, searchQuery)"
              >
                <template #[`item.no`]="{ index }">
                  <span>{{ index + 1 }}</span>
                </template>

                <template #[`item.status`]="{ item }">
                  <div class="d-flex">
                    <VChip
                      :key="index"
                      :color="getChipColor(item.status)"
                      label
                      class="ma-1"
                    >
                      <!-- {{ item.status }} -->
                      OF10
                    </VChip>
                  </div>
                </template>
                <template #item.action="{ item }">
                  <VIcon
                    color="primary"
                    style="cursor: pointer;"
                    class="ic-center"
                    @click="navigateTo(`/pengajuan/detail-verval/${item.id_reg}`)"
                  >
                    ri-arrow-right-line
                  </VIcon>
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
