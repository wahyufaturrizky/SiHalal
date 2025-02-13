<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const tableHeaders: any[] = [
  { title: 'No', key: 'no', sortable: false },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.daftar'), key: 'registration_no', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.date'), key: 'date', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.pu-name'), key: 'name', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.city'), key: 'city', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.product-type'), key: 'product_type', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.market-brand'), key: 'market_brand', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.market-area'), key: 'market_area', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.business-scale'), key: 'business_scale', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.lph-name'), key: 'lph_name', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.determination-no'), key: 'determination_no', nowrap: true },
  { title: t('task-force.tagihan-bpjph-buat-tagihan-table-key.determination-date'), key: 'determination_date', nowrap: true },
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
const totalData = ref(30)

const filterData = ref({
  serviceType: {
    name: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.service-type')}`,
    code: '',
  },
  pelakuUsaha: {
    name: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.pelaku-usaha')}`,
    code: '',
  },
  facility: {
    name: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.facility')}`,
    code: '',
  },
  year: {
    name: `Pilih ${t('task-force.tagihan-bpjph-buat-tagihan-filter.year')}`,
    code: '',
  },
})

const bulkCheck = ref({
  start: '',
  end: '',
})

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
        tableItems.value = [
          {
            id: 1,
            registration_no: 'sh-1',
            date: '2025-01-01',
            name: 'a',
            city: 'jakarta',
            product_type: 'ok',
            market_brand: 'area pemasaran',
            market_area: 'Depok',
            business_scale: 'Nasional',
            lph_name: 'LPH 1',
            determination_no: '111',
            determination_date: '2025-02-02',
          },
          {
            id: 2,
            registration_no: 'sh-1',
            date: '2025-01-01',
            name: 'a',
            city: 'jakarta',
            product_type: 'ok',
            market_brand: 'area pemasaran',
            market_area: 'Depok',
            business_scale: 'Nasional',
            lph_name: 'LPH 1',
            determination_no: '111',
            determination_date: '2025-02-02',
          },
          {
            id: 3,
            registration_no: 'sh-1',
            date: '2025-01-01',
            name: 'a',
            city: 'jakarta',
            product_type: 'ok',
            market_brand: 'area pemasaran',
            market_area: 'Depok',
            business_scale: 'Nasional',
            lph_name: 'LPH 1',
            determination_no: '111',
            determination_date: '2025-02-02',
          },
          {
            id: 4,
            registration_no: 'sh-1',
            date: '2025-01-01',
            name: 'a',
            city: 'jakarta',
            product_type: 'ok',
            market_brand: 'area pemasaran',
            market_area: 'Depok',
            business_scale: 'Nasional',
            lph_name: 'LPH 1',
            determination_no: '111',
            determination_date: '2025-02-02',
          },
          {
            id: 5,
            registration_no: 'sh-1',
            date: '2025-01-01',
            name: 'a',
            city: 'jakarta',
            product_type: 'ok',
            market_brand: 'area pemasaran',
            market_area: 'Depok',
            business_scale: 'Nasional',
            lph_name: 'LPH 1',
            determination_no: '111',
            determination_date: '2025-02-02',
          },
        ]
        currentPage.value = response.current_page
        totalItems.value = response.total_item
      }
      else {
        // tableItems.value = []
        currentPage.value = 1
        totalItems.value = 0
      }

      return response
    }
    else {
      // tableItems.value = []
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

const handleCheck = async () => {
  if (bulkCheck.value.start > bulkCheck.value.end)
    return null

  const arr: [] = []

  tableItems.value.map((item: any, index: number) => {
    if (index >= bulkCheck.value.start - 1 && index <= bulkCheck.value.end - 1)
      arr.push(item.id)

    return true
  })

  return selectedItem.value = arr
}

onMounted(async () => {
  await Promise.allSetled([
    handleLoadList(),
    getMasterLembaga(),
  ])
})

const getChipColor = (status: string) => {
  if (status === 'Terbayar')
    return 'success'

  return 'primary'
}

const unduhFile = async (link: string) => {
  await downloadDocument(link, 'FILES')
}

const onApprove = async () => {
  console.log(selectedItem.value)
}
</script>

<template>
  <VRow>
    <VCol>
      <h2 style="font-size: 32px">
        {{ t('task-force.tagihan-bpjph-title') }}
      </h2>
    </VCol>
  </VRow>
  <VRow>
    <div class="w-100 mt-5 px-5">
      <div class="d-flex gap-5">
        <div class="w-50">
          <label>{{ t('task-force.tagihan-bpjph-buat-tagihan-filter.service-type') }}</label>
          <VSelect
            v-model="filterData.serviceType"
            :value="filterData.serviceType"
            :items="[
              { name: 'Reguler', code: 'reg' },
              { name: 'Fasilitasi', code: 'fas' },
            ]"
            class="-mt-10"
            item-title="name"
            item-value="code"
            style="background-color: white;"
          />
        </div>
        <div class="w-50">
          <label>{{ t('task-force.tagihan-bpjph-buat-tagihan-filter.pelaku-usaha') }}</label>
          <VSelect
            v-model="filterData.pelakuUsaha"
            :value="filterData.pelakuUsaha"
            :items="[
              { name: 'Dalam Negri', code: 'dn' },
              { name: 'Luar Negri', code: 'ln' },
            ]"
            class="-mt-10"
            item-title="name"
            item-value="code"
            style="background-color: white;"
          />
        </div>
      </div>
      <div class="d-flex gap-5 mt-5">
        <div class="w-50">
          <label>{{ t('task-force.tagihan-bpjph-buat-tagihan-filter.facility') }}</label>
          <VSelect
            v-model="filterData.facility"
            :value="filterData.facility"
            :items="[
              { name: 'Reguler', code: 'reg' },
              { name: 'Fasilitasi', code: 'fas' },
            ]"
            class="-mt-10"
            item-title="name"
            item-value="code"
            style="background-color: white;"
          />
        </div>
        <div class="w-50">
          <label>{{ t('task-force.tagihan-bpjph-buat-tagihan-filter.year') }}</label>
          <VSelect
            v-model="filterData.year"
            :value="filterData.year"
            :items="[
              { name: 'Dalam Negri', code: 'dn' },
              { name: 'Luar Negri', code: 'ln' },
            ]"
            class="-mt-10"
            item-title="name"
            item-value="code"
            style="background-color: white;"
          />
        </div>
      </div>
      <div class="mt-5" style="display: flex; justify-self: end;">
        <VBtn
          :disabled="!bulkCheck.start || !bulkCheck.end || (+bulkCheck.start > +bulkCheck.end)"
          @click="handleCheck"
        >
          {{ t('task-force.tagihan-bpjph-buat-tagihan-filter.btn-filter') }}
        </VBtn>
      </div>
    </div>
  </VRow>
  <VRow>
    <VCol>
      <VCard class="w-100 py-3">
        <VCardTitle>
          <div>
            <div class="d-flex w-100 font-weight-bold text-h4" style="justify-content: space-between;">
              {{ t('task-force.tagihan-bpjph-buat-tagihan-table.title') }}
              <p class="common-text">
                {{ t('task-force.tagihan-bpjph-buat-tagihan-table.total-data') }}
                <span>
                  : {{ totalData }}
                </span>
              </p>
            </div>
          </div>
        </VCardTitle>
        <VCardItem>
          <div
            class="d-flex w-100 mb-5"
            style="justify-content: space-between;"
          >
            <div class="d-flex gap-5" style="max-height: 40px;">
              <VTextField
                v-model="bulkCheck.start"
                density="compact"
                placeholder="pilih no"
                style="min-width: 110px; max-height: 40px;"
                @input="onlyAcceptNumber"
              />
              <VTextField
                v-model="bulkCheck.end"
                density="compact"
                placeholder="sampai"
                style="min-width: 110px; max-height: 40px;"
                @input="onlyAcceptNumber"
              />
              <VBtn
                :disabled="!bulkCheck.start || !bulkCheck.end || (+bulkCheck.start > +bulkCheck.end)"
                @click="handleCheck"
              >
                {{ t('task-force.tagihan-bpjph-buat-tagihan-table.btn-pilih') }}
              </VBtn>
            </div>
            <CreateInvoice
              :disabled="selectedItem.length === 0"
              :onApprove="onApprove"
            />
          </div>
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
              hover
              show-select
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
            </VDataTableServer>
          </VCard>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
.common-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: '#2C222E';
  margin-top: 10px;
}
</style>
