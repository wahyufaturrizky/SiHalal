<script setup lang="ts">
interface DataUser {
  id: string
  username: string
  nama: string
  email: string
  password?: string
  phone_no: string
  is_verify: boolean
  roles: Array<{ name: string }>
}

const tableHeaders: any[] = [
  { title: 'No', key: 'no', sortable: false },
  { title: 'NIK', key: 'nik', nowrap: true },
  { title: 'Nama', key: 'nama', nowrap: true },
  { title: 'Angkatan', key: 'angkatan', nowrap: true },
  { title: 'Nama Lembaga', key: 'nama_lebaga', nowrap: true },
  { title: 'No. Invoice', key: 'no_invoice', nowrap: true },
  { title: 'Status', key: 'status', nowrap: true },
  { title: 'Sertifikat', key: 'actions', sortable: false, align: 'center' },
]

const tableItems = ref<Array[]>([])
const lembagaItems = ref<Array[]>([])
const currentPage = ref(1)
const itemPerPage = ref(10)
const totalItems = ref(0)
const selectedItem = ref([])
const isLoading = ref(false)
const isLoadingLembaga = ref(false)
const tableType = ref('')

const handleLoadList = async () => {
  try {
    const response: any = await $api('/approval/juleha/list', {
      method: 'get',
      query: {
        page: currentPage.value,
        size: itemPerPage.value,
        keyword: tableType.value,
      },
    } as any)

    if (response.code === 2000) {
      if (response.data !== null) {
        tableItems.value = response.data
        currentPage.value = response.current_page
        totalItems.value = response.total_item
      }
      else {
        tableItems.value = []
        currentPage.value = 1
        totalItems.value = 0
      }

      return response
    }
    else {
      tableItems.value = []
      currentPage.value = 1
      totalItems.value = 0
    }
  }
  catch (error) {
    console.error(error)
  }
}

const getMasterLembaga = async () => {
  try {
    isLoadingLembaga.value = true

    const response: any = await $api('/approval/lembaga', {
      method: 'get',
    } as any)

    if (response.code === 2000) {
      if (response.data !== null) {
        response.data.unshift({ nama_lebaga: 'Semua', id_lembaga_pelatihan: '' })
        lembagaItems.value = response.data
      }
      isLoadingLembaga.value = false

      return response
    }
  }
  catch (error) {
    isLoadingLembaga.value = false
    console.error(error)
  }
}

const { refresh } = await useAsyncData(
  'user-list',
  async () => await handleLoadList(),
  {
    watch: [currentPage, itemPerPage, tableType],
  },
)

onMounted(async () => {
  await Promise.allSetled([
    handleLoadList(),
    getMasterLembaga(),
  ])
})

const getChipColor = (status: string) => {
  if (status === 'lunas')
    return 'success'

  return 'primary'
}

const onApprove = async () => {
  try {
    const response: any = await $api(
      '/approval/juleha/approve',
      {
        method: 'post',
        body: selectedItem.value,
      },
    )

    if (response.code !== 2000) {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
      refresh()

      return
    }
    const totalError = response?.message?.errors
    const totalSuccess = response?.message?.success
    const message: any[] = []
    if (totalError > 0)
      message.push(`Gagal setujui sebanyak ${totalError}`)
    if (totalSuccess > 0)
      message.push(`Sukses setujui sebanyak ${totalSuccess}`)
    useSnackbar().sendSnackbar(`Pendamping ${message.join()}`, 'success')
    refresh()
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const unduhFile = async (link: string) => {
  await downloadDocument(link)
}
</script>

<template>
  <VRow>
    <VCol>
      <h2 style="font-size: 32px">
        Persetujuan Sertifikat Juleha Lembaga Pelatihan
      </h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle class="d-flex justify-space-between align-center font-weight-bold text-h4">
          <div>List Persetujuan Sertifikat Juleha Lembaga Pelatihan</div>
          <DialogApprovalData
            title="Persetujui data"
            button-text="Ya, Setujui"
            :on-approve="onApprove"
            :disabled="selectedItem.length === 0"
          >
            <template #contentDelete>
              Anda yakin setujui {{ selectedItem.length }} data ?
            </template>
          </DialogApprovalData>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="tableType"
                :items="lembagaItems"
                item-title="nama_lebaga"
                item-value="id_lembaga_pelatihan"
                class="mb-5"
                :loading="isLoadingLembaga"
                :disabled="isLoadingLembaga"
              />
            </VCol>
          </VRow>
          <VCard variant="outlined">
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="currentPage"
              v-model="selectedItem"
              :items-length="totalItems"
              class="custom-table"
              :headers="tableHeaders"
              :items="tableItems"
              :loading="isLoading"
              :hide-default-footer="tableItems.length === 0"
              show-select
              hover
            >
              <template #no-data>
                <VCard
                  variant=""
                  class="w-full mt-7 mb-5"
                >
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
                </VCard>
              </template>
              <template #item.no="{ index }">
                {{ index + 1 + (currentPage - 1) * itemPerPage }}
              </template>
              <template #item.phone_no="{ item }">
                {{ item.phone_no ? item.phone_no : "-" }}
              </template>
              <template #item.is_verify="{ item }">
                {{ item.is_verify ? "Yes" : "No" }}
              </template>
              <template #item.roles="{ item }">
                <div v-if="item.roles.length">
                  <div
                    v-for="(el, idx) in item.roles"
                    :key="idx"
                    class="d-inline-block"
                  >
                    <div>
                      <span
                        v-if="idx !== 0"
                        class="mx-2"
                      >|</span>{{ el.name }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  -
                </div>
              </template>
              <template #item.status="{ item }">
                <div class="d-flex flex-wrap">
                  <VChip
                    :key="item.id"
                    :color="getChipColor('lunas')"
                    label
                    class="ma-1"
                  >
                    Lunas
                  </VChip>
                </div>
              </template>
              <template #item.actions="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <div>
                      <VIcon
                        icon="ri-arrow-right-line"
                        color="primary"
                        @click="() => unduhFile(item.file_sertifikat)"
                      />
                    </div>
                  </IconBtn>
                <!-- Right arrow icon for action -->
                </div>
              </template>
            </VDataTableServer>
          </VCard>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
      justify-items: center,
    }
  }
}
</style>
