<script setup lang="ts">
const snackBar = useSnackbar()

interface AuditPengajuan {
  id_reg: string
  jenis_daftar: string
  jenis_produk: string
  jenis_usaha: string
  jumlah_produk: number
  nama_pu: string
  nomor_daftar: string
  status: string
  tanggal: string
  tgl_dikirim: string
}

interface ApiResponse {
  code: number
  data: AuditPengajuan[]
  message: string
}

interface Payload {
  page: number
  size: number
  search?: string
}

const headers = [
  { title: 'No', value: 'no' },
  { title: 'No. Daftar', key: 'nomor_daftar', nowrap: true },
  { title: 'Tanggal', key: 'tanggal', nowrap: true },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true },
  { title: 'Jenis Daftar', key: 'jenis_daftar', nowrap: true },
  { title: 'Jenis Produk', key: 'jenis_produk', nowrap: true },
  { title: 'Status', key: 'status', nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
]

const items = ref([])

const searchQuery = ref('')
const page = ref(1)
const size = ref(20)

const loadItem = async (page: number, size: number, search: string): void => {
  try {
    const response = await $api('/reguler/auditor', {
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
  if (status === 'Proses di LPH')
    return 'primary'
  else if (status === 'Micre')
    return 'success'

  return 'success'
}

const debouncedFetch = debounce(loadItem, 500)
const handleInput = () => debouncedFetch(1, size.value, searchQuery.value)

// onMounted(
//   await loadItem(1, size.value)
// )
</script>

<template>
  <VContainer>
    <KembaliButton class="pl-0" />
    <h3 class="text-h3">
      Audit Pengajuan
    </h3>
    <br>

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Daftar Pengajuan untuk Dilakukan Audit</span>
      </VCardTitle>
      <VCardItem>
        <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Cari Tagihan"
          append-inner-icon="ri-search-line"
          style="max-inline-size: 100%;"
          @input="handleInput"
        />
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="size"
          v-model:page="page"
          :headers="headers"
          :items="items"
          item-value="no"
          class="elevation-1"
          @update:options="loadItem(page, size, searchQuery)"
        >
          <template #[`item.status`]="{ item }">
            <div class="d-flex">
              <VChip
                :key="index"
                :color="getChipColor(item.status)"
                label
                class="ma-1"
              >
                {{ item.status }}
              </VChip>
            </div>
          </template>
          <template #item.action="{ item }">
            <VIcon
              color="primary"
              style="cursor: pointer;"
              class="ic-center"
              @click="navigateTo(`/audit-pengajuan/${item.id_reg}`)"
            >
              ri-arrow-right-line
            </VIcon>
          </template>
          <template #[`item.no`]="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </VContainer>
</template>

<style lang="scss" scoped>
.ic-center {
  display: flex;
  place-self: center;
}
</style>
