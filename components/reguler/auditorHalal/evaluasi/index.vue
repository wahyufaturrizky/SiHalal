<script setup lang="ts">
import { ref } from 'vue'

const addDialog = ref(false)
const confirmSaveDialog = ref(false)
const titleDialog = ref('')
const file = ref<File | null>(null)

const documentList = ref([
  { nama: 'Izin Edar', fileName: 'Surat Izin Usaha.pdf', file: null },
  { nama: 'Izin Masuk', fileName: '', file: null },
])

const comitmentData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Dokumen', key: 'docName', nowrap: true },
      { title: 'File Dokumen', key: 'document', nowrap: true },
      { title: 'Dokumen Pendukung', key: 'docSupport', nowrap: true },
      { title: 'Action', value: 'actionEdit', sortable: false, nowrap: true, popOver: true },
    ],
    value: [
      { no: 1, docName: 'Sertifikat Tanah', document: 'File', docSupport: 'File' },
      { no: 2, docName: 'Kopi Luak Lembang', document: 'File', docSupport: 'File' },
    ],
  },
)

const auditInternal = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Deskripsi', key: 'description', nowrap: true },
      { title: 'Unggahan Bukti Pemenuhan', key: 'pemenuhanEvidence', nowrap: true },
      { title: 'Keterangan', key: 'detail', nowrap: true },
      { title: 'Seuai/Tidak Sesuai', key: 'isValid', nowrap: true },
    ],
    value: [
      { no: 1, description: 'Komitmen dan Manajemen', pemenuhanEvidence: '-', detail: '-', isValid: '-' },
      { no: 2, description: 'Bahan', pemenuhanEvidence: '-', detail: '-', isValid: '-' },
      { no: 3, description: 'Proses Produk Halal', pemenuhanEvidence: '-', detail: '-', isValid: '-' },
      { no: 4, description: 'Proses', pemenuhanEvidence: '-', detail: '-', isValid: '-' },
      { no: 5, description: 'Pemantauan dan Evaluasi', pemenuhanEvidence: '-', detail: '-', isValid: '-' },
    ],
  },
)

const managementData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Materi', key: 'materi', nowrap: true },
      { title: 'Hasil Pembahasan', key: 'result', nowrap: true },
    ],
    value: [
      { no: 1, materi: 'Komitmen dan Manajemen', result: '-' },
      { no: 2, materi: 'Bahan', result: '-' },
    ],
  },
)

const uploadFile = (event: any) => {
  const fileUpload = event?.target?.files[0]
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name
    documentList.value[0].file = fileUpload
  }
}

const toggleAdd = (type: string) => {
  addDialog.value = true
  titleDialog.value = `Tambah ${type}`
}

const toggleEdit = (type: string) => {
  addDialog.value = true
  titleDialog.value = `Ubah ${type}`
}

const handleSubmit = () => {
  // submit
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
        <div v-if="titleDialog === 'Tambah Dokumen'">
          <label class="label-pengajuan">
            Nama Dokumen
          </label>
          <VTextField
            class="-mt-10"
            placeholder="isi nama dokumen"
          />
          <br>
          <div class="d-flex justify-space-between mt-5">
            <label>
              Unggah Dokumen
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
        <div v-if="titleDialog === 'Tambah Tanda Tangan'">
          <div class="d-flex justify-space-between mt-5 mb-5">
            <label>
              Upload Tanda Tangan Penanggung Jawab
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
          <label>
            Nama Penyelia Halal
          </label>
          <VSelect
            :items="['1', '2']"
            outlined
            class="-mt-5"
            placeholder="pilih penyelia halal"
          />
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Tanda Tangan Penanggung Jawab
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
        <div v-if="titleDialog === 'Ubah Dokumen'">
          <p class="label-pengajuan">
            Pabrik
          </p>
          <VTextField
            class="-mt-10"
            placeholder="isi nama bahan"
            value="Sertif Rumah"
          />
          <br>
          <div class="d-flex justify-space-between mt-5">
            <label>
              Unggah Dokumen
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
        <div v-if="titleDialog === 'Ubah Tanda Tangan'">
          <div class="d-flex justify-space-between mt-5 mb-5">
            <label>
              Upload Tanda Tangan Penanggung Jawab
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
          <label>
            Nama Penyelia Halal
          </label>
          <VSelect
            :items="['1', '2']"
            outlined
            class="-mt-5"
            placeholder="pilih penyelia halal"
          />
          <div class="d-flex justify-space-between mt-5">
            <label>
              Upload Tanda Tangan Penanggung Jawab
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
      </template>
    </DialogWithAction>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Dokumen')"
      :on-edit="() => toggleEdit('Dokumen')"
      :data="comitmentData"
      title="Pemetaan Produk dan Pabrik"
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
      :on-edit="() => toggleEdit('Tanda Tangan')"
      :data="comitmentData"
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
          :headers="managementData.label"
          :items="managementData.value"
          hide-default-footer
          class="border rounded"
          :items-per-page="-1"
        />
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
