<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { VDataTableServer } from 'vuetify/components'

defineProps({ mode: String })

const selectAll = ref([])

interface DataItem {
  id: number
  id_daftar: string
  no_daftar: string
  tgl_daftar: string
  nama_pu: string
  alamat: string
  merek_dagang: string
  status: string
  status_code: string
}

const currentPage = ref(1)
const itemPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(false)
const isPenerbitan = ref(false)
const authUser = useMyAuthUserStore()

const permohonanHeaders: any = [
  { title: 'No', key: 'id', sortable: false },
  { title: 'Pilih', key: 'pilih', maxWidth: 60 },
  { title: 'ID Daftar', key: 'id_daftar', nowrap: true },
  { title: 'Nomor Daftar', key: 'no_daftar', nowrap: true },
  { title: 'Tanggal Daftar', key: 'tgl_daftar', nowrap: true },
  { title: 'Nama PU', key: 'nama_pu', nowrap: true },
  { title: 'Alamat', key: 'alamat', nowrap: true },

  // { title: "Merk Dagang", key: "merek_dagang", nowrap: true },
  { title: 'Status', key: 'status' },

  { title: 'Action', key: 'action', align: 'center' },
]

const listData = ref<Array<DataItem>>([])
const selectedItems = ref<string[]>([])

const searchQuery = ref('')

const handleSelectAll = () => {
  if (selectAll.value.length === 1)
    for (const item of listData.value) selectedItems.value.push(item.id_daftar)
  else selectedItems.value = []
}

const isVisible = ref(false)
const openDialog = () => (isVisible.value = true)
const closeDialog = () => (isVisible.value = false)

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => (mdAndUp.value ? 700 : '90%'))

const selectedComitee = ref(null)

const onHandleDistribusi = async () => {
  try {
    const result: any = await $api(
      '/self-declare/verificator/submission/update-status',
      {
        method: 'post',
        body: {
          certificate_id: selectedItems.value,
          user_id: selectedComitee.value,
        },
      } as any,
    )

    if (result.code === 2000) {
      useSnackbar().sendSnackbar('Berhasil Mengdistribusikan Data', 'success')
      refresh()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar(
      'Oops, terjadi kesalahan. Silakan coba kembali',
      'error',
    )
  }

  selectedItems.value = []
  selectedComitee.value = null
  closeDialog()
}

// TODO -> IMPLEMENT FILTER
const onFiltersUpdate = (filter: any) => {
  console.log('UPDATE FILTER : ', filter)
}

const distributeBtnText = computed(() => {
  return selectedItems.value.length
    ? `Distribusi (${selectedItems.value.length})`
    : 'Distribusi'
})

const listProduct = ref([])
const listFasilitas = ref([])
const listLembaga = ref([])
const listPendamping = ref([])
const listComitee = ref<any[]>([])

const selectedProductType = ref()
const selectedFasilitas = ref()
const selectedLembaga = ref()
const selectedPendamping = ref()
const searchBy: Ref<number> = ref(1)

const handleLoadList = async () => {
  loading.value = true

  try {
    const response: any = await $api(
      '/self-declare/verificator/submission/list',
      {
        method: 'get',
        params: {
          jenis_produk: selectedProductType.value,
          fasilitas: selectedFasilitas.value,
          lembaga: selectedLembaga.value,
          pendamping: selectedPendamping.value,
          page: currentPage.value,
          size: itemPerPage.value,
          keyword: searchBy.value === 1 ? searchQuery.value : null,
          no_daftar: searchBy.value === 2 ? searchQuery.value : null,
          is_penerbitan: isPenerbitan.value
        },
      } as any,
    )

    if (response.code === 2000) {
      if (response.data !== null) {
        listData.value = response.data
        currentPage.value = response.current_page
        totalItems.value = response.total_item
      }
      else {
        listData.value = []
        currentPage.value = 1
        totalItems.value = 0
      }
    }

    return response
  }
  catch (error) {
    console.log(error)
  }
  finally {
    loading.value = false
  }
}

const loadItemProduct = async () => {
  try {
    const response: any = await $api('/master/products', {
      method: 'get',
    } as any)

    if (response.length) {
      listProduct.value = response

      return response
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const loadItemFacility = async () => {
  try {
    const response: any = await $api('/master/facility', {
      method: 'get',
    } as any)

    if (response.length) {
      listFasilitas.value = response

      return response
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const loadItemLembaga = async () => {
  try {
    const response: any = await $api('/master/lembaga', {
      method: 'get',
    } as any)

    if (response.length) {
      listLembaga.value = response

      return response
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const loadItemPendamping = async () => {
  try {
    const response: any = await $api('/master/pendamping', {
      method: 'get',
    } as any)

    if (response.length) {
      listPendamping.value = response

      return response
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const handleLoadListComitee = async () => {
  try {
    const response: any = await $api(
      '/self-declare/verificator/submission/list-comitee',
      {
        method: 'get',
      } as any,
    )

    if (response.code === 2000 && response.data)
      listComitee.value = response.data

    return response
  }
  catch (error) {
    console.log(error)
  }
}

const { refresh } = await useAsyncData(
  'comitee-distribution-list',
  async () => handleLoadList(),
  {
    server: false,
    watch: [currentPage, itemPerPage],
  },
)

const batalkanStatusHijau = async (selfDeclareId: string) => {
  try {
    await $api(`/self-declare/verificator/tandai-not-ok/${selfDeclareId}`, {
      method: 'put',
    })

    useSnackbar().sendSnackbar('Batalkan Status Hijau Success', 'success')

    handleLoadList()
  }
  catch (error) {
    console.error('error ', error)
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const handleSearchSubmission = useDebounceFn((val: string) => {
  searchQuery.value = val
  currentPage.value = 1

  refresh()
}, 350)

const handleFilterProductType = (val: string) => {
  selectedProductType.value = val
  currentPage.value = 1

  refresh()
}

const handleFilterFasilitas = (val: string) => {
  selectedFasilitas.value = val
  currentPage.value = 1

  refresh()
}

const handleFilterLembaga = (val: string) => {
  selectedLembaga.value = val
  currentPage.value = 1

  refresh()
}

const handleFilterPendamping = (val: string) => {
  selectedPendamping.value = val
  currentPage.value = 1

  refresh()
}

onMounted(() => {
  loadItemProduct()
  loadItemFacility()
  loadItemLembaga()
  loadItemPendamping()
  handleLoadListComitee()
})
</script>

<template>
  <VRow>
    <VCol>
      <h1 style="font-size: 32px;">
        Verifikasi Self Declare
      </h1>
    </VCol>
  </VRow>
  <br>
  <VCard class="pa-4">
    <VCardTitle class="mb-6 px-2">
      <VRow>
        <VCol cols="10">
          <div class="text-h4 font-weight-bold">
            Data Pengajuan
          </div>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VRow v-if="authUser?.user?.roles?.[0]?.code === 'R.44' && authUser?.user?.pelaku_usaha_id?.Valid">
        <VAlert
          type="warning"
          color="purple"
        >
          Anda tidak memiliki akses untuk mendistribusikan item.
        </VAlert>
      </VRow>
      <VRow v-else>
        <VBtn
          :color="selectedItems.length ? 'primary' : '#A09BA1'"
          @click="selectedItems.length ? openDialog() : null"
        >
          {{ distributeBtnText }}
        </VBtn>
      </VRow>
      <VRow>
        <VCol
          cols="3"
          class="px-0"
        >
          <VRow
            class="ga-4"
            no-gutters
          >
            <div class="border rounded-lg d-flex justify-center align-center pa">
              <VCheckbox
                v-model="selectAll"
                @change="handleSelectAll"
              />
            </div>
            <VMenu :close-on-content-click="false">
              <template #activator="{ props }">
                <VTextField
                  placeholder="Filter"
                  density="compact"
                  rounded="xl"
                  append-inner-icon="mdi-filter"
                  class="cursor-pointer"
                  v-bind="props"
                />
              </template>
              <VCard
                min-width="360px"
                class="mt-2"
              >
                <VCardText>
                  <VRow
                    no-gutters
                    class="mb-3"
                  >
                    <VCol>
                      <div class="text-h6 mb-1">
                        Jenis Produk
                      </div>
                      <VSelect
                        v-model="selectedProductType"
                        density="compact"
                        :items="listProduct"
                        item-title="name"
                        item-value="code"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                        @update:model-value="handleFilterProductType"
                      />
                    </VCol>
                  </VRow>
                  <VRow
                    no-gutters
                    class="mb-3"
                  >
                    <VCol>
                      <div class="text-h6 mb-1">
                        Fasilitas
                      </div>
                      <VSelect
                        v-model="selectedFasilitas"
                        density="compact"
                        :items="listFasilitas"
                        item-title="name"
                        item-value="id"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                        @update:model-value="handleFilterFasilitas"
                      />
                    </VCol>
                  </VRow>
                  <VRow
                    no-gutters
                    class="mb-3"
                  >
                    <VCol>
                      <div class="text-h6 mb-1">
                        Lembaga
                      </div>
                      <VSelect
                        v-model="selectedLembaga"
                        density="compact"
                        :items="listLembaga"
                        item-title="name"
                        item-value="id"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                        @update:model-value="handleFilterLembaga"
                      />
                    </VCol>
                  </VRow>
                  <VRow
                    no-gutters
                    class="mb-3"
                  >
                    <VCol>
                      <div class="text-h6 mb-1">
                        Pendamping
                      </div>
                      <VSelect
                        v-model="selectedPendamping"
                        density="compact"
                        :items="listPendamping"
                        menu-icon="fa-chevron-down"
                        rounded="xl"
                        placeholder="Semua"
                        clearable
                        @update:model-value="handleFilterPendamping"
                      />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VMenu>
            <!--
              <DistribusiKomiteSelfDeclareTableFilter
              @updateFilter="onFiltersUpdate"
              />
            -->
          </VRow>
        </VCol>
        <!--
          <VCol class="d-flex justify-sm-space-between align-center" cols="9">
          <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Cari Nama Pengajuan"
          append-inner-icon="ri-search-line"
          style="max-inline-size: 100%"
          @update:model-value="handleSearchSubmission"
          clearable
          />
          </VCol>
        -->
      </VRow>
      <VRow>
        <VCol
          v-if="authUser?.user?.roles?.[0]?.code === 'R.7'"
          cols="12"
        >
          <div>
            <div class="mb-2">
              Keranjang Khusus
            </div>
            <VCheckbox
              v-model="isPenerbitan"
              label="Check untuk melihat data dari LP3H"
              hide-details
              @change="refresh"
            />
          </div>
        </VCol>
        <VCol cols="12">
          <VRadioGroup
            v-model="searchBy"
            inline
            label="Cari berdasarkan:"
          >
            <VRadio
              label="Nama PU"
              :value="1"
            />
            <VRadio
              label="No Daftar"
              :value="2"
            />
          </VRadioGroup>
          <br>
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Cari Nama Pengajuan"
            append-inner-icon="ri-search-line"
            style="max-inline-size: 100%;"
            clearable
            @update:model-value="handleSearchSubmission"
          />
        </VCol>
      </VRow>
      <VRow>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="currentPage"
          disable-sort
          :items-per-page-options="[10, 25, 50, 100]"
          class="custom-table"
          :headers="permohonanHeaders"
          :items="listData"
          :loading="loading"
          :items-length="totalItems"
          loading-text="Loading..."
        >
          <template #item.id="{ index }">
            {{ index + 1 + (currentPage - 1) * itemPerPage }}
          </template>
          <template #item.no_daftar="{ item }">
            {{ item.no_daftar ? item.no_daftar : "-" }}
          </template>
          <template #item.tgl_daftar="{ item }">
            {{ item.tgl_daftar ? formatDateId(item.tgl_daftar) : "-" }}
          </template>
          <template #item.nama_pu="{ item }">
            {{ item.nama_pu ? item.nama_pu : "-" }}
          </template>
          <template #item.alamat="{ item }">
            {{ item.alamat ? item.alamat : "-" }}
          </template>
          <!--
            <template #item.merek_dagang="{ item }">
            {{ item.merek_dagang ? item.merek_dagang : "-" }}
            </template>
          -->
          <!--
            <template #item.status="{ item }">
            {{ item.status ? item.status : "-" }}
            </template>
          -->
          <template #item.pilih="{ item }">
            <VCheckbox
              v-model="selectedItems"
              :value="item.id_daftar"
            />
          </template>
          <template #item.status="{ item }">
            <!--
              <div v-if="item.status === 'OF74'">
              <div class="status-container">
              <VChip
              variant="outlined"
              style="
              border-color: #49a84c;
              border-radius: 8px;
              background-color: #edf6ed;
              "
              >
              <span style="color: #49a84c">
              {{ item.status_code }}
              </span>
              </VChip>
              </div>
              </div>
            -->
            <!-- <div> -->
            <div class="status-container">
              <VChip
                variant="outlined"
                style="
                  border-color: #652672;
                  border-radius: 8px;
                  background-color: #f0e9f1;
"
              >
                <span style="color: #652672;">
                  {{ item.status }}
                </span>
              </VChip>
            </div>
            <!-- </div> -->
          </template>
          <template #item.action="{ item }">
            <div class="d-flex gap-1">
              <IconBtn size="small">
                <VIcon
                  icon="mdi-close"
                  color="danger"
                  @click="batalkanStatusHijau((item as any).id_daftar)"
                />
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Batalkan Status Hijau
                </VTooltip>
              </IconBtn>
            </div>
          </template>
        </VDataTableServer>
      </VRow>
      <!-- <VPagination v-model="page" :total-visible="7" :length="totalPages" /> -->
    </VCardText>
  </VCard>

  <VDialog
    v-model="isVisible"
    :max-width="dialogMaxWidth"
    location="top"
  >
    <VCard class="pa-4">
      <VCardTitle class="px-2 font-weight-bold">
        Distribusi
      </VCardTitle>
      <VCardItem class="px-2 mb-4">
        <VLabel for="proses">
          Proses Distribusi Untuk Data Data Yang Dipilih
        </VLabel>
        <VSelect
          id="proses"
          v-model="selectedComitee"
          placeholder="Pilih Proses Distribusi"
          :items="listComitee"
          item-title="name"
          item-value="user_id"
        >
          <template #item="{ props, item }">
            <VListItem
              v-bind="props"
              :title="item.raw.name"
              :subtitle="item.raw.username"
            />
          </template>
          <template #selection="{ item }">
            <p>{{ `${item.raw.name} - ${item.raw.username}` }}</p>
          </template>
        </VSelect>
      </VCardItem>
      <VCardActions class="d-flex justify-end ga-4">
        <VBtn
          variant="outlined"
          min-width="100px"
          @click="[closeDialog(), (selectedComitee = null)]"
        >
          Batal
        </VBtn>
        <VBtn
          min-width="100px"
          variant="flat"
          @click="onHandleDistribusi"
        >
          Simpan
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
.text-center {
  text-align: center;
}

.text-success {
  color: #4caf50;
}

.text-error {
  color: #e53935;
}

.text-primary {
  color: #1976d2;
}

.text-decoration-underline {
  text-decoration: underline;
}

custom-v-checkbox {
  --v-checkbox-size: 24px; /* Set size for outer box */
}

.custom-v-checkbox .v-checkbox__input {
  border: 2px solid #ccc !important; /* Outline border */
  border-radius: 6px; /* Rounded corners */
}

.custom-v-checkbox .v-checkbox__input::before {
  border: 2px solid transparent !important; /* Inner box border */
  background: transparent !important;
  block-size: 16px !important;
  inline-size: 16px !important; /* Inner box size */
}

.custom-v-checkbox .v-checkbox__input--indeterminate::before,
.custom-v-checkbox .v-checkbox__input--checked::before {
  border-color: #000 !important; /* Inner box color */
  background: #ccc !important;
}
</style>
