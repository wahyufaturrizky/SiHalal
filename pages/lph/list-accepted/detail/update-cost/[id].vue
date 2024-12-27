<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const id = route.params.id
const loading = ref(false)
const data = ref<any>({})
const dataDomestic = ref<any>([])
const dataLn = ref<any>([])
const dataAudit = ref<any>([])
const totalHargaAudit = ref(0)

const domesticAuditHeader: any[] = [
  { title: 'No', key: 'no' },
  { title: 'Nama Fasilitas Produksi', key: 'nama_pabrik', nowrap: true },
  { title: 'Man Day;s', key: 'man_days', nowrap: true },
  { title: 'Unit Cost Awal', key: 'unit_cost_awal', nowrap: true },
  { title: 'Diskon (%)', key: 'unit_cost_diskon', nowrap: true },
  { title: 'Unit Cost Akhir', key: 'unit_cost_akhir', nowrap: true },
  { title: 'UHPD Awal', key: 'uhpd_awal', nowrap: true },
  { title: 'Diskon (%)', key: 'uhpd_diskon', nowrap: true },
  { title: 'UHPD Akhir', key: 'uhpd_akhir', nowrap: true },
  { title: 'Operasional', key: 'operasional', nowrap: true },
  { title: 'Akomodasi Awal', key: 'akomodasi_awal', nowrap: true },
  { title: 'Diskon (%)', key: 'akomodasi_diskon', nowrap: true },
  { title: 'Akomodasi Akhir', key: 'akomodasi_akhir', nowrap: true },
  { title: 'Transportasi Awal', key: 'transport_awal', nowrap: true },
  { title: 'Diskon (%)', key: 'transport_diskon', nowrap: true },
  { title: 'Transportasi Akhir', key: 'transport_akhir', nowrap: true },
  { title: 'Tiket Pesawat Awal', key: 'tiket_pesawat_awal', nowrap: true },
  { title: 'Diskon (%)', key: 'tiket_pesawat_diskon', nowrap: true },
  { title: 'Tiket Pesawat Akhir', key: 'tiket_pesawat_akhir', nowrap: true },
  { title: 'Sub Tot', key: 'subtotal', nowrap: true },
  { title: 'Action', key: 'actions', align: 'center', nowrap: true },
]

const domesticAuditData = ref([
  {
    placeName: 'Outlet Indihome',
    manDay: '3',
    startCost: 'Rp 700.000',
    firstDiscount: '30',
    endCost: 'Rp 350.000',
    startUhpd: 'Rp 850.000',
    secondDiscount: '30',
    endUhpd: 'Rp 850.000',
    operational: '30',
    startAccomodation: 'Rp 850.000',
    thirdDiscount: '30',
    endAccomodation: 'Rp 850.000',
    startTransport: 'Rp 850.000',
    forthDiscount: '30',
    endTransport: 'Rp 850.000',
    firstFlight: 'Rp 850.000',
    fifthDiscount: '30',
    lastFlight: 'Rp 850.000',
    subTotal: 'Rp 850.000',
  },
  {
    placeName: 'Pabrik Masak 2H',
    manDay: '2',
    startCost: 'Rp 700.000',
    firstDiscount: '-',
    endCost: 'Rp 350.000',
    startUhpd: 'Rp 740.000',
    secondDiscount: '-',
    endUhpd: 'Rp 740.000',
    operational: '-',
    startAccomodation: 'Rp 740.000',
    thirdDiscount: '-',
    endAccomodation: 'Rp 740.000',
    startTransport: 'Rp 740.000',
    forthDiscount: '-',
    endTransport: 'Rp 740.000',
    firstFlight: 'Rp 740.000',
    fifthDiscount: '-',
    lastFlight: 'Rp 740.000',
    subTotal: 'Rp 850.000',
  },
])

const domesticTotal = {
  title: 'Total',
  value: 'Rp 7.000.000',
}

const overseaAuditHeader: any[] = [
  { title: 'No', key: 'index' },
  { title: 'Keterangan Biaya', key: 'costName', nowrap: true },
  { title: 'Jumlah', key: 'quantity' },
  { title: 'Harga', key: 'price', nowrap: true },
  { title: 'Sub Tot', key: 'subTotal', nowrap: true },
  {
    title: 'Action',
    key: 'actions',
    align: 'center',
    nowrap: true,
  },
]

const overseaAuditData = ref([
  {
    costName: 'Biaya Pemeriksaan',
    quantity: '1',
    price: 'Rp 6.000.000',
    subTotal: 'Rp 6.000.000',
  },
  {
    costName: 'Biaya Audit',
    quantity: '1',
    price: 'Rp 1.000.000',
    subTotal: 'Rp 1.000.000',
  },
])

const overseaTotal = {
  title: 'Total',
  value: 'Rp 7.000.000',
}

const totalAuditHeader: any[] = [
  { title: 'No', key: 'index' },
  { title: 'Keterangan', key: 'keterangan', nowrap: true },
  {
    title: 'Subtotal',
    key: 'subtotal',
    nowrap: true,
    align: 'center',
    width: '150px',
  },
]

const totalAuditData = ref([
  {
    description: 'Keterangan Apapun',
    subTotal: 'Rp 850.000',
  },
  {
    description: 'Coba dulu',
    subTotal: 'Rp 740.000',
  },
])

const auditTotal = {
  title: 'Total',
  value: 'Rp 1.590.000',
}

// const isDomesticModalOpen = ref(false);
const isOverseaModalOpen = ref(false)
const isUpdateModalOpen = ref(false)
const overseaModalType = ref('CREATE')
const updateModalType = ref('CREATE')

// const handleOpenDomesticModal = () => {
//   isDomesticModalOpen.value = !isDomesticModalOpen.value;
// };
const handleOpenOverseaModal = (type: string) => {
  overseaModalType.value = type
  isOverseaModalOpen.value = !isOverseaModalOpen.value
}

const handleOpenUpdateModal = (type: string) => {
  updateModalType.value = type
  isUpdateModalOpen.value = !isUpdateModalOpen.value
}

const domesticModalText = computed(() => {
  return updateModalType.value === 'CREATE' ? 'Tambah' : 'Ubah'
})

const overseaModalText = computed(() => {
  return overseaModalType.value === 'CREATE' ? 'Tambah' : 'Ubah'
})

// const selectedFactory = ref(null);
// const handleAddDomesticCost = () => {
//   selectedFactory.value = null;
//   handleOpenDomesticModal();
//   useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
// };

const handleAddOverseaCost = (type: string) => {
  handleOpenOverseaModal(type)

  const message = type === 'CREATE' ? 'menambahkan' : 'mengubah'

  useSnackbar().sendSnackbar(`Berhasil ${message} data`, 'success')
};

const handleUpdateAuditCost = (type: string) => {
  handleOpenUpdateModal('CREATE')

  const message = type === 'CREATE' ? 'menambahkan' : 'mengubah'

  useSnackbar().sendSnackbar(`Berhasil ${message} data`, 'success')
}

const getDetailBiaya = async () => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/detail', {
      method: 'get',
      params: { id },
    })

    if (response?.code === 2000) {
      const arrayAudit: any = []

      response?.data?.biaya_indo?.list?.map((item: any) => arrayAudit.push({ keterangan: item.nama_pabrik, subtotal: item?.subtotal }))
      response?.data?.biaya_ln?.list?.map((item: any) => arrayAudit.push({ keterangan: item.keterangan, subtotal: item?.sub_total }))
      data.value = response.data
      dataDomestic.value = response.data?.biaya_indo?.list
      dataLn.value = response.data?.biaya_ln?.list
      dataAudit.value = arrayAudit
      totalHargaAudit.value = arrayAudit.reduce((total, item) => total + item.subtotal, 0)
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }

    return response.data || []
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(async () => {
  loading.value = true
  await getDetailBiaya()
  loading.value = false
})
</script>

<template>
  <div v-if="!loading">
    <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
      <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
      <div class="text-primary">Kembali</div>
    </div>
    <VRow no-gutters>
      <VCol>
        <h1>
          Informasi Penetapan Biaya Audit Untuk Fasilitas Produksi di Indonesia
        </h1>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle class="my-3 d-flex justify-space-between align-center">
            <div class="font-weight-bold text-h4">
              Penetapan Biaya Audit untuk Fasilitas Produksi di Indonesia
            </div>
            <VBtn
              variant="outlined"
              text="Tambah Biaya Pesawat"
              @click="handleOpenUpdateModal('CREATE')"
            />
          </VCardTitle>
          <VCardText>
            <VDataTable
              class="domestic-table border rounded"
              :headers="domesticAuditHeader"
              :items="data?.biaya_indo?.list || []"
              hide-default-footer
            >
              <template #body="{ items }">
                <tr v-if="items.length === 0">
                  <td colspan="3" class="text-center">
                    <div class="pt-2">
                      <img src="~/assets/images/empty-data.png" alt="" />
                      <div class="pt-2 font-weight-bold">Data Kosong</div>
                    </div>
                  </td>
                </tr>
                <tr
                  v-for="(item, idx) in dataDomestic"
                  :key="idx"
                >
                  <td>{{ idx + 1 }}</td>
                  <td>{{ item.nama_pabrik }}</td>
                  <td>{{ item.man_days }}</td>
                  <td>{{ item.unit_cost_awal }}</td>
                  <td>{{ item.unit_cost_diskon }}</td>
                  <td>{{ item.unit_cost_akhir }}</td>
                  <td>{{ item.uhpd_awal }}</td>
                  <td>{{ item.uhpd_diskon }}</td>
                  <td>{{ item.uhpd_akhir }}</td>
                  <td>{{ item.operasional }}</td>
                  <td>{{ item.akomodasi_awal }}</td>
                  <td>{{ item.akomodasi_diskon }}</td>
                  <td>{{ item.akomodasi_akhir }}</td>
                  <td>{{ item.transport_awal }}</td>
                  <td>{{ item.transport_diskon }}</td>
                  <td>{{ item.transport_akhir }}</td>
                  <td>{{ item.tiket_pesawat_awal }}</td>
                  <td>{{ item.tiket_pesawat_diskon }}</td>
                  <td>{{ item.tiket_pesawat_akhir }}</td>
                  <td>{{ item.subtotal }}</td>
                  <td class="text-center">
                    <VMenu>
                      <template #activator="{ props }">
                        <VIcon
                          icon="fa-ellipsis-v"
                          color="primary"
                          class="cursor-pointer"
                          v-bind="props"
                        />
                      </template>
                      <VList>
                        <VListItem
                          prepend-icon="mdi-pencil"
                          title="Ubah"
                          @click="() => handleOpenUpdateModal('EDIT')"
                        />
                      </VList>
                    </VMenu>
                  </td>
                </tr>
                <tr v-if="dataDomestic.length">
                  <td colspan="18" />
                  <td colspan="1" class="text-right font-weight-bold">
                    Total
                  </td>
                  <td colspan="2" class="d-flex align-center font-weight-bold">
                    {{ formatToIDR(data?.biaya_indo?.total_biaya) || 0 }}
                  </td>
                </tr>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle class="my-3 d-flex justify-space-between align-center">
            <div class="font-weight-bold text-h4">
              Penetapan Biaya Audit untuk Fasilitas Produksi di Luar Negeri
            </div>
            <VBtn
              variant="outlined"
              text="Tambah Biaya"
              @click="handleOpenOverseaModal('CREATE')"
            />
          </VCardTitle>
          <VCardText>
            <VDataTable
              class="oversea-table border rounded"
              :headers="overseaAuditHeader"
              :items="dataLn"
              hide-default-footer
            >
              <template #body="{ items }">
                <tr v-if="items.length === 0">
                  <td colspan="3" class="text-center">
                    <div class="pt-2">
                      <img src="~/assets/images/empty-data.png" alt="" />
                      <div class="pt-2 font-weight-bold">Data Kosong</div>
                    </div>
                  </td>
                </tr>
                <tr v-for="(item, idx) in dataLn" :key="idx">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ item.keterangan }}</td>
                  <td>{{ item.jumlah }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.sub_total }}</td>
                  <td class="text-center">
                    <VMenu>
                      <template #activator="{ props }">
                        <VIcon
                          icon="fa-ellipsis-v"
                          color="primary"
                          class="cursor-pointer"
                          v-bind="props"
                        />
                      </template>
                      <VList>
                        <VListItem
                          prepend-icon="mdi-pencil"
                          title="Ubah"
                          @click="() => handleOpenOverseaModal('EDIT')"
                        />
                      </VList>
                    </VMenu>
                  </td>
                </tr>
                <tr v-if="dataLn.length">
                  <td colspan="3" />
                  <td colspan="1" class="text-right font-weight-bold">
                    Total
                  </td>
                  <td colspan="2" class="d-flex align-center font-weight-bold">
                    {{ formatToIDR(data?.biaya_indo?.total_biaya) || 0 }}
                  </td>
                </tr>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle class="my-3 d-flex justify-space-between align-center">
            <div class="font-weight-bold text-h4">Total Biaya Audit</div>
          </VCardTitle>
          <VCardText>
            <VDataTable
              :headers="totalAuditHeader"
              :items="dataAudit"
              hide-default-footer
            >
              <template #body="{ items }">
                <tr v-if="items.length === 0">
                  <td colspan="3" class="text-center">
                    <div class="pt-2">
                      <img src="~/assets/images/empty-data.png" alt="" />
                      <div class="pt-2 font-weight-bold">Data Kosong</div>
                    </div>
                  </td>
                </tr>
                <tr v-for="(item, idx) in dataAudit" :key="idx">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ item.keterangan }}</td>
                  <td class="d-flex justify-center align-center" width="150px">
                    {{ item.subtotal }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right font-weight-bold">
                    {{ auditTotal.title }}
                  </td>
                  <td
                    colspan="1"
                    class="d-flex justify-center align-center font-weight-bold"
                    width="150px"
                  >
                    {{ formatToIDR(totalHargaAudit) || 0 }}
                  </td>
                </tr>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VDialog v-model="isOverseaModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">
            {{ overseaModalText }} Biaya Fasilitas Produksi di Luar Negeri
          </div>
          <VIcon @click="handleOpenOverseaModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <div class="text-h6">Keterangan Biaya</div>
              <VTextField
                rounded="xl"
                density="compact"
                placeholder="Biaya Admin"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Jumlah</div>
              <VTextField rounded="xl" density="compact" placeholder="2" />
            </VCol>
            <VCol>
              <div class="text-h6">Harga</div>
              <VTextField
                rounded="xl"
                density="compact"
                placeholder="Rp 400.000"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Sub Total</div>
              <VTextField
                rounded="xl"
                density="compact"
                placeholder="Rp 800.000"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="pt-2 px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenOverseaModal"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="handleAddOverseaCost"
          >
            {{ overseaModalText }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="isUpdateModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">
            {{ domesticModalText }} Biaya Audit
          </div>
          <VIcon @click="handleOpenUpdateModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <div class="text-h6">Fasilitas Produksi</div>
              <VTextField
                model-value="Outlet Indihome"
                rounded="xl"
                density="compact"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Unit Cost Awal</div>
              <VTextField
                model-value="Rp 700.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                model-value="50"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Unit Cost Akhir</div>
              <VTextField
                model-value="Rp 350.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">UHPD Awal</div>
              <VTextField
                model-value="Rp 700.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
              />
            </VCol>
            <VCol>
              <div class="text-h6">UHPD Akhir</div>
              <VTextField
                model-value="Rp 350.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Operasional</div>
              <VTextField
                model-value="Rp 700.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Transportasi Awal</div>
              <VTextField
                model-value="Rp 700.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                model-value="50"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Transportasi Akhir</div>
              <VTextField
                model-value="Rp 350.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Akomodasi Awal</div>
              <VTextField
                model-value="Rp 700.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Akomodasi Akhir</div>
              <VTextField
                model-value="Rp 350.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Tiket Pesawat Awal</div>
              <VTextField
                model-value="Rp 700.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Tiket Pesawat Akhir</div>
              <VTextField
                model-value="Rp 350.000"
                rounded="xl"
                density="compact"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="pt-2 px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenUpdateModal"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="handleUpdateAuditCost"
          >
            {{ domesticModalText }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.v-data-table.domestic-table > .v-table__wrapper) {
  table {
    thead {
      tr {
        th:nth-of-type(20) {
          right: 110px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
        }
        th:last-of-type {
          right: 0;
          position: sticky;
        }
      }
    }

    tbody {
      tr:not(:last-of-type) {
        td:nth-of-type(20) {
          width: 150px;
          right: 110px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
          background: white;
        }
        td:last-of-type {
          right: 0;
          position: sticky;
          background: white;
        }
      }

      tr:last-of-type {
        td:nth-of-type(2) {
          width: max-content;
          right: 250px;
          position: sticky;
          background: white;
        }
        td:last-of-type {
          width: max-content;
          right: 110px;
          position: sticky;
          background: white;
        }
      }
    }
  }
}
:deep(.v-data-table.oversea-table > .v-table__wrapper) {
  table {
    thead {
      tr {
        th:nth-of-type(5) {
          right: 110px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
        }
        th:last-of-type {
          right: 0;
          position: sticky;
        }
      }
    }

    tbody {
      tr:not(:last-of-type) {
        td:nth-of-type(5) {
          width: 150px;
          right: 110px;
          position: sticky;
          border-left: 1px solid rgba(#000000, 0.12);
          background: white;
        }
        td:last-of-type {
          width: 50px;
          right: 0;
          position: sticky;
          background: white;
        }
      }

      tr:last-of-type {
        td:nth-of-type(2) {
          width: max-content;
          right: 250px;
          position: sticky;
          background: white;
        }
        td:last-of-type {
          width: max-content;
          right: 110px;
          position: sticky;
          background: white;
        }
      }
    }
  }
}
</style>
