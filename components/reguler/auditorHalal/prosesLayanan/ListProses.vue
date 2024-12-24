<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const id = route.params.id
const addDialog = ref(false)
const titleDialog = ref('')
const labelSaveBtn = ref('Tambah')
const confirmSaveDialog = ref(false)
const tabs = ref<string | number>(-1)
const file = ref<File | null>(null)
const loading = ref(false)
const listFactory = ref<any[]>([])

const formAddLayout = ref({
  file_layout: '',
  nama_pabrik: '',
  id_pabrik: '',
})

const selectedFactory = ref({})

const uploadedFile = ref({
  name: '',
  file: null,
})

const resetForm = () => {
  formAddLayout.value = {
    file_layout: '',
    nama_pabrik: '',
    id_pabrik: '',
  }
}

const handleRemoveFile = () => {
  uploadedFile.value.name = '';
  uploadedFile.value.file = null;
  formData.value.foto_produk = '';
};

onMounted(() => {
  tabs.value = 0
})

const dummyDataDiagramAlur = ref({
  title: 'Air Mineral',
  proccess: [{ title: 'Penggilingan' }, { title: 'Penyulingan' }],
  detail: 'Digilingkan Air',
})

const documentList = ref([
  { nama: 'Izin Edar', fileName: 'Surat Izin Usaha.pdf', file: null },
  { nama: 'Izin Masuk', fileName: '', file: null },
])

const layoutData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Pabrik', key: 'nama_pabrik', nowrap: true },
      { title: 'File Layout Pabrik', key: 'file_layout', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true, popOver: true },
    ],
    value: [],
  },
)

const materialAndProduct = ref(
  [
    {
      label: [
        { title: 'No.', key: 'no', nowrap: true },
        { title: 'Nama', key: 'nama_bahan', nowrap: true },
        { title: 'Tipe Penambahan', key: 'tipe_penambahan', nowrap: true },
        { title: 'Jumlah', key: 'jumlah', nowrap: true },
        { title: 'Tanggal Pembelian', key: 'tanggal_masuk', nowrap: true },
        { title: 'File Dokumen', key: 'file_dok', nowrap: true },
        { title: 'Action', value: 'actionEdit', sortable: false, nowrap: true, popOver: true },
      ],
      value: [],
    },
    {
      label: [
        { title: 'No.', key: 'no', nowrap: true },
        { title: 'Nama', key: 'name', nowrap: true },
        { title: 'Tipe Penambahan', key: 'addType', nowrap: true },
        { title: 'Lokasi', key: 'location', nowrap: true },
        { title: 'Tanggal Pembelian', key: 'buyDate', nowrap: true },
        { title: 'File Dokumen', key: 'document', nowrap: true },
        { title: 'Action', value: 'actionEdit', sortable: false, nowrap: true, popOver: true },
      ],
      value: [],
    },
  ],
)

const processProduction = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Pabrik', key: 'factoryName', nowrap: true },
      { title: 'File Layout Pabrik', key: 'factoryFile', nowrap: true },
      { title: 'Action', value: 'actionEdit', sortable: false, nowrap: true, popOver: true },
    ],
    value: [
      { no: 1, factoryName: 'Pabrik Kopi', factoryFile: 'file' },
      { no: 2, factoryName: 'Pabrik Susu', factoryFile: 'file' },
    ],
  },
)

const toggleAdd = (type: string) => {
  labelSaveBtn.value = type === 'Diagram Alur Proses' ? 'Unggah' : 'Tambah'
  addDialog.value = true
  titleDialog.value = `Tambah ${type}`
}

const toggleEdit = (type: string) => {
  addDialog.value = true
  titleDialog.value = `Ubah ${type}`
}

const toggleEdit2Table = (index: any) => {
  addDialog.value = true
  titleDialog.value = index === 0 ? 'Ubah Catatan Bahan' : 'Ubah Catatan Produk'
}

const uploadFile = (event: Event, index: string | number) => {
  const fileUpload = event.target.files[0]
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name
    documentList.value[0].file = fileUpload
  }
}

const handleSubmit = () => {
  confirmSaveDialog.value = false

  // submit simpan
}

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('file', file);
    formData.append('type', 'produk');
    const response = await $api('/shln/submission/document/upload', {
      method: 'post',
      body: formData,
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      'ada kesalahan saat upload file, gagal menyimpan!',
      'error'
    );
  }
};

const handleUploadFile = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];
    uploadedFile.value.name = fileData.name;
    uploadedFile.value.file = fileData;
    try {
      const response = await uploadDocument(fileData);
      if (response.code === 2000) {
        formAddLayout.value = {
          ...formAddLayout.value,
          file_layout: response.data.file_url
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}

const handleAddOrEdit = async () => {
  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-proses/add-layout',
    {
      method: 'post',
      query: { id },
      body: formAddLayout.value,
    },
  )

  if (response.code === 2000) {
    resetForm()
    addDialog.value = false
    useSnackbar().sendSnackbar('Sukses menambah data', 'success')
  }
}

const getListLayout = async () => {
  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-proses/list-layout',
    {
      method: 'get',
      query: { id },
    },
  )

  if (response.code === 2000) {
    layoutData.value = {
      ...layoutData.value,
      value: response.data,
    }
  }

  return response || []
}

const getListFactory = async () => {
  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-proses/list-factory',
    {
      method: 'get',
      query: { id },
    },
  )

  if (response.code === 2000) {
    listFactory.value = response.data
    selectedFactory.value = response.data?.[0]
  }

  return response || []
}

const getListCatatanBahan = async () => {
  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-proses/list-catatan-bahan',
    {
      method: 'get',
      query: { id },
    },
  )

  if (response.code === 2000)
    materialAndProduct.value[0].value = response.data

  return response || []
}

onMounted(async () => {
  loading.value = true
  await Promise.allSettled([
    getListLayout(),
    getListFactory(),
    getListCatatanBahan(),
  ])
  loading.value = false
})

watch(selectedFactory, () => {
  formAddLayout.value = {
    ...formAddLayout.value,
    nama_pabrik: selectedFactory.value?.nama,
    id_pabrik: selectedFactory.value?.id,
  }
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
      :on-save="handleAddOrEdit"
    >
      <template #content>
        <div v-if="titleDialog === 'Tambah Layout'">
          <p class="label-pengajuan">
            Pabrik
          </p>
          <VSelect
            v-model="selectedFactory"
            :items="listFactory"
            outlined
            placeholder="pilih pabrik"
            item-title="nama"
            item-value="nama"
            default-value="'pilih'"
            return-object
          />
          <br>
          <div class="d-flex justify-space-between mt-5">
            <label>
              Unggah Bahan
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
                  <VBtn rounded="s-0 e-xl" text="Choose" />
                </template>
              </VFileInput>
            </VCol>
          </div>
        </div>
        <div v-if="titleDialog === 'Ubah Catatan Bahan'">
          <label class="label-pengajuan">
            Nama Bahan
          </label>
          <VTextField
            class="-mt-10"
            placeholder="isi nama bahan"
            value="Air mineral"
          />
          <br>
          <label class="label-pengajuan">
            Jumlah
          </label>
          <VTextField
            class="-mt-10"
            placeholder="isi nama bahan"
            value="12"
          />
          <VRow class="mt-2">
            <VCol>
              <label>Tanggal Masuk</label>
              <AppDateTimePicker
                placeholder="tanggal masuk"
                required
              />
            </VCol>
            <VCol>
              <label>Tanggal Keluar</label>
              <AppDateTimePicker
                placeholder="tanggal keluar"
                required
              />
            </VCol>
          </VRow>
        </div>
        <div v-if="titleDialog === 'Ubah Catatan Produk' || titleDialog === 'Ubah Catatan Distribusi'">
          <label class="label-pengajuan">
            Nama Produk
          </label>
          <VTextField
            class="-mt-10"
            placeholder="isi nama produk"
            value="Air mineral"
          />
          <br>
          <label class="label-pengajuan">
            Jumlah
          </label>
          <VTextField
            class="-mt-10"
            placeholder="isi nama produk"
            value="12"
          />
          <VRow class="mt-2">
            <VCol>
              <label>Tanggal Masuk</label>
              <AppDateTimePicker
                placeholder="tanggal masuk"
                required
              />
            </VCol>
            <VCol>
              <label>Tanggal Keluar</label>
              <AppDateTimePicker
                placeholder="tanggal keluar"
                required
              />
            </VCol>
          </VRow>
        </div>
        <div v-if="titleDialog.includes('Diagram Alur Proses')">
          <div class="d-flex justify-center">
            <VTabs
              v-model="tabs"
              align-tabs="center"
              bg-color="#f0dcf5"
              class="border pa-2"
              style="border-radius: 40px"
              height="auto"
            >
              <VTab
                value="1"
                base-color="#f0dcf5"
                active-color="primary"
                style="border-radius: 40px;"
                hide-slider
                color="primary"
                variant="flat"
                height="40px"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual  </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabs">
            <VTabItem>
              <div
                v-if="tabs === '2'"
                class="mt-5"
              >
                <div>
                  <br>
                  <label>Judul Proses</label>
                  <VTextField
                    v-model="dummyDataDiagramAlur.title"
                    class="-mt-10"
                    placeholder="pilih jenis bahan"
                  />
                  <br>
                  <label>Proses</label>
                  <div
                    v-for="(item, index) in dummyDataDiagramAlur.proccess"
                    :key="index"
                  >
                    <VTextField
                      v-model="item.title"
                      class="mt-3"
                      placeholder="pilih jenis bahan"
                    />
                  </div>
                  <div class="d-flex justify-end mt-3">
                    <VBtn
                      color="primary"
                      variant="outlined"
                      @click="dummyDataDiagramAlur.proccess.push({ title: '' })"
                    >
                      Tambah Proses
                    </VBtn>
                  </div>
                  <br>
                  <label>Detail Proses</label>
                  <VTextField
                    v-model="dummyDataDiagramAlur.detail"
                    class="-mt-10"
                    placeholder="pilih jenis bahan"
                  />
                </div>
              </div>
              <div
                v-else
                class="mt-10"
              >
                <div class="d-flex justify-space-between mt-5">
                  <label>
                    Unggah Bahan
                  </label>
                  <VFileInput
                    v-model="file"
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
            </VTabItem>
          </VTabsItems>
        </div>
      </template>
    </DialogWithAction>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Layout')"
      :on-edit="() => toggleEdit('Layout')"
      :data="layoutData"
      title="Layout / Denah Ruang Produksi"
      with-add-button
    />
    <br>
    <TableDataWith2Table
      :on-submit="() => confirmSaveDialog = true"
      :on-edit="toggleEdit2Table"
      :data="materialAndProduct"
      title="Catatan Penyimpanan Bahan dan Produk"
    >
      <template #subTitle1>
        <p class="label-pengajuan font-weight-bold mt-2">
          Tambah Catatatan Bahan
        </p>
      </template>
      <template #subTitle2>
        <p class="label-pengajuan font-weight-bold mt-5">
          Tambah Catatatan Produk
        </p>
      </template>
    </TableDataWith2Table>
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Diagram Alur Proses')"
      :on-edit="() => toggleEdit('Diagram Alur Proses')"
      :data="processProduction"
      title="Diagram Alur Proses Produksi"
      with-add-button
    />
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-edit="() => toggleEdit('Catatan Produk')"
      :data="processProduction"
      title="Catatan Hasil Produksi"
    />
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-edit="() => toggleEdit('Catatan Distribusi')"
      :data="processProduction"
      title="Catatan Distribusi / Penjualan Produk"
    />
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
  .custom-date-input .v-input__control {
  position: relative;
}

.custom-date-input input[type="date"] {
  padding-right: 40px; /* Ensure there is space on the right for the icon */
}

.custom-date-input .v-input__icon--append {
  right: 0;
}
  </style>
