<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const id = route.params.id
const addDialog = ref(false)
const confirmSaveDialog = ref(false)
const titleDialog = ref('')
const file = ref<File | null>(null)
const loading = ref(false)
const actionOptions = ref(null)

const penyeliaSelected = ref(null)

const emptyFormTtd = {
  namaPenyelia: null,
  ttdPj: null,
  ttdPh: null,
  id: null,
}

const formAddTtd = ref(emptyFormTtd)
const formEditTtd = ref(emptyFormTtd)
const resetFormAddTtd = () => formAddTtd.value = emptyFormTtd
const resetFormEditTtd = () => formEdit.value = emptyFormTtd

const uploadedFileTTdPj = ref({
  name: '',
  file: null,
})

const uploadedFileTTdPh = ref({
  name: '',
  file: null,
})

// DOKUMEN LAINNYA
const uploadedFileDokumenLainnya = ref({
  name: '',
  file: null,
})

const formDokumenLainnya = ref({
  nama_dokumen: '',
  file_dok: '',
  id: null,
})

const documentList = ref([
  { nama: 'Izin Edar', fileName: 'Surat Izin Usaha.pdf', file: null },
  { nama: 'Izin Masuk', fileName: '', file: null },
])

const ttdData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Tanda Tangan PenanggungJawab', value: 'foto4', nowrap: true },
      { title: 'Nama Penyelia Halal', key: 'nama_penyelia', nowrap: true },
      { title: 'Tanda Tangan Penyelia Halal', value: 'foto5', nowrap: true },
      { title: 'Action', value: 'actionV2', sortable: false, nowrap: true, popOver: true },
    ],
    value: [
    ],
  },
)

const dokumenLainnya = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Dokumen', key: 'nama_dokumen', nowrap: true },
      { title: 'File Dokumen', value: 'foto2', nowrap: true },
      { title: 'Dokumen Pendukung', value: 'foto3', nowrap: true },
      { title: 'Action', value: 'actionV2', sortable: false, nowrap: true, popOver: true },
    ],
    value: [],
  })

const auditInternal = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Deskripsi', key: 'description', nowrap: true },
      { title: 'Unggahan Bukti Pemenuhan', key: 'pemenuhanEvidence', nowrap: true },
      { title: 'Keterangan', key: 'detail', nowrap: true },
      { title: 'Seuai/Tidak Sesuai', key: 'isValid', nowrap: true },
    ],
    value: [],
  },
)

const risalahKajiUlang = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Materi', key: 'aspek', nowrap: true },
      { title: 'Hasil Pembahasan', key: 'deskripsi', nowrap: true },
    ],
    value: [],
  },
)

const toggleAdd = (type: string) => {
  actionOptions.value = 'ADD'
  addDialog.value = true
  titleDialog.value = `Tambah ${type}`
}

const toggleEdit = (type: string, item: any) => {
  if (type === 'Dokumen') {
    formDokumenLainnya.value = {
      file_dok: item.file_dok,
      nama_dokumen: item.nama_dokumen,
      id: item.id_reg_dok,
    }
  }

  if (type === 'Tanda Tangan') {
    console.log('item : ', item)
    formAddTtd.value = {
      id: item.id_reg_ttd,
      ttdPj: item.ttd_pj,
      ttdPh: item.ttd_ph,
    }
    penyeliaSelected.value = item.nama_penyelia
  }

  actionOptions.value = 'EDIT'
  addDialog.value = true
  titleDialog.value = `Ubah ${type}`
}

const handleSubmit = () => {
  // submit
}

const handleRemoveFile = () => {
  uploadedFileDokumenLainnya.value.name = ''
  uploadedFileDokumenLainnya.value.file = null
  formData.value.foto_produk = ''
}

const handlerUpload = async () => {
  const formData = new FormData()

  formData.append('file', uploadedFileDokumenLainnya.value.file)

  return await $api('/reguler/pelaku-usaha/tab-evaluasi/upload-file', {
    method: 'post',
    query: { id },
    body: formData,
  })
}

const getTtd = async () => {
  try {
    const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/list-ttd', {
      method: 'get',
      params: { id },
    })

    if (response.code === 2000) {
      ttdData.value = {
        ...ttdData.value,
        value: response.data,
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}



const uploadFile = async file => {
  const form = new FormData()

  form.append('file', file)

  const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/upload-file', {
    method: 'post',
    query: { id },
    body: form,
  })

  if (response.code !== 2000)
    return

  return response
}


const deleteTtd = async item => {
  try {
    const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/delete-ttd', {
      method: 'delete',
      query: { id, docId: item.id_reg_ttd },
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Sukses menghapus data', 'success')
      uploadedFileTTdPj.value = {
        name: '',
        file: null,
      }
      uploadedFileTTdPh.value = {
        name: '',
        file: null,
      }
      await getTtd()
      await getListPenyelia()
    }
  }
  catch (error) {
    console.log('ERROR : ', error)
  }
}

const addTtd = async () => {
  try {
    if (actionOptions.value === 'ADD') {
      // const formTtdPj = new FormData()
      //
      // formTtdPj.append('file', uploadedFileTTdPj.value.file)
      //
      // const responseFileTtdPj = await $api('/reguler/pelaku-usaha/tab-evaluasi/upload-file', {
      //   method: 'post',
      //   query: { id },
      //   body: formTtdPj,
      // })

      const responseFileTtdPj = await uploadFile(uploadedFileTTdPj.value.file)

      console.log('responseFileTtdPj ', responseFileTtdPj)

      // const formTtdPh = new FormData()
      //
      // formTtdPh.append('file', uploadedFileTTdPj.value.file)
      //
      // const responseFileTtdPh = await $api('/reguler/pelaku-usaha/tab-evaluasi/upload-file', {
      //   method: 'post',
      //   query: { id },
      //   body: formTtdPh,
      // })
      const responseFileTtdPh = await uploadFile(uploadedFileTTdPh.value.file)

      console.log('responseFileTtdPh ', responseFileTtdPh)

      const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/add-ttd', {
        method: 'post',
        query: { id },
        body: {
          nama_penyelia: penyeliaSelected.value,
          ttd_pj: responseFileTtdPj.data?.file_url,
          ttd_ph: responseFileTtdPh.data?.file_url,
        },
      })

      if (response.code !== 2000)
        return
      useSnackbar().sendSnackbar('Sukses menambah data', 'success')
      addDialog.value = false
      penyeliaSelected.value = null
      uploadedFileTTdPj.value = {
        name: '',
        file: null,
      }
      uploadedFileTTdPh.value = {
        name: '',
        file: null,
      }
      await getTtd()
      await getListPenyelia()
    }
    else if (actionOptions.value === 'EDIT') {
      console.log('formAddTtd ', formAddTtd)
      let fileNamePj = formAddTtd.value.ttdPj
      let fileNamePh = formAddTtd.value.ttdPh
      if (uploadedFileTTdPj.value.file !== null) {
        const responseFileTtdPj = await uploadFile(uploadedFileTTdPj.value.file)
        if (responseFileTtdPj.code !== 2000)
          return
        fileNamePj = responseFileTtdPj.data?.file_url
      }

      if (uploadedFileTTdPh.value.file !== null) {
        const responseFileTtdPh = await uploadFile(uploadedFileTTdPh.value.file)
        if (responseFileTtdPh.code !== 2000)
          return
        fileNamePh = responseFileTtdPh.data?.file_url
      }

      const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/update-ttd', {
        method: 'put',
        query: { id, docId: formAddTtd.value.id },
        body: {
          nama_penyelia: penyeliaSelected.value,
          ttd_pj: fileNamePj,
          ttd_ph: fileNamePh,
        },
      })

      if (response.code === 2000) {
        useSnackbar().sendSnackbar('Sukses mengedit data', 'success')
        addDialog.value = false
        uploadedFileTTdPj.value = {
          name: '',
          file: null,
        }
        uploadedFileTTdPh.value = {
          name: '',
          file: null,
        }
        await getTtd()
        await getListPenyelia()
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}

const handleUploadFileTTdPj = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0]

    uploadedFileTTdPj.value.name = fileData.name
    uploadedFileTTdPj.value.file = fileData
  }
}

const handleUploadFileTTdPh = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0]

    uploadedFileTTdPh.value.name = fileData.name
    uploadedFileTTdPh.value.file = fileData
  }
}

// DOKUMEN LAIN NYA

const getDokumenLainnya = async () => {
  try {
    const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/list-dokumen', {
      method: 'get',
      params: { id },
    })

    if (response.code === 2000) {
      dokumenLainnya.value = {
        ...dokumenLainnya.value,
        value: response.data,
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}

const resetuploadedFileDokumenLainnya = () => {
  uploadedFileDokumenLainnya.value = {
    name: '',
    file: null,
  }
}

const resetformDokumenLainnya = () => {
  formDokumenLainnya.value = {
    nama_dokumen: '',
    file_dok: '',
    id: null,
  }
}

const handleUploadFileDokumentLainnya = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0]

    uploadedFileDokumenLainnya.value.name = fileData.name
    uploadedFileDokumenLainnya.value.file = fileData
  }
}

const handleAddOrEditDokumenLainya = async () => {
  try {
    if (actionOptions.value === 'ADD') {
      const responseUpload = await handlerUpload()
      if (responseUpload.code !== 2000)
        return

      const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/add-dokumen', {
        method: 'post',
        query: { id },
        body: {
          nama_dokumen: formDokumenLainnya.value.nama_dokumen,
          file_dok: responseUpload.data?.file_url,
        },
      })

      if (response.code !== 2000)
        return
      useSnackbar().sendSnackbar('Sukses menambah data', 'success')
      addDialog.value = false
      resetformDokumenLainnya()
      resetuploadedFileDokumenLainnya()
      await getDokumenLainnya()
    }
    else if (actionOptions.value === 'EDIT') {
      let filename = formDokumenLainnya.value.file_dok
      if (uploadedFileDokumenLainnya.value.file !== null) {
        const responseUpload = await handlerUpload()
        if (responseUpload.code !== 2000)
          return
        filename = responseUpload.data?.file_url
      }

      const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/update-dokumen', {
        method: 'put',
        query: { id, docId: formDokumenLainnya.value.id },
        body: {
          nama_dokumen: formDokumenLainnya.value.nama_dokumen,
          file_dok: filename,
        },
      })

      if (response.code === 2000) {
        useSnackbar().sendSnackbar('Sukses mengedit data', 'success')
        addDialog.value = false
        resetformDokumenLainnya()
        resetuploadedFileDokumenLainnya()
        await getDokumenLainnya()
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}

const deleteDokumenLainnya = async item => {
  try {
    const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/delete-dokumen', {
      method: 'delete',
      query: { id, docId: item.id_reg_dok },
    })

    if (response.code === 2000) {
      useSnackbar().sendSnackbar('Sukses menghapus data', 'success')
      resetformDokumenLainnya()
      resetuploadedFileDokumenLainnya()
      await getDokumenLainnya()
    }
  }
  catch (error) {
    console.log('ERROR : ', error)
  }
}

const getDetail = async () => {
  try {
    const response: any = await $api('/reguler/pelaku-usaha/detail', {
      method: 'get',
      params: { id },
    })

    if (response?.code === 2000) {
      const data = response?.data

      risalahKajiUlang.value = {
        ...risalahKajiUlang.value,
        value: data?.risalah_kaji_ulang,
      }

      auditInternal.value = {
        ...auditInternal.value,
        value: data.formulir_data_periksa_audit_internal?.map(
          i => ({ description: i.deskripsi, pemenuhanEvidence: '-', detail: '-', isValid: '-' })),
      }
    }
  }
  catch (error) {

  }
}

const handleSubmitDokumen = async () => {
  if (titleDialog.value === 'Tambah Dokumen' || titleDialog.value === 'Ubah Dokumen')
    await handleAddOrEditDokumenLainya

  if (titleDialog.value === 'Tambah Tanda Tangan' || titleDialog.value === 'Ubah Tanda Tangan')
    await addTtd()
}

const penyeliaOptions = ref([])

const getListPenyelia = async () => {
  try {
    const response = await $api('/reguler/pelaku-usaha/tab-evaluasi/list-penyelia', {
      method: 'get',
      params: { id },
    })

    if (response.code === 2000) {
      penyeliaOptions.value = response.data?.map(
        i => ({ title: i.nama, value: i.nama }),
      )
    }
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.allSettled([
    getDokumenLainnya(), getTtd(), getDetail(), getListPenyelia(),
  ])
  loading.value = false
})
</script>

<template>
  <div v-if="!loading">
    <DialogSaveDataPengajuan
      title="Simpan Perubahan"
      :is-open="confirmSaveDialog"
      :toggle="() => confirmSaveDialog = false"
      :on-save="() => handleSubmit()"
    />
    <DialogWithAction
      :title="titleDialog"
      :is-open="addDialog"
      :label-save-btn="labelSaveBtn"
      :toggle="() => addDialog = false"
      :on-save="handleSubmitDokumen"
    >
      <template #content>
        <div v-if="titleDialog === 'Tambah Dokumen'">
          <label class="label-pengajuan">
            Nama Dokumen
          </label>
          <VTextField
            v-model="formDokumenLainnya.nama_dokumen"
            class="-mt-10"
            placeholder="isi nama dokumen"
          />
          <br>
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Foto
            </label>
            <VCol cols="6">
              <VTextField
                v-if="uploadedFileDokumenLainnya.file"
                :model-value="uploadedFileDokumenLainnya.name"
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
                :model-value="uploadedFileDokumenLainnya.file"
                class="custom-file-input"
                density="compact"
                rounded="xl"
                label="No file choosen"
                max-width="400"
                prepend-icon=""
                @change="handleUploadFileDokumentLainnya"
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
        <div v-if="titleDialog === 'Tambah Tanda Tangan'">
          <div class="d-flex justify-space-between mt-5 mb-5">
            <label>
              Upload Tanda Tangan Penanggung Jawab
            </label>
            <VFileInput
              dense
              prepend-icon=""
              label="No File Chosen"
              hide-details
              style="max-inline-size: 300px;"
              class="input-file-izin"
              :model-value="uploadedFileTTdPj.file"
              @change="handleUploadFileTTdPj"
            >
              <!-- Button upload input -->
              <template
                v-if="uploadedFileTTdPj.file === null"
                #append-inner
              >
                <VBtn
                  color="primary"
                  variant="flat"
                  class="choose-file"
                  style="block-size: 100%; inline-size: 150px;"
                >
                  Choose File
                </VBtn>
              </template>
            </VFileInput>
          </div>
          <label>
            Nama Penyelia Halal
          </label>
          <VSelect
            v-model="penyeliaSelected"
            :items="penyeliaOptions"
            outlined
            class="-mt-5"
            placeholder="pilih penyelia halal"
          />
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Tanda Tangan Penyelia Halal
            </label>
            <VFileInput
              :model-value="uploadedFileTTdPh.file"
              dense
              prepend-icon=""
              label="No File Chosen"
              hide-details
              style="max-inline-size: 300px;"
              class="input-file-izin"
              @change="handleUploadFileTTdPh"
            >
              <!-- Button upload input -->
              <template
                v-if="uploadedFileTTdPh.file === null"
                #append-inner
              >
                <VBtn
                  color="primary"
                  variant="flat"
                  class="choose-file"
                  style="block-size: 100%; inline-size: 150px;"
                >
                  Choose File
                </VBtn>
              </template>
            </VFileInput>
          </div>
        </div>
        <div v-if="titleDialog === 'Ubah Dokumen'">
          <p class="label-pengajuan">
            Nama Dokumen
          </p>
          <VTextField
            v-model="formDokumenLainnya.nama_dokumen"
            class="-mt-10"
            placeholder="isi nama dokumen"
          />
          <br>
          <div class="d-flex justify-space-between mt-5">
            <label>
              Unggah Dokumen
            </label>
            <VFileInput
              v-model="uploadedFileDokumenLainnya.file"
              dense
              prepend-icon=""
              label="No File Chosen"
              hide-details
              style="max-inline-size: 300px;"
              class="input-file-izin"
              @change="uploadFile"
            >
              <!-- Button upload input -->
              <template
                v-if="file === null"
                #append-inner
              >
                <VBtn
                  color="primary"
                  variant="flat"
                  class="choose-file"
                  style="block-size: 100%; inline-size: 150px;"
                >
                  Choose File
                </VBtn>
              </template>
            </VFileInput>
          </div>
        </div>
        <div v-if="titleDialog === 'Ubah Tanda Tangan'">
          <div class="d-flex justify-space-between mt-5 mb-5">
            <label>
              Upload Tanda Tangan Penanggung Jawab
            </label>
            <VFileInput
              :model-value="uploadedFileTTdPj.file"
              dense
              prepend-icon=""
              label="No File Chosen"
              hide-details
              style="max-inline-size: 300px;"
              class="input-file-izin"
              @change="handleUploadFileTTdPj"
            >
              <!-- Button upload input -->
              <template
                v-if="uploadedFileTTdPj.file === null"
                #append-inner
              >
                <VBtn
                  color="primary"
                  variant="flat"
                  class="choose-file"
                  style="block-size: 100%; inline-size: 150px;"
                >
                  Choose File
                </VBtn>
              </template>
            </VFileInput>
          </div>
          <label>
            Nama Penyelia Halal
          </label>
          <VSelect
            v-model="penyeliaSelected"
            :items="penyeliaOptions"
            outlined
            class="-mt-5"
            placeholder="pilih penyelia halal"
          />
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Tanda Tangan Penanggung Jawab
            </label>
            <VFileInput
              :model-value="uploadedFileTTdPh.file"
              dense
              prepend-icon=""
              label="No File Chosen"
              hide-details
              style="max-inline-size: 300px;"
              class="input-file-izin"
              @change="handleUploadFileTTdPh"
            >
              <!-- Button upload input -->
              <template
                v-if="uploadedFileTTdPh.file === null"
                #append-inner
              >
                <VBtn
                  color="primary"
                  variant="flat"
                  class="choose-file"
                  style="block-size: 100%; inline-size: 150px;"
                >
                  Choose File
                </VBtn>
              </template>
            </VFileInput>
          </div>
        </div>
      </template>
    </DialogWithAction>

    <VCard />
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Dokumen')"
      :on-delete="(item) => deleteDokumenLainnya(item)"
      :on-edit="(item) => toggleEdit('Dokumen', item)"
      :data="dokumenLainnya"
      title="Upload Dokumen Lainnya"
      with-add-button
    >
      <template #headerDialog>
        <div class="bgContent">
          <div
            class="d-flex flex-wrap mt-5"
            style="padding-left: 10px !important; padding-top: 5px !important; padding-bottom: 5px !important;"
          >
            <div style="min-width: 3.5rem;">
              <VIcon
                icon="ri-error-warning-line"
                color="#652672"
              />
            </div>
            <ol>
              <li class="subText">
                Dokumen yang diupload hanya untuk sekala usaha menengah dan besar
              </li>
              <li class="subText">
                Format dokumen berupa PDF
              </li>
            </ol>
          </div>
        </div>
      </template>
    </TableData>
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Tanda Tangan')"
      :on-delete="(item) => deleteTtd(item)"
      :on-edit="(item) => toggleEdit('Tanda Tangan', item)"
      :data="ttdData"
      title="Tanda Tangan"
      with-add-button
    >
      <template #headerDialog>
        <div class="bgContent">
          <div
            class="d-flex flex-wrap mt-5"
            style="padding-left: 10px !important; padding-top: 5px !important; padding-bottom: 5px !important;"
          >
            <div>
              <VIcon
                icon="ri-error-warning-line"
                color="#652672"
              />
            </div>
            <label class="subText">Format file tanda tangan berupa foto(jpeg,jpg,png)</label>
          </div>
        </div>
      </template>
    </TableData>
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :data="auditInternal"
      title="Formulir Data Periksa Audit Internal"
    />
    <br>
    <VCard>
      <VCardTitle>
        <span class="text-h5 font-weight-bold pl-2">Risalah Kaji Ulang Manajemen</span>
      </VCardTitle>
      <VCardText>
        <VDataTable
          :headers="risalahKajiUlang.label"
          :items="risalahKajiUlang.value"
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
        >
          <template #item.no="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
  </div>
</template>

  <style scoped>
  .text-center {
    text-align: center;
  }
  .bgContent {
    background-color: #F0E9F1;
    border-radius: 10px;
  }
  .progress-text {
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 20px !important;
  }
  .subText {
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 18px !important;
    align-content: center;
    padding-left: 10px;
    color: #652672 !important;
  }
  </style>
