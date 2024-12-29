<!-- eslint-disable sonarjs/no-duplicated-branches -->
<!-- eslint-disable @stylistic/ts/indent -->
<!-- eslint-disable indent -->
<!-- eslint-disable vue/prop-name-casing -->
<script setup lang="ts">
import { ref } from 'vue'

interface PayloadPenanggungJawab {
  id_reg: string
  nama_pj: string
  no_kontak_pj: string
  email_pj: string
}

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: '1',
  },
  list_legal: {
    type: Object,
    required: false,
  },
  list_factory: {
    type: Object,
    required: false,
  },
  list_outlet: {
    type: Object,
    required: false,
  },
  list_penyelia: {
    type: Object,
    required: false,
  },
  list_channel: {
    type: Array,
    required: false,
  },
})

const itemsProduct = ref<any>(null)
const confirmSaveDialog = ref(false)
const addDialog = ref(false)
const titleAddDialog = ref('')
const submitContentType = ref('')
const addContentType = ref('')
const labelSaveBtn = ref('')
const file = ref<File | null>(null)
const selectedLegalToAdd = ref<any>(null)
const loading = ref<boolean>(false)
const requestCertificateData = ref<any>([])
const responsibility: any = ref<any>([])
const aspectLegalData = ref<any>({})
const factoryData = ref({})
const outletData = ref({})
const halalData = ref({})
const payloadData = ref({})

const listFactory = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'nama', nowrap: true },
    { title: 'Alamat', key: 'alamat', nowrap: true },
    { title: 'Status', key: 'status_milik', nowrap: true },
    { title: 'Action', key: 'publication', sortable: false, nowrap: true },
  ],
  value: props?.list_factory || [],
})

const listOutlet = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'nama', nowrap: true },
    { title: 'Alamat', key: 'alamat', nowrap: true },
    { title: 'Status', key: 'status_milik', nowrap: true },
    { title: 'Action', key: 'publication', sortable: false, nowrap: true },
  ],
  value: props?.list_outlet || [],
})

const listPenyelia = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'nama', nowrap: true },
    { title: 'No. KTP', key: 'no_ktp', nowrap: true },
    { title: 'Agama', key: 'agama', nowrap: true },
    { title: 'No/Tgl Sertif Penyelia Halal', key: 'tgl_penyelia_halal', nowrap: true },
    { title: 'Action', key: 'publication', sortable: false, nowrap: true },
  ],
  value: props?.list_penyelia || [],
})

// const factoryModel = ref({
//   id_fas: 'ae661a8b-be9b-45a9-b6cc-e26ee63d374e',
//   fasil_id: 'FAPAB',
//   nama: '',
//   kab_kota: '',
//   provinsi: '',
//   negara: '',
//   kode_pos: '',
//   alamat: '',
//   status_milik: '',
// })

const documentList = ref([
  { nama: 'Izin Edar', fileName: 'Surat Izin Usaha.pdf', file: null },
  { nama: 'Izin Masuk', fileName: '', file: null },
])

const removeFile = (index: number) => {
  documentList.value[0].fileName = ''
  documentList.value[0].file = null

  file.value = null
}

const uploadFile = (event: Event, index: string | number) => {
  const fileUpload = event.target.files[0]
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name
    documentList.value[0].file = fileUpload
  }
}

const triggerSaveModal = (payload: any, type: string) => {
  submitContentType.value = type
  payloadData.value = payload
  confirmSaveDialog.value = true
}

const triggerAddModal = (type: string) => {
  addContentType.value = type
  addDialog.value = true
  titleAddDialog.value = `Tambah Data ${type}`
  labelSaveBtn.value = 'Tambah'
}

const loadItemProduct = async () => {
  try {
    const response: any = await $api('/master/products', {
      method: 'get',
    })

    if (response.length) {
      itemsProduct.value = response

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

const getDetailData = async () => {
  try {
    const response: any = await $api('/reguler/pelaku-usaha/detail', {
      method: 'get',
      params: { id: props?.id },
    })

    if (response?.code === 2000) {
      // const certificateHalal = response?.data?.certificate_halal
      // const responsibilityData = response?.data?.penanggung_jawab
      // const aspectLegal = response?.data?.aspek_legal
      // const factory = response?.data?.pabrik
      const outlet = response?.data?.outlet
      // const penyelia = response?.data?.penyelia_halal

      // requestCertificateData.value = [
      //   {
      //     title: 'Nama Perusahaan yang Tertera pada Sertifikat',
      //     value: certificateHalal.nama_pu || '',
      //     type: 'text',
      //     required: true,
      //     key: 'nama_pu',
      //   },
      //   {
      //     title: 'Nomor Surat Permohonan',
      //     value: certificateHalal.no_mohon || '',
      //     type: 'text',
      //     required: true,
      //     key: 'no_mohon',
      //   },
      //   {
      //     title: 'Tanggal Surat Pemohon',
      //     value: certificateHalal.tgl_daftar || '',
      //     type: 'text',
      //     required: true,
      //     key: 'tgl_mohon',
      //   },
      //   {
      //     title: 'Jenis Layanan',
      //     value: certificateHalal.jenis_layanan || '',
      //     type: 'select',
      //     disabled: false,
      //     required: true,
      //     key: 'jenis_layanan',
      //   },
      //   {
      //     title: 'Jenis Produk',
      //     value: certificateHalal.jenis_produk || '',
      //     type: 'select',
      //     disabled: false,
      //     required: true,
      //     key: 'jenis_produk',
      //   },
      //   {
      //     title: 'Merek Dagang',
      //     value: certificateHalal.merk_dagang || '',
      //     type: 'textarea',
      //     required: true,
      //     key: 'merk_dagang',
      //   },
      //   {
      //     title: 'Area Pemasaran',
      //     value: certificateHalal.area_pemasaran || '',
      //     type: 'select',
      //     disabled: false,
      //     required: true,
      //     key: 'area_pemasaran',
      //   },
      //   {
      //     title: 'LPH',
      //     value: certificateHalal.nama_lph || '',
      //     type: 'select',
      //     disabled: false,
      //     required: true,
      //     key: 'lembaga_pendamping',
      //   },
      //   {
      //     title: 'Jenis Pengajuan',
      //     value: certificateHalal.jenis_pengajuan || '',
      //     type: 'select',
      //     disabled: true,
      //     key: 'jenis_pengajuan',
      //   },
      //   {
      //     title: 'Jenis Pendaftaran',
      //     value: certificateHalal.fac_id || '',
      //     type: 'select',
      //     disabled: false,
      //     required: true,
      //   },
      // ]

      // responsibility.value = [
      //   {
      //     title: 'Nama',
      //     value: responsibilityData.nama_pj || '',
      //     type: 'text',
      //     required: false,
      //   },
      //   {
      //     title: 'Nomor Kontak',
      //     value: responsibilityData.nomor_kontak_pj || '',
      //     type: 'text',
      //     required: false,
      //   },
      //   {
      //     title: 'Email',
      //     value: responsibilityData.email_pj || '',
      //     type: 'text',
      //     required: false,
      //   },
      // ]

      // aspectLegalData.value = {
      //   label: [
      //     { title: 'No.', key: 'no', nowrap: true },
      //     { title: 'Jenis', key: 'jenis_surat', nowrap: true },
      //     { title: 'No. Dokumen', key: 'no_surat', nowrap: true },
      //     { title: 'Tanggal', key: 'tanggal_surat', nowrap: true },
      //     { title: 'Masa Berlaku', key: 'masa_berlaku', nowrap: true },
      //     { title: 'Instansi Penerbit', key: 'instansi_penerbit', nowrap: true },
      //     { title: 'Action', key: 'action', nowrap: true },
      //   ],
      //   value: aspectLegal,
      // }

      // factoryData.value = {
      //   label: [
      //     { title: 'No.', key: 'no', nowrap: true },
      //     { title: 'Nama', key: 'nama_pabrik', nowrap: true },
      //     { title: 'Alamat', key: 'alamat_pabrik', nowrap: true },
      //     { title: 'Status', key: 'status_milik', nowrap: true },
      //     { title: 'Action', value: 'action', sortable: false, nowrap: true },
      //   ],
      //   value: factory,
      // }

      outletData.value = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          { title: 'Nama', key: 'nama_outlet', nowrap: true },
          { title: 'Alamat', key: 'alamat_outlet', nowrap: true },
          { title: 'Status', key: 'status_milik', nowrap: true },
          { title: 'Action', value: 'action', sortable: false, nowrap: true },
        ],
        value: outlet,
      }

      // halalData.value = {
      //   label: [
      //     { title: 'No.', key: 'no', nowrap: true },
      //     { title: 'Nama', key: 'penyelia_nama', nowrap: true },
      //     { title: 'Unduh SKPH', key: 'file_skph', nowrap: true },
      //     { title: 'Unduh SPPH', key: 'file_spph', nowrap: true },
      //     { title: 'Unduh KTP', key: 'file_ktp', nowrap: true },
      //     { title: 'No. KTP', key: 'no_ktp', nowrap: true },
      //     { title: 'Agama', key: 'religion', nowrap: true },
      //     { title: 'No/Tgl Sertif Penyelia Halal', key: 'tgl_penyelia_halal', nowrap: true },
      //     { title: 'Action', value: 'action', sortable: false, nowrap: true },
      //   ],
      //   value: penyelia,
      // }
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const editResponsibility = async (body: PayloadPenanggungJawab) => {
  try {
    let url = ''
    if (submitContentType.value === 'Pengajuan Sertifikasi Halal')
      url = '/reguler/pelaku-usaha/certificate'
    else
      url = '/reguler/pelaku-usaha/penanggung-jawab'

    const response: any = await $api(url, {
      method: 'put',
      body,
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      getDetailData()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const handleAddOrEdit = async () => {
  addDialog.value = false
  let body: any = {
    id_reg: props?.id,
  }
  const idPabrik: any = []
  let url = ''
  let method = ''
  switch (titleAddDialog.value) {
  case 'Tambah Data Aspek Legal':
    body = {
      ...body,
      id_legal: [selectedLegalToAdd?.value?.id_legal],
    }
    url = '/reguler/pelaku-usaha/add-legal'
    method = 'post'
    break
  case 'Tambah Data Pabrik':
    listFactory?.value?.value?.map((el: any) => {
      if (el.checked)
        idPabrik.push(el.id)
    })
    body = {
      ...body,
      id_pabrik: idPabrik,
    }
    url = '/reguler/pelaku-usaha/add-factory'
    method = 'post'
    break
  case 'Tambah Data Outlet':
    listOutlet?.value?.value?.map((el: any) => {
      if (el.checked)
        idPabrik.push(el.id)
    })
    body = {
      ...body,
      id_pabrik: idPabrik,
    }
    url = '/reguler/pelaku-usaha/add-factory'
    method = 'post'
    break
  case 'Tambah Data Penyelia Halal':
    //
    url = '/self-declare/business-actor/supervisor/create'
    body = {
      ...body,
      id_penyelia: [
        '90b107ef-8c16-41e7-84ba-25339bf244ce',
      ],
    }
    method = 'post'
    break

  default:
    break
  }
  try {
    const response: any = await $api(url, {
      method,
      body,
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      getDetailData()
      selectedLegalToAdd.value = {}
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const deleteFactoryOrOutlet = async (type: string, el: any) => {
  let url: string = ''
  let id: string = ''
  if (type === 'pabrik') {
    url = '/reguler/pelaku-usaha/delete-factory'
    id = el.id_pabrik
  }
  else if (type === 'outlet') {
    url = '/reguler/pelaku-usaha/delete-factory'
    id = el.id_outlet
  }
  else if (type === 'aspek legal') {
    url = '/reguler/pelaku-usaha/delete-legal'
    id = el.id_reg_legal
  }
  else if (type === 'halal data') {
    url = '/reguler/pelaku-usaha/delete-penyelia'
    id = el.penyelia_id
  }
  try {
    const response: any = await $api(url, {
      method: 'delete',
      body: { id },
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses hapus data', 'success')
      getDetailData()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const handleSubmit = () => {
  let payload: any = {}
  if (submitContentType.value === 'Pengajuan Sertifikasi Halal') {
    payload = payloadData.value
    editResponsibility({
      ...payload,
    })
  }
  else if (submitContentType.value === 'Penanggung Jawab') {
    payload = {
      nama_pj: responsibility?.value?.[0]?.value,
      no_kontak_pj: responsibility?.value?.[1]?.value,
      email_pj: responsibility?.value?.[2]?.value,
    }

    editResponsibility({
      ...payload,
      id_reg: props?.id,
    })
  }
  confirmSaveDialog.value = false
}

onMounted(async () => {
  // await getDetailData()
  await Promise.allSettled([
    getDetailData(),
    loadItemProduct(),
  ])
})
</script>

<template>
  <DialogSaveDataPengajuan
    title="Simpan Perubahan"
    :is-open="confirmSaveDialog"
    :toggle="() => (confirmSaveDialog = false)"
    :on-save="() => handleSubmit()"
  />
  <DialogWithAction
    :title="titleAddDialog"
    :is-open="addDialog"
    :label-save-btn="labelSaveBtn"
    :toggle="() => (addDialog = false)"
    :on-save="handleAddOrEdit"
  >
    <template #content>
      <!-- ADD MODAL DATA ASPEK LEGAL START -->
      <div v-if="addContentType === 'Aspek Legal'">
        <p class="label-pengajuan">
          Jenis Dokumen
        </p>
        <VSelect
          v-model="selectedLegalToAdd"
          :items="props?.list_legal"
          outlined
          class="-mt-5"
          placeholder="pilih jenis dokumen"
          item-title="jenis_surat"
          item-text="jenis_surat"
          return-object
        />
        <br>
        <p class="label-pengajuan">
          Nomor Dokumen
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi nomor dokumen"
          :value="selectedLegalToAdd?.no_surat"
          disabled
        />
        <br>
        <p
          class="text-h6"
          for="startDate"
        >
          Tanggal Dokumen
        </p>
        <VTextField
          id="startDate"
          type="date"
          clearable
          class="-mt-10"
          :value="selectedLegalToAdd?.tgl_surat"
          disabled
        />
        <br>
        <p
          class="text-h6"
          for="startDate"
        >
          Masa Berlaku
        </p>
        <VTextField
          id="startDate"
          type="date"
          clearable
          class="-mt-10"
          :value="selectedLegalToAdd?.masa_berlaku"
          disabled
        />
        <br>
        <p class="label-pengajuan">
          Instansi Penerbit
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi nomor dokumen"
          :value="selectedLegalToAdd?.instansi_penerbit"
          disabled
        />
      </div>
      <!-- ADD MODAL DATA ASPEK LEGAL END -->
      <!-- ADD MODAL DATA PABRIK START -->
      <div v-if="addContentType === 'Pabrik'">
        <VDataTable
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
          :headers="listFactory.label"
          :items="listFactory.value"
        >
          <template #item.no="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #item.nama="{ item }">
            <div class="mw30">
              {{ item.nama }}
            </div>
          </template>
          <template #item.publication="{ item }">
            <!-- <VCheckbox true-value="true" /> -->
            <VCheckbox
              v-model="item.checked"
              :checked="item.checked"
            />
          </template>
        </VDataTable>
      </div>
      <!-- ADD MODAL DATA PABRIK END -->
      <!-- ADD MODAL DATA OUTLET START -->
      <div v-if="addContentType === 'Outlet'">
        <VDataTable
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
          :headers="listOutlet.label"
          :items="listOutlet.value"
        >
          <template #item.no="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #item.nama="{ item }">
            <div class="mw30">
              {{ item.nama }}
            </div>
          </template>
          <template #item.publication="{ item }">
            <!-- <VCheckbox true-value="true" /> -->
            <VCheckbox
              v-model="item.checked"
              :checked="item.checked"
            />
          </template>
        </VDataTable>
      </div>
      <!-- ADD MODAL DATA PABRIK END -->
      <!-- ADD MODAL DATA PENYELIA HALAL START -->
      <div v-if="addContentType === 'Penyelia Halal'">
        <VDataTable
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
          :headers="listPenyelia.label"
          :items="listPenyelia.value"
        >
          <template #item.no="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #item.nama="{ item }">
            <div class="mw30">
              {{ item.nama }}
            </div>
          </template>
          <template #item.publication="{ item }">
            <!-- <VCheckbox true-value="true" /> -->
            <VCheckbox
              v-model="item.checked"
              :checked="item.checked"
            />
          </template>
        </VDataTable>
      </div>
      <!-- ADD MODAL DATA PENYELIA HALAL END -->
    </template>
  </DialogWithAction>
  <div v-if="!loading">
<!--    <FormData-->
<!--      :id="props?.id"-->
<!--      :on-submit="(payload: any) => triggerSaveModal(payload, 'Pengajuan Sertifikasi Halal')"-->
<!--      :data="requestCertificateData"-->
<!--      :product_type="itemsProduct"-->
<!--      :service_type="props?.list_channel"-->
<!--      title="Pengajuan Sertifikasi Halal"-->
<!--    />-->
<!--    <br>-->
<!--    <FormData-->
<!--      :on-submit="() => triggerSaveModal(null, 'Penanggung Jawab')"-->
<!--      :data="responsibility"-->
<!--      title="Penanggung Jawab"-->
<!--    />-->
<!--    <br>-->
<!--    <TableData-->
<!--      :on-submit="() => triggerSaveModal(null, 'Aspek Legal')"-->
<!--      :on-add="() => triggerAddModal('Aspek Legal')"-->
<!--      :on-delete="(el: any) => deleteFactoryOrOutlet('aspek legal', el)"-->
<!--      :data="aspectLegalData"-->
<!--      title="Aspek Legal"-->
<!--      with-add-button-->
<!--    />-->
<!--    <br>-->

<!--    <TableData-->
<!--      :on-submit="() => triggerSaveModal(null, 'Pabrik')"-->
<!--      :on-add="() => triggerAddModal('Pabrik')"-->
<!--      :on-delete="(el: any) => deleteFactoryOrOutlet('pabrik', el)"-->
<!--      :data="factoryData"-->
<!--      title="Pabrik"-->
<!--      with-add-button-->
<!--    />-->
    <br>
    <TableData
      :on-submit="() => triggerSaveModal(null, 'Outlet')"
      :on-add="() => triggerAddModal('Outlet')"
      :on-delete="(el: any) => deleteFactoryOrOutlet('outlet', el)"
      :data="outletData"
      title="Outlet"
      with-add-button
    />
<!--    <br>-->
<!--    <TableData-->
<!--      :on-submit="() => triggerSaveModal(null, 'Penyelia Halal')"-->
<!--      :on-add="() => triggerAddModal('Penyelia Halal')"-->
<!--      :data="halalData"-->
<!--      :on-delete="(el: any) => deleteFactoryOrOutlet('halal data', el)"-->
<!--      title="Penyelia Halal"-->
<!--      with-add-button-->
<!--    />-->
  </div>
  <div v-else>
    <VSkeletonLoader
      v-for="i in 3"
      :key="i"
      type="list-item-two-line"
    />
  </div>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}

.-mt-5 {
  margin-top: -5px;
}

.-mt-10 {
  margin-top: -10px;
}
</style>
