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
  { title: 'Jenis Pendaftaran', key: 'jenis', nowrap: true },
  { title: 'No. Registrasi', key: 'no_registrasi', nowrap: true },
  { title: 'Tanggal Registrasi', key: 'tgl_registrasi', nowrap: true },
  { title: 'Nama Auditor/LPH', key: 'nama_auditor', nowrap: true },
  { title: 'Jenis Kelamin', key: 'jenkel', nowrap: true },
  { title: 'Pendidikan', key: 'jenjang_didik', nowrap: true },
  { title: 'Status Payment', key: 'status_payment', nowrap: true },
  { title: 'Tanggal Bayar', key: 'tgl_bayar', nowrap: true },
  { title: 'invoice', key: 'file_inv', nowrap: true },
  { title: 'Draft Sertifikat', key: 'file_draft', sortable: false},
]

const tableItems = ref<Array[]>([])
const currentPage = ref(1)
const itemPerPage = ref(10)
const totalItems = ref(0)
const selectedItem = ref([])
const isLoading = ref(false)
const tableType = ref('')

const searchQuery = ref('')

const handleLoadList = async () => {
  try {
    const response: any = await $api('/approval/auditor-halal/list', {
      method: 'get',
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
        search: searchQuery.value,
      },
    } as any)

    if (response.code === 2000) {
      if (response.data !== null) {
        response.data.map((el: any) => el.id = el.auditor_id)
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
  }
  catch (error) {
    console.error(error)
  }
}

const { refresh } = await useAsyncData(
  'user-list',
  async () => await handleLoadList(),
  {
    watch: [currentPage, itemPerPage],
  },
)

const onApprove = async () => {
  try {
    const response: any = await $api(
      '/approval/auditor-halal/approve',
      {
        method: 'post',
        body: {
          id: selectedItem.value,
        },
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
    useSnackbar().sendSnackbar(`Asesor ${message.join()}`, totalSuccess > 0 ? 'success' : 'error')
    refresh()
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(() => {
  handleLoadList()
})

const getChipColor = (status: string) => {
  if (status === 'lunas')
    return 'success'

  return 'primary'
}

const unduhFile = async (path: string) => {
  await downloadDocument(path, 'SERT')
}
</script>

<template>
  <VRow>
    <VCol>
      <h2 style="font-size: 32px">
        Registrasi Auditor Halal
      </h2>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle class="d-flex justify-space-between align-center font-weight-bold text-h4">
          <div>List Registrasi Auditor Halal</div>
          <DialogApprovalData
            title="Persetujui data"
            button-text="Ya, Setujui"
            :on-approve="onApprove"
            :disabled="selectedItem.length === 0"
          >
            <template #contentDelete>
              Anda yakin setujui {{selectedItem.length}} data ?
            </template>
          </DialogApprovalData>
        </VCardTitle>
        <VCardItem>
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
              <template #item.tgl_registrasi="{ item }">
                <div v-if="item.tgl_registrasi">
                  {{ formatDateId(item.tgl_registrasi) }}
                </div>
              </template>
              <template #item.tgl_bayar="{ item }">
                <div v-if="item.tgl_bayar">
                  {{ formatDateId(item.tgl_bayar) }}
                </div>
              </template>
              <template #item.jenkel="{ item }">
                {{ item.jenkel === 'L' ? 'Laki-laki' : 'Perempuan' }}
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
              <template #item.file_inv="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <div>
                      <VIcon
                        icon="fa-file"
                        color="primary"
                        @click="() => unduhFile(item.file_inv)"
                      />
                    </div>
                  </IconBtn>
                <!-- Right arrow icon for action -->
                </div>
              </template>
              <template #item.file_draft="{ item }">
                <div class="d-flex gap-1">
                  <IconBtn size="small">
                    <div>
                      <VIcon
                        icon="fa-file"
                        color="primary"
                        @click="() => unduhFile(item.file_draft)"
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
      inset-inline-end: 0;
      width: auto;
    }

    tbody > tr > td:last-of-type {
      background: white;
      inset-inline-end: 0;
      justify-items: center,
    }
  }
}
</style>
