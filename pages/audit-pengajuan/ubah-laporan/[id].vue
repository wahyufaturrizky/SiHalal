<script setup lang="ts">
import { ref } from 'vue'

const panelCertificateRequest = ref([0, 1])
const route = useRoute()
const id = route?.params?.id
const reRender = ref(false)
const confirmSaveDialog = ref(false)
const addDialog = ref(false)
const titleAddDialog = ref('')
const labelSaveBtn = ref('')

const outletData = ref({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'nama_outlet', nowrap: true },
    { title: 'Alamat', key: 'alamat_outlet', nowrap: true },
    { title: 'Status', key: 'status_milik', nowrap: true },
    { title: 'Action', value: 'action', sortable: false, nowrap: true },
  ],
  value: [],
})

const addContentType = ref('')
const submitContentType = ref('')
const loading = ref(false)

const itemDetail = ref<any>({})

const uploadedFile = ref({
  name: '',
  file: null,
})

const toggleAdd = (type: string) => {
  addDialog.value = true
  titleAddDialog.value = `Tambah ${type}`
  labelSaveBtn.value = type === 'Data Bahan' ? 'Unggah' : 'Tambah'
}

const triggerAddModal = (type: string) => {
  console.log('MASUK SINI ', addDialog)
  addDialog.value = true
  console.log('MASUK SINI 2', addDialog)
  addContentType.value = type
  titleAddDialog.value = `Tambah Data ${type}`
  labelSaveBtn.value = 'Tambah'
}

const triggerSaveModal = (type: string) => {
  submitContentType.value = type
  confirmSaveDialog.value = true
}

const requestDataHalal = ref([
  { title: 'Nama Perusahaan', value: 'PT Bahagia Sentosa', type: 'text' },
  { title: 'Alamat Perusahaan', value: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio', type: 'text' },
  { title: 'NIB', value: '83472896', type: 'text' },
  { title: 'Skala Usaha', value: 'Mikro', type: 'select', disabled: false },
  { title: 'Nama Pimpinan', value: 'Bambang', type: 'text' },
  { title: 'Nama Fasilitas', value: 'Es Cream', type: 'select', disabled: false },
  { title: 'Alamat Fasilitas', value: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio', type: 'text' },
  {
    type: 'date',
    data: [
      {
        title: 'Tanggal Mulai', value: '11/11/2024', type: 'date',
      },
      {
        title: 'Tanggal Selesai', value: '12/11/2024', type: 'date',
      },
    ],
  },
  { title: 'Jenis Produk', value: 'Minuman Bahagia', type: 'select', disabled: true },
  { title: 'Nama / Merk Produk', value: 'Minuman Bahagia Lvl 2', type: 'select', disabled: true },
  { title: 'Pengujian Laboratorium', value: 'Ada', type: 'select', disabled: false },
  { title: 'Hasil Audit', value: 'LULUS', type: 'select', disabled: false },
  // { title: 'Hasil Pengujian', value: 'Es Cream', type: 'textarea' },
  // { title: 'Catatan', value: 'Es Cream', type: 'textarea' },
])


const saveHasilAudit = async () => {
  console.log("TREST ")
  console.log("SAVE UBAH PELAPORAN : ", requestDataHalal)

  const hasilPengujianLab = requestDataHalal.value.filter(i => i.title === 'Pengujian Laboratorium')[0].value
  const hasilAudit = requestDataHalal.value.filter(i => i.title === 'Hasil Audit')[0].value
  const keterangan = requestDataHalal.value.filter(i => i.title === 'Hasil Pengujian')[0].value


  const body = {
    pengujian_laboratorium: hasilPengujianLab, // Ada / Tidak Ada
    hasil_audit: hasilAudit, // LULUS / TIDAK LULUS
    keterangan: keterangan
  }

  try {
    const response: any = await $api(`/reguler/auditor/${id}/save-hasil-audit`, {
      method : 'post',
      body : body
    })

    console.log("RESPONSE : ", response)

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadProsesProduk()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }

  console.log("BODY SAVE HASIL AUDIT : ", body)
}

const loadItem = async (): void => {
  console.log('loaditem')
  try {
    const response = await $api(`/reguler/auditor/ubah-laporan/${id}`, {
      method: 'GET',
      params: { id },
    })

    if (response.code === 2000) {
      // TODO -> MAPPING VALUE
      const data = response.data

      // REQUEST DATA HALAL
      requestDataHalal.value = [
        { title: 'Nama Perusahaan', value: data.pengajuan_sertifikat?.nama_pu, type: 'text' },
        { title: 'Alamat Perusahaan', value: data.pengajuan_sertifikat?.alamat, type: 'text' },
        { title: 'NIB', value: data.pengajuan_sertifikat?.nib, type: 'text' },
        { title: 'Skala Usaha', value: data.pengajuan_sertifikat?.skala_usaha, type: 'select', disabled: true },
        { title: 'Nama Pimpinan', value: data.pengajuan_sertifikat?.nama_pimpinan, type: 'text' },
        { title: 'Nama Fasilitas', value: data.pengajuan_sertifikat?.nama_fasilitas, type: 'select', disabled: true },
        { title: 'Alamat Fasilitas', value: data.pengajuan_sertifikat?.alamat_fasilitas, type: 'text' },
        {
          type: 'date',
          data: [
            {
              title: 'Tanggal Mulai', value: data.pengajuan_sertifikat?.tanggal_mulai, type: 'date',
            },
            {
              title: 'Tanggal Selesai', value: data.pengajuan_sertifikat?.tanggal_selesai, type: 'date',
            },
          ],
        },
        { title: 'Jenis Produk', value: data.pengajuan_sertifikat?.jenis_produk, type: 'select', disabled: true },
        { title: 'Nama / Merk Produk', value: data.pengajuan_sertifikat?.nama_produk, type: 'select', disabled: true },
        { title: 'Pengujian Laboratorium', value: 'Ada', type: 'select', disabled: false },
        { title: 'Hasil Audit', value: 'Lulus', type: 'select', disabled: false },
        // { title: 'Hasil Pengujian', value: 'Es Cream', type: 'textarea' },
        // { title: 'Catatan', value: 'Es Cream', type: 'textarea' },
      ]

      if(data.pengajuan_sertifikat.pengujian === 'Ada'){
        requestDataHalal.value.push({ title: 'Hasil Pengujian', value: 'Es Cream', type: 'textarea' })
      }

      if(data.pengajuan_sertifikat.hasil_audit !== 'LULUS'){
        requestDataHalal.value.push({ title: 'Catatan', value: 'Es Cream', type: 'textarea' })
      }

      // materialData.value.value = data.bahan.map(
      //   (v, i) => ({
      //     no: i + 1,
      //     materialName: v.nama_bahan,
      //     priority: v.kriteria,
      //     findings: v.temuan,
      //     information: v.keterangan,
      //   }))

      // processData.value.value = data.proses_produk_halal.map(
      //   (v, i) => ({
      //     no: i + 1,
      //     requirement: v.persyaratan,
      //     explanation: v.penjelasan,
      //   }))

      registrationProductData.value.value = data.produk.map(
        (v, i) => ({ no: i + 1, name: v.nama_produk, foto: v.photo }))

      outletData.value.value = data.outlet.map(
        (v, i) => ({
          no: i + 1,
          nama_outlet: v.nama_outlet,
          alamat_outlet: v.alamat_outlet,
        }))

      summaryData.value.value = data.kesimpulan.map(
        (v, i) => ({
          no: i + 1,
          criteria: v.kriteria,
          matcher: v.kesesuaian,
          information: v.keterangan,
        }))

      auditorListData.value.value = data.auditor.map(
        (v, i) => ({
          no: i + 1,
          name: v.nama_auditor,
          birthdate: v.tgl_lahir,
          registrationNo: v.no_reg,
        }),
      )
    }
  }
  catch (e) {
    console.log('ERROR : ', e)
    useSnackbar().sendSnackbar('Terjadi Kesalahan ', 'error')
  }
}

onMounted(async () => {
  loading.value = true
  await loadItemProductClasifications()
  await loadBahanDukung()
  await loadItem()
  await loadJenisKeteranganBahan()
  await loadProsesProduk()
  loading.value = false
})

const materialData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Bahan', key: 'materialName', nowrap: true },
      { title: 'Kritis / Tidak Kritis', key: 'priority', nowrap: true },
      { title: 'Temuan', key: 'findings', nowrap: true },
      { title: 'Keterangan', key: 'information', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
    ],
  },
)

const processData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Persyaratan', key: 'requirement', nowrap: true },
      { title: 'Penjelasan', key: 'explanation', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
    ],
  },
)

const registrationProductData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Produk', key: 'name', nowrap: true },
      { title: 'Foto Produk', key: 'foto', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, name: 'Proses', foto: 'file' },
      { no: 2, name: 'Kriteria', foto: 'file' },
    ],
  },
)

// const outletData = ref(
//   {
//     label: [
//       { title: 'No.', key: 'no', nowrap: true },
//       { title: 'Nama Outlet', key: 'name', nowrap: true },
//       { title: 'Address', key: 'address', nowrap: true },
//       { title: 'Action', value: 'action', sortable: false, nowrap: true },
//     ],
//     value: [
//     ],
//   },
// )

const summaryData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Kriteria', key: 'criteria', nowrap: true },
      { title: 'Kesesuaian', key: 'matcher', nowrap: true },
      { title: 'keterangan', key: 'information', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
    ],
  },
)

const auditorListData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'name', nowrap: true },
      { title: 'Tanggal Lahir', key: 'birthdate', nowrap: true },
      { title: 'No. Pendaftaran', key: 'registrationNo', nowrap: true },

      // { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      // { no: 1, name: 'Proses', birthdate: '16/12/1999', registrationNo: '-' },
      // { no: 2, name: 'Kriteria', birthdate: '16/12/1999', registrationNo: 'SH 213618969 er' },
    ],
  },
)

const fasilityOptions = ref(
  [
  ],
)

const getSelectOptions = field => {
  let data = []
  switch (field) {
  case 'Skala Usaha':
    data = ['Mikro', 'Kecil', 'Menengah', 'Besar']
      break;
  case 'Nama Fasilitas':
    data = fasilityOptions.value
      break;
  case 'Pengujian Laboratorium':
    data = ['Ada', 'Tidak Ada']
      break;
  case 'Hasil Audit':
    data = ['LULUS', 'TIDAK LULUS']
      break;
  default:
    break;
  }

  return data
}

const shouldShowHasilPengujian = computed(() => {
  const labTesting = requestDataHalal.value.find(
    item => item.title === 'Pengujian Laboratorium',
  )

  return labTesting && labTesting.value === 'Ada'
})

const shouldShowCatatan = computed(() => {
  const auditResult = requestDataHalal.value.find(
    item => item.title === 'Hasil Audit',
  )

  return auditResult && auditResult.value === 'Lulus'
})

const triggerDialog = type => {

}

// PRODUK :
const productName = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Produk', key: 'nama', nowrap: true },
      { title: 'Foto Produk', key: 'foto', nowrap: true },
      { title: 'Action', value: 'actionPopOver3', sortable: false, nowrap: true, popOver: true },
    ],
    value: [],
  },
)

const getDetailProduk = async (productId: string, type: string) => {
  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-bahan/products/detail',
    {
      method: 'get',
      params: { id_reg: id, product_id: productId },
    },
  )

  if (response.code === 2000) {
    itemDetail.value = response.data || {}
    uploadedFile.value = {
      name: response?.data?.foto_produk,
      file: response?.data?.foto_produk,
    }
    addDialog.value = true
    titleAddDialog.value = type === 'edit' ? 'Ubah Nama Produk' : 'Detail Nama Produk'
    labelSaveBtn.value = type === 'edit' ? 'Ubah' : 'Detail'
  }
}

const deleteProduct = async (productId: string) => {
  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-bahan/products/remove',
    {
      method: 'delete',
      params: { id_reg: id, product_id: productId },
    },
  )

  if (response.code === 2000) {
    reRender.value = !reRender.value
    useSnackbar().sendSnackbar('Sukses menghapus data', 'success')
  }
}

const deleteFactoryOrOutlet = async (type: string, el: any) => {
  const url: string = '/reguler/pelaku-usaha/delete-factory'
  const id: string = el.id_outlet
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

const listOutlet = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'nama', nowrap: true },
    { title: 'Alamat', key: 'alamat', nowrap: true },
    { title: 'Status', key: 'status_milik', nowrap: true },
    { title: 'Action', key: 'publication', sortable: false, nowrap: true },
  ],
  value: [], // TODO -> GET LIST OUTLET
})

const listFactory = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Nama', key: 'nama', nowrap: true },
    { title: 'Alamat', key: 'alamat', nowrap: true },
    { title: 'Status', key: 'status_milik', nowrap: true },
    { title: 'Action', key: 'publication', sortable: false, nowrap: true },
  ],
  value: [],
})

// PRODUK
const loadingRincian = ref(false)
const listRincian = ref([])
const dataProductClasification = ref([])

const formData = ref({
  kode_rincian: '',
  nama_produk: '',
  foto_produk: null,
})

const loadItemProductRincian = async (kode_rincian: string) => {
  loadingRincian.value = true
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/rincian/${kode_rincian}`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      listRincian.value = response.data || []
      loadingRincian.value = false
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
      loadingRincian.value = false
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan aaa', 'error')
    loadingRincian.value = false
  }
}

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData()

    formData.append('id', String(id))
    formData.append('file', file)
    formData.append('type', 'produk')

    return await $api('/shln/submission/document/upload', {
      method: 'post',
      body: formData,
    })
  }
  catch (error) {
    useSnackbar().sendSnackbar(
      'ada kesalahan saat upload file, gagal menyimpan!',
      'error',
    )
  }
}

const handleUploadFile = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0]

    uploadedFile.value.name = fileData.name
    uploadedFile.value.file = fileData
    try {
      const response = await uploadDocument(fileData)
      if (response.code === 2000)
        formData.value.foto_produk = response.data.file_url
    }
    catch (error) {
      console.log(error)
    }
  }
}

const handleRemoveFile = () => {
  uploadedFile.value.name = ''
  uploadedFile.value.file = null
  formData.value.foto_produk = ''
}

const loadItemProductClasifications = async () => {
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/clasification/${id}`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      console.log('RESPONSE PRODUK CLASSIFICATION  :', response)
      dataProductClasification.value = response.data || []

      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}


// PROSES PRODUK
const loadProsesProduk = async () => {
  console.log('LOAD DATA DUKUNG START ')
  try {
    const response = await $api(
      `/reguler/auditor/${id}/proses-produk`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      console.log('RESPONSE GET PROSE PRODUK  :', response)

      const data = response.data

      processData.value = {
        label: processData.value.label,
        value: data.proses_produk_halal?.map(
          (v, i) => ({
            no: i + 1,
            explanation: v.penjelasan,
            requirement: v.persyaratan,
            id_proses_produk_halal: v.id_proses_produk_halal,

          })),
      }
      console.log('process data : ', materialData)

      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const addProsesProduk = async (item) => {
  console.log("ITEM ADD PROSES PRODUK: ", item)
  try {
    const response: any = await $api(`/reguler/auditor/${id}/add-proses-produk`, {
      method : 'post',
      body : {
        persyaratan: item.value.persyaratan,
        penjelasan: item.value.penjelasan
      }
    })

    console.log("RESPONSE : ", response)

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadProsesProduk()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}


// BAHAN DUKUNG METHOD
const jenisKeteranganBahan = ref([])
const loadJenisKeteranganBahan = async () => {
  try {
    const response: any = await $api("/master/jenis-keterangan", {
      method: "get",
    });

    if (response.length > 0) {
      jenisKeteranganBahan.value = response.map(
        i => ({
          title: i.name,
          value: i.code
        })
      )
      console.log("jenis keterangan : ", jenisKeteranganBahan)
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const addDataDukung = async (item) => {
  console.log("ITEM ADD DATA DUKUNG 2: ", item)
  try {
    const response: any = await $api(`/reguler/auditor/${id}/add-bahan-dukung`, {
      method : 'post',
      body : {
        id_reg_bahan: item.value.namaBahan,
        nama_bahan: opsiBahan.value.filter(i => i.value === item.value.namaBahan)[0].title,
        diragukan: item.value.statusKeraguan,
        kriteria_bahan: item.value.kriteriaBahan,
        keterangan: item.value.keterangan
      }
    })

    console.log("RESPONSE : ", response)

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      loadBahanDukung()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}
const updateDataDukung = async (item) => {
  console.log("ITEM UPDATE DATA DUKUNG 2: ", item)
  try {
    const body = {
      id_reg_bahan: item.id_reg_bahan,
      id_bahan_data_dukung: item.id_bahan_data_dukung,
      nama_bahan: item.materialName,
      diragukan: item.diragukan,
      kriteria_bahan: item.priority,
      keterangan: item.information
    }
    const response: any = await $api(`/reguler/auditor/${id}/update-bahan-dukung`, {
      method : 'put',
      body : body
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      loadBahanDukung()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}
const opsiBahan = ref([])
const loadBahanDukung = async () => {
  console.log('LOAD DATA DUKUNG START ')
  try {
    const response = await $api(
      `/reguler/auditor/${id}/bahan-dukung`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      console.log('RESPONSE GET BAHAN DUKUNG  :', response)

      const data = response.data

      materialData.value = {
        label: materialData.value.label,
        value: data.bahan?.map(
          (v, i) => ({
            no: i + 1,
            id_reg_bahan: v.id_reg_bahan,
            id_bahan_data_dukung: v.DataDukung?.id_bahan_data_dukung,
            materialName: v.reg_nama_bahan,
            priority: v.DataDukung?.kriteria_bahan,
            findings: v.DataDukung?.temuan,
            information: v.DataDukung?.keterangan,
            diragukan: v.DataDukung?.diragukan
          })),
      }

      console.log('material data : ', materialData)

      opsiBahan.value = data.bahan?.filter(
        i => i.DataDukung?.id_bahan_data_dukung === '00000000-0000-0000-0000-000000000000',
      ).map(i => ({
        title: i.reg_nama_bahan,
        value: i.id_reg_bahan,
      }))

      console.log('OPSI BAHAN : ', opsiBahan)

      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}


// onMounted(async () => {
//   loading.value = true
//   tabs.value = 0
//   await loadBahanDukung()
//   // await Promise.all([
//   //   // loadItemProductClasifications(),
//   //   loadBahanDukung()
//   // ])
//   loading.value = false
// })
</script>

<template>
  <DialogWithAction
    :title="titleAddDialog"
    :is-open="addDialog"
    :label-save-btn="labelSaveBtn"
    :toggle="() => (addDialog = false)"
  >
    <template #content>
      <div v-if="titleAddDialog === 'Tambah Nama Produk'">
        <div>
          <label>Kualitas Produk</label>
          <VSelect
            outlined
            placeholder="pilih kualitas produk"
            density="compact"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="dataProductClasification"
            @update:model-value="loadItemProductRincian"
          />
          <br>
          <label>Rincian Produk</label>
          <VSelect
            v-model="formData.kode_rincian"
            outlined
            placeholder="pilih rincian produk"
            density="compact"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="listRincian"
          />
          <br>
          <label>Nama Produk</label>
          <VTextField
            v-model="formData.nama_produk"
            class="-mt-10"
            density="compact"
            placeholder="Isi Nama Produk"
          />
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Foto
            </label>
            <VCol cols="6">
              <VTextField
                v-if="uploadedFile.file"
                :model-value="uploadedFile.name"
                density="compact"
                placeholder="No file choosen"
                rounded="xl"
                max-width="400"
              >
                <template #append-inner>
                  <VIcon
                    icon="fa-trash"
                    color="error"
                    class="cursor-pointer"
                    @click="handleRemoveFile"
                  />
                </template>
              </VTextField>
              <VFileInput
                v-else
                :model-value="uploadedFile.file"
                class="custom-file-input"
                density="compact"
                rounded="xl"
                label="No file choosen"
                max-width="400"
                prepend-icon=""
                @change="handleUploadFile"
              >
                <template #append-inner>
                  <VBtn
                    rounded="s-0 e-xl"
                    text="Choose"
                  />
                </template>
              </VFileInput>
            </VCol>
          </div>
        </div>
      </div>
      <div v-else-if="titleAddDialog === 'Ubah Nama Produk'">
        <div>
          <label>Kualitas Produk</label>
          <VSelect
            v-model="itemDetail.klasifikasi"
            outlined
            placeholder="pilih kualitas produk"
            density="compact"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="dataProductClasification"
            @update:model-value="loadItemProductRincian"
          />
          <br>
          <label>Rincian Produk</label>
          <VSelect
            v-model="itemDetail.koderincian_desc"
            outlined
            placeholder="pilih rincian produk"
            density="compact"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="listRincian"
          />
          <br>
          <label>Nama Produk</label>
          <VTextField
            v-model="itemDetail.nama"
            class="-mt-10"
            density="compact"
            placeholder="Isi Nama Produk"
          />
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Foto
            </label>
            <VCol cols="6">
              <VTextField
                v-if="uploadedFile.file"
                :model-value="uploadedFile.name"
                density="compact"
                placeholder="No file choosen"
                rounded="xl"
                max-width="400"
              >
                <template #append-inner>
                  <VIcon
                    icon="fa-trash"
                    color="error"
                    class="cursor-pointer"
                    @click="handleRemoveFile"
                  />
                </template>
              </VTextField>
              <VFileInput
                v-else
                :model-value="uploadedFile.file"
                class="custom-file-input"
                density="compact"
                rounded="xl"
                label="No file choosen"
                max-width="400"
                prepend-icon=""
                @change="handleUploadFile"
              >
                <template #append-inner>
                  <VBtn
                    rounded="s-0 e-xl"
                    text="Choose"
                  />
                </template>
              </VFileInput>
            </VCol>
          </div>
        </div>
      </div>
      <div v-else-if="titleAddDialog === 'Detail Nama Produk'">
        <div>
          <label>Kualitas Produk</label>
          <VSelect
            v-model="itemDetail.klasifikasi"
            outlined
            placeholder="pilih kualitas produk"
            density="compact"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="dataProductClasification"
            @update:model-value="loadItemProductRincian"
          />
          <br>
          <label>Rincian Produk</label>
          <VSelect
            v-model="itemDetail.koderincian_desc"
            outlined
            placeholder="pilih rincian produk"
            density="compact"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="listRincian"
          />
          <br>
          <label>Nama Produk</label>
          <VTextField
            v-model="itemDetail.nama"
            class="-mt-10"
            density="compact"
            placeholder="Isi Nama Produk"
          />
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Foto
            </label>
            <VCol cols="6">
              <VTextField
                v-if="uploadedFile.file"
                :model-value="uploadedFile.name"
                density="compact"
                placeholder="No file choosen"
                rounded="xl"
                max-width="400"
              />
              <VFileInput
                v-else
                :model-value="uploadedFile.file"
                class="custom-file-input"
                density="compact"
                rounded="xl"
                label="No file choosen"
                max-width="400"
                prepend-icon=""
                @change="handleUploadFile"
              >
                <template #append-inner>
                  <VBtn
                    rounded="s-0 e-xl"
                    text="Choose"
                  />
                </template>
              </VFileInput>
            </VCol>
          </div>
        </div>
      </div>
      <div v-else-if="addContentType === 'Outlet'">
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
    </template>
  </DialogWithAction>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">
          Ubah Laporan Hasil Audit
        </h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            class="borderInfo"
            color="#E1442E"
          >
            Batal
          </VBtn>
          <VBtn @click="saveHasilAudit" >Simpan</VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol class="pr-0">
        <VExpansionPanels v-model="panelCertificateRequest">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow>
                <VCol
                  v-for="(item, index) in requestDataHalal"
                  :key="item.title"
                  :value="index"
                  cols="12"
                >
                  <!-- <br> -->
                  <div v-if="item.type === 'text'">
                    <p class="label-pengajuan">
                      {{ item.title }}
                    </p>
                    <VTextField
                      v-model="item.value"
                      disabled
                      bg-color="#F6F6F6"
                      class="-mt-10"
                    />
                  </div>
                  <div v-if="item.type === 'select'">
                    <p class="label-pengajuan">
                      {{ item.title }}
                    </p>
                    <VSelect
                      v-if="item.disabled"
                      v-model="item.value"
                      :items="getSelectOptions(item.title)"
                      outlined
                      class="-mt-10"
                      disabled
                      bg-color="#F6F6F6"
                    />
                    <VSelect
                      v-if="!item.disabled"
                      v-model="item.value"
                      :items="getSelectOptions(item.title)"
                      outlined
                      class="-mt-10"
                    />
                  </div>
                  <VCol
                    v-if="item.type === 'date'"
                    class="d-flex justify-space-between align-center px-0"
                    cols="12"
                  >
                    <!-- <p class="label-pengajuan">{{ item.title }}</p> -->
                    <div
                      v-for="(element, idx) in item.data"
                      :key="element.title"
                      :value="idx"
                      cols="5"
                      class="px-0 w-48"
                    >
                      <p class="label-pengajuan">
                        {{ element.title }}
                      </p>
                      <VTextField
                        v-model="element.value"
                        disabled
                        bg-color="#F6F6F6"
                        class="-mt-10"
                      />
                    </div>
                  </VCol>
                  <div v-if="item.type === 'textarea'">
                    <div v-if="item.title === 'Hasil Pengujian' && shouldShowHasilPengujian">
                      <p class="label-pengajuan">
                        {{ item.title }}
                      </p>
                      <VTextarea
                        v-model="item.value"
                        class="-mt-10"
                      />
                    </div>
                    <div v-if="item.title === 'Catatan' && shouldShowCatatan && shouldShowHasilPengujian">
                      <div>
                        <p class="label-pengajuan">
                          {{ item.title }}
                        </p>
                        <VTextarea
                          v-model="item.value"
                          class="-mt-10"
                        />
                      </div>
                    </div>
                    <div v-if="item.title === 'Catatan' && shouldShowCatatan && !shouldShowHasilPengujian">
                      <div class="-mt-20">
                        <p class="label-pengajuan">
                          {{ item.title }}
                        </p>
                        <VTextarea
                          v-model="item.value"
                          class="-mt-10"
                        />
                      </div>
                    </div>
                  </div>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <ContentAuditPengajuan
          @submit="addDataDukung"
          v-if="!loading"
          :opsi-bahan="opsiBahan"
          :opsi-keterangan="jenisKeteranganBahan"
          :on-add="() => triggerDialog('add')"
          title="Bahan"
          :headers-label="materialData.label"
          :items-label="materialData.value"
          with-add-button
          @update="updateDataDukung"
        />
        <br>
        <ContentAuditPengajuan
          @submit="addProsesProduk"
          :on-add="() => console.log('aaa')"
          title="Proses Produk Halal"
          :headers-label="processData.label"
          :items-label="processData.value"
          with-add-button
        />
        <br>
        <!--        <ContentAuditPengajuan -->
        <!--          :on-add="() => console.log('aaa')" -->
        <!--          title="Daftar Produk" -->
        <!--          :headers-label="registrationProductData.label" -->
        <!--          :items-label="registrationProductData.value" -->
        <!--        /> -->
        <TableData
          :on-submit="() => confirmSaveDialog = true"
          :on-add="() => toggleAdd('Nama Produk')"
          :on-edit="(item: any) => getDetailProduk(item.id, 'edit')"
          :on-delete="(item: any) => deleteProduct(item.id)"
          :on-detail="(el: any) => getDetailProduk(el.id, 'detail')"
          :data="productName"
          :re-render="reRender"
          title="Daftar Produk"
          with-add-button
        />
        <br>
        <!--        <ContentAuditPengajuan -->
        <!--          :on-add="() => console.log('aaa')" -->
        <!--          title="Daftar Outlet" -->
        <!--          :headers-label="outletData.label" -->
        <!--          :items-label="outletData.value" -->
        <!--        /> -->

        <TableData
          :on-submit="() => triggerSaveModal('Outlet')"
          :on-add="() => triggerAddModal('Outlet')"
          :on-delete="(el: any) => deleteFactoryOrOutlet('outlet', el)"
          :data="outletData"
          title="Outlet"
          with-add-button
        />
        <br>
        <ContentAuditPengajuan
          :on-add="() => console.log('aaa')"
          title="Kesimpulan Pemenuhan Kriteria Sistem Jaminan Produk Halal"
          :headers-label="summaryData.label"
          :items-label="summaryData.value"
          with-add-button
        />
        <br>
        <ContentAuditPengajuan
          :on-add="() => console.log('aaa')"
          title="Nama Auditor Halal"
          :headers-label="auditorListData.label"
          :items-label="auditorListData.value"
          :with-add-button="false"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
.borderInfo {
    border-color: #E1442E !important;
    border-width: 1px !important;
}

.-mt-10 {
    margin-top: -10px;
}

.-mt-20 {
    margin-top: -20px;
}

.label-pengajuan {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #2C222E;
}

.w-48 {
    max-width: 48%;
    min-width: 48%;
}
</style>
