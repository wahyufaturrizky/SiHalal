<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable array-callback-return -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const loading = ref<boolean>(false)
const page = ref<number>(1)
const size = ref<number>(10)
const totalItems = ref<number>(0)
const data = ref<any[]>([])
const listOss = ref<any[]>([])

const headers = [
  { title: 'No', key: 'no' },
  { title: 'Nomor Daftar', key: 'no_daftar', nowrap: true },
  { title: 'Tanggal Daftar', key: 'tgl_daftar', nowrap: true },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true },
  { title: 'Jenis Daftar', key: 'jenis_daftar', nowrap: true },
  { title: 'Jenis Produk', key: 'jenis_produk', nowrap: true },
  { title: 'Status', key: 'newStatus', nowrap: true },
  { title: 'Action', value: 'action', sortable: false, nowrap: true },
]

const getChipColor = (status: string) => {
  if (status === 'Draf')
    return 'primary'
  else if (status === 'Micre')
    return 'success'

  return 'success'
}

const navigateTo = (url: string) => {
  window.location.href = url
}

const loadItem = async (pageNumber: number, sizeData: number, keyword: string = '') => {
  try {
    const response: any = await $api('/reguler/pelaku-usaha', {
      method: 'get',
      params: {
        pageNumber,
        sizeData,
        keyword,
      },
    })

    if (response?.code === 2000) {
      response?.data?.map((item: any) => {
        item.newStatus = [item?.jenis_usaha, item?.jumlah_produk, item.status]
      })
      data.value = response.data
      totalItems.value = response.total_item
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const getListOss = async () => {
  try {
    const response: any = await $api('/reguler/pelaku-usaha/list-oss', {
      method: 'get',
    })

    if (response?.code === 2000)
      listOss.value = response?.data
    else
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
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

const newRegister = async (type: string, id: string) => {
  try {
    const response: any = await $api('/reguler/pelaku-usaha/draft', {
      method: 'post',
      body: {
        type,
        id,
      },
    })

    if (response?.code === 2000) {
      router.push(
        `/audit-pengajuan/${response?.data?.certificate_halal?.id_reg}`,
      )
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const additionalRegister = () => {
}

onMounted(async () => {
  loading.value = true
  await Promise.allSettled([loadItem(page.value, size.value, searchQuery.value), getListOss()])
  loading.value = false
})
</script>

<template>
  <div v-if="loading">
    <VSkeletonLoader
      v-for="i in 1"
      :key="i"
      type="table"
    />
  </div>
  <VContainer v-else-if="!loading">
    <KembaliButton class="no-padding" />
    <h3 class="text-h3">
      Pengajuan Reguler
    </h3>
    <br>

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">Daftar Pengajuan Reguler</span>
        <NewRegulerSertificationHalalDialog
          :new-register="newRegister"
          :additional-register="additionalRegister"
          :data="listOss"
        />
      </VCardTitle>
      <VCardItem>
        <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Cari Data"
          append-inner-icon="ri-search-line"
          style="max-inline-size: 100%"
          @input="handleInput"
        />
      </VCardItem>
      <VCardItem>
        <VDataTable
          :headers="headers"
          :items="data"
          item-value="no"
          class="elevation-1"
          @update:options="loadItem(page, size, searchQuery)"
        >
          <template #item.no="{ index }">
            <label>{{ index + 1 }}</label>
          </template>
          <template #[`item.newStatus`]="{ item }">
            <div class="d-flex">
              <VChip
                v-for="(status, index) in item.newStatus"
                :key="index"
                :color="getChipColor(status)"
                label
                class="ma-1"
              >
                {{ status }}
              </VChip>
            </div>
          </template>
          <template #item.action="{ item }">
            <VIcon
              color="primary"
              style="cursor: pointer"
              class="ic-center"
              @click="navigateTo(`/audit-pengajuan/${item.id_reg}`)"
            >
              ri-arrow-right-line
            </VIcon>
          </template>
        </VDataTable>
      </VCardItem>
    </VCard>
  </VContainer>
</template>

<style lang="scss" scoped>
.ic-center {
  display: flex;
  place-self: center;
}
.no-padding {
  padding-left: 0px !important;
}
</style>
