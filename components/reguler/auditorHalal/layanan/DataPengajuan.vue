<!-- eslint-disable sonarjs/no-duplicated-branches -->
<!-- eslint-disable @stylistic/ts/indent -->
<!-- eslint-disable indent -->
<!-- eslint-disable vue/prop-name-casing -->
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
  isviewonly: {
    type: Boolean,
  },
})

const { t } = useI18n()

interface PayloadPenanggungJawab {
  id_reg: string
  nama_pj: string
  no_kontak_pj: string
  email_pj: string
}

const itemsProduct = ref<any>(null)
const confirmSaveDialog = ref(false)
const loadingAll = ref(true)
const addDialog = ref(false)
const titleAddDialog = ref('')
const submitContentType = ref('')
const addContentType = ref('')
const labelSaveBtn = ref('')
const labelBackBtn = ref('')
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
const facId = ref('')
const facMessage = ref('')
const inputFacId = ref('')

const listFactory = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-fac-nama',
      key: 'nama',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-fac-alamat',
      key: 'alamat',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-fac-status',
      key: 'status_milik',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-fac-action',
      key: 'publication',
      sortable: false,
      nowrap: true,
    },
  ],
  value: props?.list_factory || [],
})

const listOutlet = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-nama',
      key: 'nama',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-alamat',
      key: 'alamat',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-status',
      key: 'status_milik',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-action',
      key: 'publication',
      sortable: false,
      nowrap: true,
    },
  ],
  value: props?.list_outlet || [],
})

const listPenyelia = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-ph-popup-nama',
      key: 'nama',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-ph-popup-ktp',
      key: 'no_ktp',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-ph-popup-agama',
      key: 'agama',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-ph-popup-sertif',
      key: 'tgl_penyelia_halal',
      nowrap: true,
    },
    {
      title: 'pengajuan-reguler.reguler-form--pengajuan-ph-popup-action',
      key: 'publication',
      sortable: false,
      nowrap: true,
    },
  ],
  value:
    props?.list_penyelia.map(i => ({
      ...i,
      agama: 'Islam', // HARDCODE ISLAM
      tgl_penyelia_halal: i.no_sertifikat,
    })) || [],
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
  {
    nama: t(
      'pengajuan-reguler.reguler-form--pengajuan-doc-permission-circulation',
    ),
    fileName: 'Surat Izin Usaha.pdf',
    file: null,
  },
  {
    nama: t('pengajuan-reguler.reguler-form--pengajuan-doc-permission'),
    fileName: '',
    file: null,
  },
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
  console.log(payload)
  submitContentType.value = type
  payloadData.value = payload
  confirmSaveDialog.value = true
}

const triggerAddModal = (type: any) => {
  addContentType.value = type

  addDialog.value = true
  titleAddDialog.value = `${t(
    'pengajuan-reguler.reguler-form--pengajuan-fac-add',
  )} ${t(type)}`

  // titleAddDialog.value = `Tambah Data ${type}`;
  labelSaveBtn.value = t('pengajuan-reguler.reguler-form--pengajuan-legal-add')
  labelBackBtn.value = t(
    'pengajuan-reguler.reguler-form--pengajuan-legal-popup-cancel',
  )
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
      const certificateHalal = response?.data?.certificate_halal
      const responsibilityData = response?.data?.penanggung_jawab
      const aspectLegal = response?.data?.aspek_legal
      const factory = response?.data?.pabrik
      const outlet = response?.data?.outlet
      const penyelia = response?.data?.penyelia_halal

      facId.value = certificateHalal?.kode_fac
      facMessage.value = `${certificateHalal?.kode_fac ?? ''} - ${certificateHalal?.fasilitator_name ?? ''}`

      requestCertificateData.value = [
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-namapu',
          value: certificateHalal.nama_pu || '',
          type: 'text',
          required: true,
          key: 'nama_pu',
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-nomohon',
          value: certificateHalal.no_mohon || '',
          type: 'text',
          required: true,
          key: 'no_mohon',
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-tglmohon',
          value: certificateHalal.tgl_daftar || '',
          type: 'text',
          required: true,
          key: 'tgl_mohon',
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnslay',
          value: certificateHalal.jenis_layanan || '',
          type: 'select',
          disabled:
            certificateHalal.jenis_pengajuan == 'Pengembangan',
          required:
            certificateHalal.jenis_pengajuan != 'Pengembangan',
          key: 'jenis_layanan',
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnsprod',
          value: certificateHalal.jenis_produk || '',
          type: 'select',
          disabled:
            certificateHalal.jenis_pengajuan == 'Pengembangan',
          required:
            certificateHalal.jenis_pengajuan != 'Pengembangan',
          key: 'jenis_produk',
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-merek',
          value: certificateHalal.merk_dagang || '',
          type: 'textarea',
          required: true,
          key: 'merk_dagang',
        },
        {
          title:
            'pengajuan-reguler.reguler-form--pengajuan-pengajuan-marketing',
          value: certificateHalal.area_pemasaran || '',
          type: 'select',
          disabled: false,
          required: true,
          key: 'area_pemasaran',
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-lph',
          value: certificateHalal.nama_lph || '',
          type: 'select',
          disabled:
            certificateHalal.jenis_pengajuan == 'Pengembangan',
          required:
            certificateHalal.jenis_pengajuan != 'Pengembangan',
          key: 'lembaga_pendamping',
        },
        {
          title:
            'pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnspengajuan',
          value: certificateHalal.jenis_pengajuan || '',
          type: 'select',
          disabled: true,
          key: 'jenis_pengajuan',
        },
        {
          title:
            'pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnsdaftar',
          value: certificateHalal.channel || '',
          type: 'select',
          disabled: false,
          required: false,
        },
      ]

      responsibility.value = [
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pic-nama',
          value: responsibilityData.nama_pj || '',
          type: 'text',
          required: false,
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pic-telp',
          value: responsibilityData.nomor_kontak_pj || '',
          type: 'text',
          required: false,
        },
        {
          title: 'pengajuan-reguler.reguler-form--pengajuan-pic-email',
          value: responsibilityData.email_pj || '',
          type: 'text',
          required: false,
        },
      ]

      aspectLegalData.value = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-legal-jenis',
            key: 'jenis_surat',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-legal-nodok',
            key: 'no_surat',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-legal-tanggal',
            key: 'tanggal_surat',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-legal-expired',
            key: 'masa_berlaku',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-legal-issuer',
            key: 'instansi_penerbit',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-legal-action',
            key: 'action',
            nowrap: true,
          },
        ],
        value: aspectLegal,
      }

      factoryData.value = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-fac-nama',
            key: 'nama_pabrik',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-fac-alamat',
            key: 'alamat_pabrik',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-fac-status',
            key: 'status_milik',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-fac-action',
            value: 'action',
            sortable: false,
            nowrap: true,
          },
        ],
        value: factory,
      }

      outletData.value = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-nama',

            key: 'nama_outlet',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-alamat',
            key: 'alamat_outlet',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-status',
            key: 'status_milik',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-out-popup-action',
            value: 'action',
            sortable: false,
            nowrap: true,
          },
        ],
        value: outlet,
      }

      halalData.value = {
        label: [
          { title: 'No.', key: 'no', nowrap: true },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-nama',
            key: 'penyelia_nama',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-downloadskph',
            key: 'file_skph',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-downloadspph',
            key: 'file_spph',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-downloadktp',
            key: 'file_ktp',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-ktp',
            key: 'no_ktp',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-popup-agama',
            key: 'religion',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-sertif',
            key: 'tgl_penyelia_halal',
            nowrap: true,
          },
          {
            title: 'pengajuan-reguler.reguler-form--pengajuan-ph-popup-action',
            value: 'action',
            sortable: false,
            nowrap: true,
          },
        ],
        value: penyelia,
      }
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

    if (
      submitContentType.value
      === t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-title')
    )
      url = '/reguler/pelaku-usaha/certificate'
    else url = '/reguler/pelaku-usaha/penanggung-jawab'

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
    console.log(error)

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
    case t('pengajuan-reguler.reguler-detail-legal-title'):
      body = {
        ...body,
        id_legal: [selectedLegalToAdd?.value?.id_legal],
      }
      url = '/reguler/pelaku-usaha/add-legal'
      method = 'post'
      break
    case 'Tambah Aspek Legal':
      body = {
        ...body,
        id_legal: [selectedLegalToAdd?.value?.id_legal],
      }
      url = '/reguler/pelaku-usaha/add-legal'
      method = 'post'
      break
    case t('pengajuan-reguler.reguler-form--pengajuan-fac-popup-title'):
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
    case t('pengajuan-reguler.reguler-form--pengajuan-out-title'):
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
    case 'Tambah Outlet':
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
    case t('pengajuan-reguler.reguler-detail-ph-title'):
      url = '/self-declare/business-actor/supervisor/create'
      body = {
        ...body,
        id_penyelia: listPenyelia.value.value
          .filter(item => item.checked)
          .map(i => i.id_penyelia),
      }
      method = 'post'
      break
    case 'Tambah Penyelia Halal':
      url = '/self-declare/business-actor/supervisor/create'
      body = {
        ...body,
        id_penyelia: listPenyelia.value.value
          .filter(item => item.checked)
          .map(i => i.id_penyelia),
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

const withFacilitator = async (idData: string) => {
  inputFacId.value = idData
}

const handleSubmit = () => {
  let payload: any = {}

  if (
    submitContentType.value
    === t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-title')
  ) {
    if (payloadData.value === 'error') {
      confirmSaveDialog.value = false
      useSnackbar().sendSnackbar('Lengkapi semua data', 'error')
    }
 else {
      if (
        requestCertificateData.value?.[9].value
          === 'Pendaftaran Melalui Fasilitasi'
        || requestCertificateData.value?.[9].value === 'CH002'
      ) {
        payload = {
          ...payloadData.value,
          channel_id: 'CH002',
          fac_id: inputFacId.value,
        }
      }
 else {
        payload = {
          ...payloadData.value,
          channel_id: 'CH001',
          fac_id: '',
        }
      }
      editResponsibility({
        ...payload,
      })
    }
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
  await Promise.allSettled([getDetailData(), loadItemProduct()])
})

onMounted(async () => {
  const res: any = await Promise.all([getDetailData(), loadItemProduct()])

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined
  })

  if (checkResIfUndefined)
    loadingAll.value = false
   else
    loadingAll.value = false
})
</script>

<template>
  <DialogSaveDataPengajuan
    :title=" t('pengajuan-reguler.reguler-form-head-simpan')"
    :is-open="confirmSaveDialog"
    :toggle="() => (confirmSaveDialog = false)"
    :on-save="() => handleSubmit()"
  />
  <DialogWithAction
    :title="titleAddDialog"
    :is-open="addDialog"
    :label-save-btn="labelSaveBtn"
    :label-back-btn="labelBackBtn"
    :toggle="() => (addDialog = false)"
    :on-save="handleAddOrEdit"
  >
    <template #content>
      <!-- ADD MODAL DATA ASPEK LEGAL START -->
      <div
        v-if="
          t(addContentType)
            === t('pengajuan-reguler.reguler-detail-legal-title')
        "
      >
        <p class="label-pengajuan">
          {{ t("pengajuan-reguler.reguler-form--pengajuan-legal-popup-jenis") }}
        </p>
        <VSelect
          v-model="selectedLegalToAdd"
          :items="props?.list_legal"
          outlined
          class="-mt-5"
          :placeholder="
            t('pengajuan-reguler.reguler-form--pengajuan-legal-popup-jenis-1')
          "
          item-title="jenis_surat"
          item-text="jenis_surat"
          return-object
        />
        <br>
        <p class="label-pengajuan">
          {{ t("pengajuan-reguler.reguler-form--pengajuan-legal-popup-nodok") }}
        </p>
        <VTextField
          class="-mt-10"
          :placeholder="
            t('pengajuan-reguler.reguler-form--pengajuan-legal-popup-nodok-1')
          "
          :value="selectedLegalToAdd?.no_surat"
          disabled
        />
        <br>
        <p
          class="text-h6"
          for="startDate"
        >
          {{
            t("pengajuan-reguler.reguler-form--pengajuan-legal-popup-tanggal")
          }}
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
          {{
            t("pengajuan-reguler.reguler-form--pengajuan-legal-popup-expired")
          }}
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
          {{
            t("pengajuan-reguler.reguler-form--pengajuan-legal-popup-issuer")
          }}
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
      <div
        v-if="
          t(addContentType)
            === t('pengajuan-reguler.reguler-form--pengajuan-fac-popup-title')
        "
      >
        <VDataTable
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
          :headers="listFactory.label"
          :items="listFactory.value"
        >
          <template #header.nama="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>

          <template #header.alamat="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>

          <template #header.status_milik="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>
          <template #header.publication="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>

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
      <div
        v-if="
          t(addContentType)
            === t('pengajuan-reguler.reguler-form--pengajuan-out-title')
        "
      >
        <VDataTable
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
          :headers="listOutlet.label"
          :items="listOutlet.value"
        >
          <template #header.nama="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>

          <template #header.alamat="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>

          <template #header.status_milik="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>
          <template #header.publication="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>

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

      <div
        v-if="
          t(addContentType) === t('pengajuan-reguler.reguler-detail-ph-title')
        "
      >
        <VDataTable
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
          :headers="listPenyelia.label"
          :items="listPenyelia.value"
        >
          <template #header.nama="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>
          <template #header.no_ktp="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>
          <template #header.agama="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>
          <template #header.tgl_penyelia_halal="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>
          <template #header.publication="{ column }">
            <div class="text-blue font-bold">
              {{ t(column.title) }}
            </div>
          </template>

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
  <div v-if="!loadingAll">
    <FormData
      :id="props?.id"
      :on-submit="(payload: any) => triggerSaveModal(payload, t(`pengajuan-reguler.reguler-form--pengajuan-pengajuan-title`))"
      :data="requestCertificateData"
      :product_type="itemsProduct"
      :service_type="props?.list_channel"
      :title="t(`pengajuan-reguler.reguler-form--pengajuan-pengajuan-title`)"
      :isviewonly="props?.isviewonly"
      :fac-id="facId"
      :fac-message="facMessage"
      @complete="withFacilitator"
    />
    <br>
    <FormData
      :on-submit="() => triggerSaveModal(null, 'Penanggung Jawab')"
      :data="responsibility"
      :title="t(`pengajuan-reguler.reguler-form--pengajuan-pic-title`)"
      :isviewonly="props?.isviewonly"
    />
    <br>
    <TableData
      :on-submit="() => triggerSaveModal(null, 'Aspek Legal')"
      :on-add="
        () => triggerAddModal(t('pengajuan-reguler.reguler-detail-legal-title'))
      "
      :on-delete="(el: any) => deleteFactoryOrOutlet('aspek legal', el)"
      :data="aspectLegalData"
      :title="t('pengajuan-reguler.reguler-form--pengajuan-legal-title')"
      with-add-button
      :isviewonly="props?.isviewonly"
    />
    <br>

    <TableData
      :on-submit="() => triggerSaveModal(null, 'Pabrik')"
      :on-add="
        () =>
          triggerAddModal(
            t('pengajuan-reguler.reguler-form--pengajuan-fac-popup-title'),
          )
      "
      :on-delete="(el: any) => deleteFactoryOrOutlet('pabrik', el)"
      :data="factoryData"
      :title="t('pengajuan-reguler.reguler-form--pengajuan-fac-title')"
      with-add-button
      :isviewonly="props?.isviewonly"
    />
    <br>
    <TableData
      :on-submit="() => triggerSaveModal(null, 'Outlet')"
      :on-add="
        () =>
          triggerAddModal(
            t('pengajuan-reguler.reguler-form--pengajuan-out-title'),
          )
      "
      :on-delete="(el: any) => deleteFactoryOrOutlet('outlet', el)"
      :data="outletData"
      :title="t('pengajuan-reguler.reguler-form--pengajuan-out-title')"
      with-add-button
      :isviewonly="props?.isviewonly"
    />
    <br>
    <TableData
      :on-submit="() => triggerSaveModal(null, 'Penyelia Halal')"
      :on-add="
        () => triggerAddModal(t('pengajuan-reguler.reguler-detail-ph-title'))
      "
      :data="halalData"
      :on-delete="(el: any) => deleteFactoryOrOutlet('halal data', el)"
      :title="t('pengajuan-reguler.reguler-form--pengajuan-ph-title')"
      with-add-button
      :isviewonly="props?.isviewonly"
    />
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
  margin-block-start: -5px;
}

.-mt-10 {
  margin-block-start: -10px;
}
</style>
