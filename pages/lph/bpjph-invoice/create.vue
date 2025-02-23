<!-- eslint-disable regex/invalid -->
<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay()
const isLoading = ref<boolean>(false)
const tableItems = ref<any[]>([])
const totalItems = ref<number>(0);
const currentPage = ref<number>(1)
const itemPerPage = ref<number>(10)

const totalData = computed(() => +totalItems.value)

const invoiceHeader: any[] = [
  { title: 'No', value: 'index' },
  { title: 'No. Daftar', value: 'no_daftar', nowrap: true },
  { title: 'Tanggal', value: 'tanggal_daftar', nowrap: true },
  { title: 'Nama PU', value: 'nama_pu', nowrap: true },
  { title: 'Jenis Produk & Merek', key: 'jenis_produk' , nowrap: true },
  { title: 'Jumlah', key: 'jumlah', nowrap: true },
  { title: 'Bank', value: 'bank', nowrap: true },
  { title: 'Channel ID', value: 'channel_id', nowrap: true },
]

const regisTypeList = ref([
  {
    title: 'Reguler',
    value: 'CH001'
  },
  {
    title: 'Fasilitasi',
    value: 'CH002'
  }
])
const yearList = ref<string[]>([])
const loadYearList = () => {
  const currentYear = new Date().getFullYear()
  for (let year = 2021; year <= currentYear; year++) {
    yearList.value.push(`${year}`)
  }
}

const selectedRegType = ref()
const selectedYear = ref<null | string>(null)
const searchQuery = ref<string>("");

const loadItem = async () => {
  isLoading.value = true
  try {
    const response: any = await $api('/reguler/lph/bpjph-bill/list-doc', {
      method: 'get',
      params: {
        page: currentPage.value,
        size: itemPerPage.value,
        channel: selectedRegType.value,
        year: selectedYear.value,
        search: searchQuery.value,
      },
    } as any)

    if (response?.code === 2000) {
      tableItems.value = response?.data
      currentPage.value = response?.current_page;
      totalItems.value = +response?.total_item;
    } else {
      tableItems.value = [];
      currentPage.value = 1;
      totalItems.value = 0;
    }
    isLoading.value = false
    return response
  }
  catch (error) {
    useSnackbar().sendSnackbar("Oops, terjadi kesalahan. Silakan coba kembali", 'error')
    isLoading.value = false
  }
}

const { refresh } = await useAsyncData(
  "bpjph-bill-doc-list",
  async () => await loadItem(),
  {
    watch: [currentPage, itemPerPage],
  }
);

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value).replace(/^Rp\s?/gi, '');
};

const handleFilterRegType = useDebounceFn((val: string) => {
  selectedRegType.value = val;
  currentPage.value = 1;

  refresh();
}, 350);
const handleFilterYear = useDebounceFn((val: string) => {
  selectedYear.value = val;
  currentPage.value = 1;

  refresh();
}, 350);

const handleSearchDoc = useDebounceFn((val: string) => {
  searchQuery.value = val;
  currentPage.value = 1;

  refresh();
}, 350);

const firstIndex = ref<number | null>(null)
const lastIndex = ref<number | null>(null)
const selectedDoc = ref<Array<string>>([]);

const handleChooseNumbers = () => {
  const startIndex = firstIndex.value ? firstIndex.value - 1 : 0
  let endIndex = 0
  if (lastIndex.value) {
    if (lastIndex.value - 1 > tableItems.value.length - 1) {
      endIndex = tableItems.value.length - 1
    } else if (lastIndex.value - 1 < startIndex) {
      endIndex = startIndex
    } else {
      endIndex = lastIndex.value - 1
    }
  }

  firstIndex.value = null
  lastIndex.value = null
  for (let index = startIndex; index <= endIndex; index++) {
    const docs = tableItems.value[index];
    selectedDoc.value.push(docs.id_reg)
  }
}

const isOpenModal = ref(false);
const handleOpenModal = () => {
  isOpenModal.value = !isOpenModal.value;
};
const handleConfirmCreate = async () => {
  try {
    const response: any = await $api('/reguler/lph/bpjph-bill/create', {
      method: 'post',
      body: {
        id_reg: selectedDoc.value
      }
    } as any)

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil membuat invoice", "success");
      selectedDoc.value = []
      refresh()
    } else {
      useSnackbar().sendSnackbar("Oops, terjadi kesalahan. Silakan coba kembali", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Oops, terjadi kesalahan. Silakan coba kembali", "error");
  }
}

onMounted(() => {
  loadYearList()
})
</script>

<template>
  <VRow no-gutters>
    <VCol>
      <h1 style="font-size: 32px">
        Buat Tagihan ke BPJPH
      </h1>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle class="my-3 d-flex justify-space-between align-center">
          <div class="w-100 d-flex align-center justify-space-between">
            <div class="text-h4 font-weight-bold">
              Daftar Dokumen
            </div>
            <ClientOnly>
              Jumlah Data: {{ totalData }}
            </ClientOnly>
          </div>
        </VCardTitle>
        <VCardItem class="py-0">
          <VRow no-gutters class="gap-3">
            <VCol cols="2">
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
                <VCard min-width="360px" class="mt-2">
                  <VCardText>
                    <VRow no-gutters class="mb-3">
                      <VCol>
                        <div class="text-h6 mb-1">Jenis Layanan</div>
                        <VSelect
                          placeholder="Cari Jenis Layanan"
                          @update:model-value="handleFilterRegType"
                          v-model="selectedRegType"
                          :items="regisTypeList"
                          item
                          density="compact"
                          menu-icon="fa-chevron-down"
                          rounded="lg"
                          clearable
                        />
                      </VCol>
                    </VRow>
                    <VRow no-gutters class="mb-3">
                      <VCol>
                        <div class="text-h6 mb-1">Tahun</div>
                        <VSelect
                          placeholder="Semua"
                          @update:model-value="handleFilterYear"
                          v-model="selectedYear"
                          :items="yearList"
                          density="compact"
                          menu-icon="fa-chevron-down"
                          rounded="lg"
                          clearable
                        />
                      </VCol>
                    </VRow>
                  </VCardText>
                </VCard>
              </VMenu>
            </VCol>
            <VCol cols="3">
              <VTextField
                @update:model-value="handleSearchDoc"
                v-model="searchQuery"
                placeholder="Cari No. Daftar / Nama PU"
                density="compact"
                append-inner-icon="mdi-magnify"
                rounded="xl"
                clearable
              />
            </VCol>
            <VCol cols="1">
              <VTextField
                v-model="firstIndex"
                placeholder="Pilih No."
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="1">
              <VTextField
                v-model="lastIndex"
                placeholder="Sampai"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="1">
              <VBtn
                text="Pilih"
                :color="firstIndex && lastIndex ? 'primary' : '#A09BA1'"
                @click="handleChooseNumbers"
              />
            </VCol>
            <VCol class="d-flex justify-end">
              <VBtn
                text="Buat Invoice"
                :color="selectedDoc.length ? 'primary' : '#A09BA1'"
                append-icon="mdi-file-document"
                @click="selectedDoc.length ? handleOpenModal() : null"
              />
            </VCol>
          </VRow>
        </VCardItem>
        <VCardText>
          <VDataTableServer
            class="border rounded mt-5"
            :headers="invoiceHeader"
            :items="tableItems"
            :items-length="totalData"
            v-model:items-per-page="itemPerPage"
            v-model:page="currentPage"
            :loading="isLoading"
            loading-text="Loading..."
            v-model="selectedDoc"
            show-select
            item-value="id_reg"
            :hide-default-footer="tableItems.length === 0"
          >
            <template #no-data>
              <div class="w-full mt-2">
                <div class="pt-2" style="justify-items: center">
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
              {{ index + 1 + (currentPage - 1) * itemPerPage }}
            </template>
            <template #item.jenis_produk="{ item }">
              <div>{{ `${item.jenis_produk} & ${item.merek_dagang}` }}</div>
            </template>
            <template #item.jumlah="{ item }">
              {{ item.jumlah ? formatNumber(item.jumlah) : '0' }}
            </template>
            <template #item.bank="{ item }">
              {{ item?.bank ? item?.bank : "-" }}
            </template>
          </VDataTableServer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <ConfirmModal
    dialog-title="Konfirmasi Buat Invoice"
    :dialog-visible="isOpenModal"
    @update:dialog-visible="isOpenModal = $event"
  >
    <VCardText>
      Yakin akan membuat tagihan untuk data-data yang dicontreng tersebut?
    </VCardText>
    <VCardActions class="px-4">
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenModal"
        >Batal</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="error"
        @click="[handleConfirmCreate(), handleOpenModal()]"
      >
        Ya, Setuju
      </VBtn>
    </VCardActions>
  </ConfirmModal>
</template>

<style scoped lang="scss">
.active-chip {
  border: 1px solid #49a84c !important;
  border-radius: 8px;
  background-color: #edf6ed;

  span {
    color: #49a84c;
  }
}
</style>
