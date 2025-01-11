<!-- eslint-disable camelcase -->
<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const id = route.params.id
const loading = ref(false)
const data = ref<any>({})
const dataDomestic = ref<any>([])
const dataLn = ref<any>([])
const dataAudit = ref<any>([])
const lovPabrik = ref<any>([])
const totalHargaAudit = ref(0)
const detailData = ref<any>({})
const selectedItem = ref<any>({})
const editDialog = ref<boolean>(false)
const addPesawat = ref<boolean>(false)
const addLn = ref<boolean>(false)
const editLn = ref<boolean>(false)
const pabrikId = ref<string>('')
const biayaPabrik = ref(0)
const editDataLn = ref({})
const totalDomestic = ref(0)

const detailDataLn = ref<any>({
  keterangan: '',
  qty: 0,
  harga: 0,
  total: 0,
})

const domesticAuditHeader: any[] = [
  { title: 'No', key: 'no' },
  { title: 'Nama Fasilitas Produksi', key: 'nama_pabrik', nowrap: true },
  { title: 'Man Days', key: 'man_days', nowrap: true },
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
  { title: 'Total', key: 'harga', nowrap: true },
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

const handleUpdateAuditCost = (type: string) => {
  handleOpenUpdateModal('CREATE')

  const message = type === 'CREATE' ? 'menambahkan' : 'mengubah'

  useSnackbar().sendSnackbar(`Berhasil ${message} data`, 'success')
}

const onAdd = () => {
  addPesawat.value = true
}

const openModalEditDalamNegri = (item: any) => {
  selectedItem.value = item
  const isManipulated = Object.values(item).some((value) => value.toString().includes('Rp'))
  if (!isManipulated) {
    item.unit_cost_awal = formatToIDR(item.unit_cost_awal)
    item.unit_cost_akhir = formatToIDR(item.unit_cost_akhir)
    item.uhpd_awal = formatToIDR(item.uhpd_awal)
    item.uhpd_akhir = formatToIDR(item.uhpd_akhir)
    item.operasional = formatToIDR(item.operasional)
    item.transport_awal = formatToIDR(item.transport_awal)
    item.transport_akhir = formatToIDR(item.transport_akhir)
    item.akomodasi_awal = formatToIDR(item.akomodasi_awal)
    item.akomodasi_akhir = formatToIDR(item.akomodasi_akhir)
    item.tiket_pesawat_awal = formatToIDR(item.tiket_pesawat_awal)
    item.tiket_pesawat_akhir = formatToIDR(item.tiket_pesawat_akhir)
    item.subtotal = formatToIDR(item.subtotal)
  }
  detailData.value = item
  editDialog.value = true
}

const getDetailBiaya = async () => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/detail', {
      method: 'get',
      params: { id },
    })

    if (response?.code === 2000) {
      const arrayAudit: any = []

      let total = response.data.biaya_indo.total_biaya

      response.data.biaya_indo.list.map((item: any) => {
        item.isShowDelete = item.tiket_pesawat_awal !== 0
        item.unit_cost_awal = formatToIDR(item.unit_cost_awal)
        item.unit_cost_akhir = formatToIDR(item.unit_cost_akhir)
        item.uhpd_awal = formatToIDR(item.uhpd_awal)
        item.uhpd_akhir = formatToIDR(item.uhpd_akhir)
        item.operasional = formatToIDR(item.operasional)
        item.transport_awal = formatToIDR(item.transport_awal)
        item.transport_akhir = formatToIDR(item.transport_akhir)
        item.akomodasi_awal = formatToIDR(item.akomodasi_awal)
        item.akomodasi_akhir = formatToIDR(item.akomodasi_akhir)
        item.tiket_pesawat_awal = formatToIDR(item.tiket_pesawat_awal)
        item.tiket_pesawat_akhir = formatToIDR(item.tiket_pesawat_akhir)
        item.subtotal = formatToIDR(item.subtotal)
      })

      if (response.data.lph_admin) {
        response.data.biaya_indo.list.push({ nama_pabrik: 'Biaya Admin', subtotal: formatToIDR(response.data.lph_admin) })
        total += response.data.lph_admin
      }

      totalDomestic.value = total

      response.data.biaya_ln.list.map((item: any) => {
        item.harga = formatToIDR(item.harga)
        item.sub_total = formatToIDR(item.sub_total)
      })

      arrayAudit.push({ keterangan: 'Biaya Pemeriksaan LPH', subtotal: formatToIDR(total) })
      // response?.data?.biaya_ln?.list?.map((item: any) => arrayAudit.push({ keterangan: item.keterangan, subtotal: item?.harga }))
      data.value = response.data
      dataDomestic.value = response.data?.biaya_indo?.list
      dataLn.value = response.data?.biaya_ln?.list
      dataAudit.value = arrayAudit
      totalHargaAudit.value = arrayAudit.reduce((total, item) => total + idrToNumber(item.subtotal), 0)
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

const getLovPabrik = async () => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/list-pabrik', {
      method: 'get',
      params: { id },
    })

    if (response?.code === 2000) 
      lovPabrik.value = response.data
    
    else 
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    

    return response.data || []
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const getBiayaPesawat = async (id_pabrik: string) => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/detail-pesawat', {
      method: 'get',
      params: { id, id_pabrik },
    })

    if (response?.code === 2000) 
      biayaPabrik.value = formatToIDR(response.data)
    
    else 
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    

    return response.data || []
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const onEdit = async () => {
  try {
    const body = {
      akomodasi_akhir: detailData.value?.akomodasi_akhir !== 0 ? idrToNumber(detailData.value?.akomodasi_akhir) : 0,
      akomodasi_diskon: +detailData.value?.akomodasi_diskon,
      id_pabrik: detailData.value?.id_pabrik,
      tiket_pesawat_akhir: detailData.value?.tiket_pesawat_akhir !== 0 ? idrToNumber(detailData.value?.tiket_pesawat_akhir) : 0,
      tiket_pesawat_diskon: +detailData.value?.tiket_pesawat_diskon,
      transport_akhir: detailData.value?.transport_akhir !== 0 ? idrToNumber(detailData.value?.transport_akhir) : 0,
      transport_diskon: +detailData.value?.transport_diskon,
      uhpd_akhir: detailData.value?.uhpd_akhir !== 0 ? idrToNumber(detailData.value?.uhpd_akhir) : 0,
      uhpd_diskon: +detailData.value?.uhpd_diskon,
      unit_cost_akhir: detailData.value?.unit_cost_akhir !== 0 ? idrToNumber(detailData.value?.unit_cost_akhir) : 0,
      unit_cost_diskon: +detailData.value?.unit_cost_diskon,
    }

    const response: any = await $api('/reguler/lph/update-cost/update', {
      method: 'put',
      query: { id },
      body,
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Berhasil ubah data', 'success')
      editDialog.value = false
      getDetailBiaya()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const onAddDataLn = async () => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/create-dataln', {
      method: 'post',
      query: { id },
      body: {
        ...detailDataLn.value,
        qty: +detailDataLn.value.qty,
        harga: +detailDataLn.value.harga,
        total: +detailDataLn.value.total,
      },
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Berhasil ubah data', 'success')
      addLn.value = false
      getDetailBiaya()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const onEditDataLn = async () => {
  const body = {
    id_biaya: editDataLn.value?.id,
    keterangan: editDataLn.value?.keterangan,
    qty: +editDataLn.value?.jumlah,
    harga: editDataLn.value?.harga,
    total: editDataLn.value?.sub_total,
  }

  try {
    const response: any = await $api('/reguler/lph/update-cost/update-ln', {
      method: 'put',
      query: { id },
      body,
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Berhasil ubah data', 'success')
      editLn.value = false
      getDetailBiaya()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const onAddDataDalamNegri = async () => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/biaya-pesawat', {
      method: 'put',
      query: { id },
      body: {
        id_pabrik: pabrikId.value,
        biaya_tiket: idrToNumber(biayaPabrik.value),
      },
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Berhasil ubah data', 'success')
      addPesawat.value = false
      getDetailBiaya()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const onUpdateTotal = async () => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/update-total', {
      method: 'post',
      query: { id },
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Berhasil perbaharui data', 'success')
      getDetailBiaya()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const validateInput = (event: any) => {
  if (+event.target.value > 100)
    event.target.value = 100
  if (event.target.value.length > 2)
    event.preventDefault()
  if (['e', 'E', '-', '+'].includes(event.key))
    event.preventDefault()
}

const onDeletePesawat = async (el: any) => {
  try {
    const response: any = await $api('/reguler/lph/update-cost/delete-biaya-pesawat', {
      method: 'delete',
      body: {
        id,
        idPesawat: el.id_pabrik,
      },
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Berhasil hapus biaya pesawat', 'success')
      getDetailBiaya()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.allSettled([
    getDetailBiaya(),
    getLovPabrik(),
  ])
  loading.value = false
})
</script>

<template>
  <div v-if="!loading">
    <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
      <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
      <div class="text-primary">Kembali</div>
    </div>
    <VRow cols="8">
      <VCol>
        <h1>
          Informasi Penetapan Biaya Audit Untuk Fasilitas Produksi di Indonesia
        </h1>
        <VRow style="float: inline-end; margin-right: 10px;">
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="onUpdateTotal"
          >
            Perbaharui
          </VBtn>
        </VRow>
      </VCol>
    </VRow>
    <VRow cols="4">
      <VCol>
        <VCard>
          <VCardTitle class="my-3 d-flex justify-space-between align-center">
            <div class="d-flex flex-wrap w-100" style="justify-content: space-between;">
              <div class="font-weight-bold text-h4">
                Penetapan Biaya Audit untuk Fasilitas Produksi di Indonesia
              </div>
              <VBtn
                variant="outlined"
                text="Tambah Biaya Pesawat"
                @click="onAdd('CREATE')"
              />
            </div>
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
                    <VMenu v-if="item.nama_pabrik !== 'Biaya Admin'">
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
                          @click="() => openModalEditDalamNegri(item)"
                        />
                        <div class="pr-4">
                          <DialogDeletePlane
                            v-if="item.isShowDelete"
                            :on-delete="() => onDeletePesawat(item)"
                            title="Hapus tiket Pesawat"
                            button-text="Hapus"
                          />
                        </div>
                      </VList>
                    </VMenu>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td v-if="dataDomestic.length">
                    <div class="d-flex gap-5">
                      <td class="text-right font-weight-bold" style="align-content: center;">
                        Total
                      </td>
                      <div class="d-flex align-center font-weight-bold">
                        {{ formatToIDR(totalDomestic) || 0 }}
                      </div>
                    </div>
                  </td>
                </tr>
                <div />
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow v-if="data?.is_ln_exist">
      <VCol>
        <VCard>
          <VCardTitle class="my-3 d-flex justify-space-between align-center">
            <div class="d-flex flex-wrap w-100" style="justify-content: space-between;">
              <div class="font-weight-bold text-h4">
                Penetapan Biaya Audit untuk Fasilitas Produksi di Luar Negeri
              </div>
              <VBtn
                variant="outlined"
                text="Tambah Biaya"
                @click="addLn = true"
              />
            </div>
          </VCardTitle>
          <VCardText>
            <VDataTable
              :headers="overseaAuditHeader"
              :items="dataLn"
              hide-default-footer
            >
              <!-- <template #body="{ items }">
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
                  <td>{{ item.harga }}</td>
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
                          @click="() => {
                            editDataLn = {
                              ...item,
                              harga: idrToNumber(item.harga),
                              sub_total: idrToNumber(item.sub_total),
                            }
                            editLn = true
                          }"
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
                    {{ formatToIDR(data?.biaya_ln?.total_biaya) || 0 }}
                  </td>
                </tr>
              </template> -->
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
                  <td>{{ item.harga }}</td>
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
                          @click="() => {
                            editDataLn = {
                              ...item,
                              harga: idrToNumber(item.harga),
                              sub_total: idrToNumber(item.sub_total),
                            }
                            editLn = true
                          }"
                        />
                      </VList>
                    </VMenu>
                  </td>
                </tr>
                <tr v-if="dataLn.length">
                  <td colspan="1" />
                  <td colspan="1" class="text-right font-weight-bold">
                    Total
                  </td>
                  <td colspan="2" class="d-flex align-center font-weight-bold">
                    {{ formatToIDR(data?.biaya_ln?.total_biaya) || 0 }}
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
    <VDialog v-model="addPesawat" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">
            Tambah Biaya Pesawat
          </div>
          <VIcon @click="addPesawat = false"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <div>
            <label>Pabrik</label>
            <VSelect
              v-model="pabrikId"
              :items="lovPabrik"
              placeholder="Pilih pabrik"
              item-title="nama"
              item-value="id_pabrik"
              @update:model-value="() => getBiayaPesawat(pabrikId)"
            />
          </div>
          <br>
          <div>
            <label>Biaya</label>
            <VTextField
              v-model="biayaPabrik"
              rounded="xl"
              density="compact"
              placeholder="2"
              disabled
            />
          </div>
        </VCardText>
        <VCardActions class="pt-2 px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="addPesawat = false"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="onAddDataDalamNegri"
          >
            Tambah
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="addLn" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">
            Tambah Biaya Fasilitas Produksi di Luar Negeri
          </div>
          <VIcon @click="addLn = false"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <div class="text-h6">Keterangan Biaya</div>
              <VTextField
                v-model="detailDataLn.keterangan"
                rounded="xl"
                density="compact"
                placeholder="Biaya Admin"
              />
            </VCol>
            <!-- <VCol>
              <div class="text-h6">Jumlah</div>
              <VTextField
                v-model="detailDataLn.qty"
                rounded="xl"
                density="compact"
                placeholder="2"
                type="number"
                @update:model-value="detailDataLn.total = detailDataLn.qty * detailDataLn.harga"
                :min="0"
              />
            </VCol> -->
            <VCol>
              <div class="text-h6">Harga</div>
              <VTextField
                v-model="detailDataLn.harga"
                type="number"
                rounded="xl"
                density="compact"
                placeholder="Rp 400.000"
                @update:model-value="detailDataLn.total = detailDataLn.qty * detailDataLn.harga"
              />
            </VCol>
            <!-- <VCol>
              <div class="text-h6">Sub Total</div>
              <VTextField
                v-model="detailDataLn.total"
                type="number"
                rounded="xl"
                density="compact"
                placeholder="Rp 800.000"
                disabled
              />
            </VCol> -->
          </VRow>
        </VCardText>
        <VCardActions class="pt-2 px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="addLn = false"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="onAddDataLn"
          >
            {{ overseaModalText }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="editLn" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">
            Ubah Biaya Fasilitas Produksi di Luar Negeri
          </div>
          <VIcon @click="editLn = false"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <div class="text-h6">Keterangan Biaya</div>
              <VTextField
                v-model="editDataLn.keterangan"
                rounded="xl"
                density="compact"
                placeholder="Biaya Admin"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Jumlah</div>
              <VTextField
                v-model="editDataLn.jumlah"
                rounded="xl"
                density="compact"
                placeholder="2"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Harga</div>
              <VTextField
                v-model="editDataLn.harga"
                rounded="xl"
                density="compact"
                placeholder="Rp 400.000"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Sub Total</div>
              <VTextField
                v-model="editDataLn.sub_total"
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
            @click="editLn = false"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="onEditDataLn"
          >
            Ubah
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="editDialog" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">
            Ubah Biaya Audit
          </div>
          <VIcon @click="() => {
            editDialog = false
          }"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <div class="text-h6">Fasilitas Produksi</div>
              <VTextField
                v-model="detailData.nama_pabrik"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Unit Cost Awal</div>
              <VTextField
                v-model="detailData.unit_cost_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                v-model="detailData.unit_cost_diskon"
                type="number"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="(e) => {
                  validateInput(e)
                  if (+e.target.value) {
                    const initialCost = idrToNumber(detailData.unit_cost_awal)
                    detailData.unit_cost_akhir = initialCost - (initialCost * (+e.target.value / 100))
                    if (detailData.unit_cost_akhir) {
                      detailData.unit_cost_akhir = formatToIDR(detailData.unit_cost_akhir)
                    }
                  } else {
                    detailData.unit_cost_akhir = detailData.unit_cost_awal
                  }
                }"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Unit Cost Akhir</div>
              <VTextField
                v-model="detailData.unit_cost_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">UHPD Awal</div>
              <VTextField
                v-model="detailData.uhpd_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                v-model="detailData.uhpd_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="(e) => {
                  validateInput(e)
                  if (+e.target.value) {
                    const initialCost = idrToNumber(detailData.uhpd_awal)
                    detailData.uhpd_akhir = initialCost - (initialCost * (+e.target.value / 100))
                    if (detailData.uhpd_akhir) {
                      detailData.uhpd_akhir = formatToIDR(detailData.uhpd_akhir)
                    }
                  } else {
                    detailData.uhpd_akhir = detailData.uhpd_awal
                  }
                }"
              />
            </VCol>
            <VCol>
              <div class="text-h6">UHPD Akhir</div>
              <VTextField
                v-model="detailData.uhpd_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Operasional</div>
              <VTextField
                v-model="detailData.operasional"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Transportasi Awal</div>
              <VTextField
                v-model="detailData.transport_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                v-model="detailData.transport_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="(e) => {
                  validateInput(e)
                  if (+e.target.value) {
                    const initialCost = idrToNumber(detailData.transport_awal)
                    detailData.transport_akhir = initialCost - (initialCost * (+e.target.value / 100))
                    if (detailData.transport_akhir) {
                      detailData.transport_akhir = formatToIDR(detailData.transport_akhir)
                    }
                  } else {
                    detailData.transport_akhir = detailData.transport_awal
                  }
                }"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Transportasi Akhir</div>
              <VTextField
                v-model="detailData.transport_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Akomodasi Awal</div>
              <VTextField
                v-model="detailData.akomodasi_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                v-model="detailData.akomodasi_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="(e) => {
                  validateInput(e)
                  if (+e.target.value) {
                    const initialCost = idrToNumber(detailData.akomodasi_awal)
                    detailData.akomodasi_akhir = initialCost - (initialCost * (+e.target.value / 100))
                    if (detailData.akomodasi_akhir) {
                      detailData.akomodasi_akhir = formatToIDR(detailData.akomodasi_akhir)
                    }
                  } else {
                    detailData.akomodasi_akhir = detailData.akomodasi_awal
                  }
                }"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Akomodasi Akhir</div>
              <VTextField
                v-model="detailData.akomodasi_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="text-h6">Tiket Pesawat Awal</div>
              <VTextField
                v-model="detailData.tiket_pesawat_awal"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
            <VCol>
              <div class="text-h6">Diskon (%)</div>
              <VTextField
                v-model="detailData.tiket_pesawat_diskon"
                rounded="xl"
                density="compact"
                placeholder="Masukkan Diskon"
                :min="0"
                :max="100"
                @keypress="validateInput"
                @input="(e) => {
                  validateInput(e)
                  if (+e.target.value) {
                    const initialCost = idrToNumber(detailData.tiket_pesawat_awal)
                    detailData.tiket_pesawat_akhir = initialCost - (initialCost * (+e.target.value / 100))
                    if (detailData.tiket_pesawat_akhir) {
                      detailData.tiket_pesawat_akhir = formatToIDR(detailData.tiket_pesawat_akhir)
                    }
                  } else {
                    detailData.tiket_pesawat_akhir = detailData.tiket_pesawat_awal
                  }
                }"
              />
            </VCol>
            <VCol>
              <div class="text-h6">Tiket Pesawat Akhir</div>
              <VTextField
                v-model="detailData.tiket_pesawat_akhir"
                rounded="xl"
                density="compact"
                disabled
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="pt-2 px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="() => {
              editDialog = false
            }"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="onEdit"
          >
            Ubah
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
