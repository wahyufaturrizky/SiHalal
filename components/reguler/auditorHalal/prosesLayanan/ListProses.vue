<script setup lang="ts">
import { ref } from 'vue'

const addDialog = ref(false)
const titleDialog = ref('')
const labelSaveBtn = ref('Tambah')
const confirmSaveDialog = ref(false)
const tabs = ref<string | number>(-1)
const file = ref<File | null>(null)

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
      { title: 'Nama Pabrik', key: 'factoryName', nowrap: true },
      { title: 'File Layout Pabrik', key: 'factoryFile', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true, popOver: true },
    ],
    value: [
      { no: 1, factoryName: 'Pabrik Kopi', factoryFile: 'file' },
      { no: 2, factoryName: 'Pabrik Susu', factoryFile: 'file' },
    ],
  },
)

const materialAndProduct = ref(
  [
    {
      label: [
        { title: 'No.', key: 'no', nowrap: true },
        { title: 'Nama', key: 'name', nowrap: true },
        { title: 'Tipe Penambahan', key: 'addType', nowrap: true },
        { title: 'Jumlah', key: 'total', nowrap: true },
        { title: 'Tanggal Pembelian', key: 'buyDate', nowrap: true },
        { title: 'File Dokumen', key: 'document', nowrap: true },
        { title: 'Action', value: 'actionEdit', sortable: false, nowrap: true, popOver: true },
      ],
      value: [
        { no: 1, name: 'Pabrik Kopi', addType: 'file', total: '12', buyDate: '12-12-2024', document: 'file' },
        { no: 2, name: 'Pabrik Susu', addType: 'file', total: '12', buyDate: '12-12-2024', document: 'file' },
      ],
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
      value: [
        { no: 1, name: 'Pabrik Kopi', addType: 'file', location: 'Medan', buyDate: '12-12-2024', document: 'file' },
        { no: 2, name: 'Pabrik Susu', addType: 'file', location: 'Padang', buyDate: '12-12-2024', document: 'file' },
      ],
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
</script>

<template>
  <div>
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
            :items="['1', '2']"
            outlined
            placeholder="pilih pabrik"
          />
          <br>
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
