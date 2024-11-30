<script setup lang="ts">
import { ref } from 'vue'

const confirmSaveDialog = ref(false)
const addDialog = ref(false)
const titleAddDialog = ref('')

const submitContentType = ref('')
const addContentType = ref('')
const labelSaveBtn = ref('')
const file = ref<File | null>(null)

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

const requestCertificateData = ref([
  { title: 'Nama Perusahaan yang Tertera pada Sertifikat', value: 'PT Minuman Kemasan', type: 'text', required: true },
  { title: 'Nomor Surat Permohonan', value: '1213414', type: 'text', required: true },
  { title: 'Tanggal Surat Pemohon', value: '11/12/2023', type: 'text', required: true },
  { title: 'Jenis Layanan', value: 'Minuman', type: 'select', disabled: false, required: true },
  { title: 'Jenis Produk', value: 'Bambang', type: 'select', disabled: false, required: true },
  { title: 'Merek Dagang', value: 'Es Cream', type: 'textarea', required: true },
  { title: 'Area Pemasaran', value: 'Provinsi', type: 'select', disabled: false, required: true },
  { title: 'LPH', value: 'LPH LPPOM MUI', type: 'select', disabled: false, required: true },
  { title: 'Jenis Pengajuan', value: 'Baru', type: 'select', disabled: true },
  { title: 'Jenis Pendaftaran', value: 'Baru', type: 'select', disabled: false, required: true },
])

const responsibility = ref([
  { title: 'Jenis Badan Usaha', value: 'PT Minuman Kemasan', type: 'text', required: false },
  { title: 'Nomor Kontak', value: '1213414', type: 'text', required: false },
  { title: 'Email', value: '11/12/2023', type: 'text', required: false },
])

const aspectLegalData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Jenis', key: 'type', nowrap: true },
      { title: 'No. Dokumen', key: 'docNo', nowrap: true },
      { title: 'Tanggal', key: 'date', nowrap: true },
      { title: 'Masa Berlaku', key: 'expire', nowrap: true },
      { title: 'Instansi Penerbit', key: 'createdBy', nowrap: true },
    ],
    value: [
      { no: 1, type: 'SIUP', docNo: '0128749286836', date: '-', expire: '10/10/2025', createdBy: 'Testing' },
      { no: 2, type: 'NPWP', docNo: '0128749286836', date: '11/11/2024', expire: '10/10/2025', createdBy: 'Ditjen Pajak' },
    ],
  },
)

const factoryData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'name', nowrap: true },
      { title: 'Alamat', key: 'address', nowrap: true },
      { title: 'Status', key: 'status', nowrap: true },
      { title: 'Instansi Penerbit', key: 'createdBy', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, name: 'SIUP', address: '0128749286836', status: '-', createdBy: 'Testing' },
      { no: 2, name: 'NPWP', address: '0128749286836', status: '11/11/2024', createdBy: 'Ditjen Pajak' },
    ],
  },
)

const outletData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'name', nowrap: true },
      { title: 'Alamat', key: 'address', nowrap: true },
    ],
    value: [
      { no: 1, name: 'Gedung Utama BCA', address: 'Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat' },
      { no: 2, name: 'Gedung BNI', address: 'Sumbawa Banget, RT002/RW002, Sumbang, Jawa Barat' },
    ],
  },
)

const halalData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'name', nowrap: true },
      { title: 'Unduh SKPH', key: 'skph', nowrap: true },
      { title: 'Unduh SPPH', key: 'spph', nowrap: true },
      { title: 'Unduh KTP', key: 'ktp', nowrap: true },
      { title: 'No. KTP', key: 'ktpNo', nowrap: true },
      { title: 'Agama', key: 'religion', nowrap: true },
      { title: 'No/Tgl Sertif Penyelia Halal', key: 'halalCerti', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, name: 'Maya', skph: 'file', spph: 'file', ktp: 'file', ktpNo: '8362877629316238976', religion: 'Islam', halalCerti: '09/10/2024' },
    ],
  },
)

const triggerSaveModal = (type: string) => {
  submitContentType.value = type
  confirmSaveDialog.value = true
}

const triggerAddModal = (type: string) => {
  addContentType.value = type
  addDialog.value = true
  titleAddDialog.value = `Tambah Data ${type}`
  labelSaveBtn.value = 'Tambah'
}

const handleSubmit = () => {
  if (submitContentType.value === 'Pabrik') {
    // handle call api depends on type
  }
  confirmSaveDialog.value = false

  // add logic
}

const handleAddOrEdit = () => {
  addDialog.value = false
}
</script>

<template>
  <DialogSaveDataPengajuan
    title="Simpan Perubahan"
    :is-open="confirmSaveDialog"
    :toggle="() => confirmSaveDialog = false"
    :on-save="() => handleSubmit()"
  />
  <DialogWithAction
    :title="titleAddDialog"
    :is-open="addDialog"
    :label-save-btn="labelSaveBtn"
    :toggle="() => addDialog = false"
    :on-save="handleAddOrEdit"
  >
    <template #content>
      <!-- ADD MODAL DATA ASPEK LEGAL START -->
      <div v-if="addContentType === 'Aspek Legal'">
        <p class="label-pengajuan">
          Jenis Dokumen
        </p>
        <VSelect
          :items="['1', '2']"
          outlined
          class="-mt-5"
          placeholder="pilih jenis dokumen"
        />
        <br>
        <p class="label-pengajuan">
          Nomor Dokumen
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi nomor dokumen"
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
        />
        <br>
        <p class="label-pengajuan">
          Instansi Penerbit
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi nomor dokumen"
        />
      </div>
      <!-- ADD MODAL DATA ASPEK LEGAL END -->
      <!-- ADD MODAL DATA PABRIK START -->
      <div v-if="addContentType === 'Pabrik'">
        <p class="label-pengajuan">
          Lokasi Pabrik
        </p>
        <VSelect
          :items="['1', '2']"
          outlined
          class="-mt-5"
          placeholder="pilih lokasi pabrik"
        />
        <br>
        <p class="label-pengajuan">
          Nama Pabrik
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi nama pabrik"
        />
        <br>
        <p class="label-pengajuan">
          Alamat Pabrik
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi Alamat pabrik"
        />
        <br>
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              Kab/Kota
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Kab/Kota"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              Provinsi
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Provinsi"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              Negara
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Negara"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              Kode Pos
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Kode Pos"
            />
          </VCol>
        </VRow>
        <br>
        <p class="label-pengajuan">
          Status Pabrik
        </p>
        <VSelect
          :items="['1', '2']"
          outlined
          class="-mt-5"
          placeholder="pilih status pabrik"
        />
      </div>
      <!-- ADD MODAL DATA PABRIK END -->
      <!-- ADD MODAL DATA PABRIK START -->
      <div v-if="addContentType === 'Outlet'">
        <p class="label-pengajuan">
          Lokasi Outlet
        </p>
        <VSelect
          :items="['1', '2']"
          outlined
          class="-mt-5"
          placeholder="pilih lokasi Outlet"
        />
        <br>
        <p class="label-pengajuan">
          Nama Outlet
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi nama Outlet"
        />
        <br>
        <p class="label-pengajuan">
          Alamat Outlet
        </p>
        <VTextField
          class="-mt-10"
          placeholder="isi Alamat Outlet"
        />
        <br>
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              Kab/Kota
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Kab/Kota"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              Provinsi
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Provinsi"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              Negara
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Negara"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              Kode Pos
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Kode Pos"
            />
          </VCol>
        </VRow>
      </div>
      <!-- ADD MODAL DATA PABRIK END -->
      <!-- ADD MODAL DATA PENYELIA HALAL START -->
      <div v-if="addContentType === 'Penyelia Halal'">
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              No. KTP
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi No. KTP"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              No. Kontak
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi No. Kontak"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              Nama Penyelia
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Nama Penyelia"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              Agama Penyelia
            </p>
            <VSelect
              :items="['1', '2']"
              outlined
              class="-mt-5"
              placeholder="pilih lokasi Outlet"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              Nomor Sertifikat
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Nomor Sertifikat"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              Tanggal Sertifikat
            </p>
            <VTextField
              id="startDate"
              type="date"
              clearable
              class="-mt-10"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <p class="label-pengajuan">
              Nomor SK
            </p>
            <VTextField
              class="-mt-10"
              placeholder="isi Nomor SK"
            />
          </VCol>
          <VCol>
            <p class="label-pengajuan">
              Tanggal SK
            </p>
            <VTextField
              id="startDate"
              type="date"
              clearable
              class="-mt-10"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="8">
                <VCardText><h3>Unggahan Sertifikat Kompetensi Penyelia Halal (SKPH)</h3></VCardText>
              </VCol>
              <VCol cols="4">
                <div v-if="documentList[0].fileName">
                  <!-- Display file name with remove button -->
                  <VTextField
                    v-model="documentList[0].fileName"
                    dense
                    outlined
                    readonly
                    style="max-inline-size: 300px; padding-inline-end: 0;"
                  >
                    <template #append-inner>
                      <VBtn
                        variant="text"
                        @click="removeFile"
                      >
                        <VIcon color="error">
                          ri-delete-bin-fill
                        </VIcon>
                      </VBtn>
                    </template>
                  </VTextField>
                </div>
                <div v-else>
                  <!-- File upload input -->
                  <VFileInput
                    v-model="file"
                    dense
                    prepend-icon=""
                    hide-details
                    label="No File Chosen"
                    style="max-inline-size: 300px;"
                    class="input-file-izin"
                    @change="uploadFile"
                  >
                    <!-- Button upload input -->
                    <template #append-inner>
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
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="8">
                <VCardText><h3>Unggahan Sertifikat Pelatihan Penyelia Halal (SPPH)</h3></VCardText>
              </VCol>
              <VCol cols="4">
                <div v-if="documentList[0].fileName">
                  <!-- Display file name with remove button -->
                  <VTextField
                    v-model="documentList[0].fileName"
                    dense
                    outlined
                    readonly
                    style="max-inline-size: 300px; padding-inline-end: 0;"
                  >
                    <template #append-inner>
                      <VBtn
                        variant="text"
                        @click="removeFile"
                      >
                        <VIcon color="error">
                          ri-delete-bin-fill
                        </VIcon>
                      </VBtn>
                    </template>
                  </VTextField>
                </div>
                <div v-else>
                  <!-- File upload input -->
                  <VFileInput
                    v-model="file"
                    dense
                    prepend-icon=""
                    hide-details
                    label="No File Chosen"
                    style="max-inline-size: 300px;"
                    class="input-file-izin"
                    @change="uploadFile"
                  >
                    <!-- Button upload input -->
                    <template #append-inner>
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
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol cols="8">
                <VCardText><h3>Unggah KTP</h3></VCardText>
              </VCol>
              <VCol cols="4">
                <div v-if="documentList[0].fileName">
                  <!-- Display file name with remove button -->
                  <VTextField
                    v-model="documentList[0].fileName"
                    dense
                    outlined
                    readonly
                    style="max-inline-size: 300px; padding-inline-end: 0;"
                  >
                    <template #append-inner>
                      <VBtn
                        variant="text"
                        @click="removeFile"
                      >
                        <VIcon color="error">
                          ri-delete-bin-fill
                        </VIcon>
                      </VBtn>
                    </template>
                  </VTextField>
                </div>
                <div v-else>
                  <!-- File upload input -->
                  <VFileInput
                    v-model="file"
                    dense
                    prepend-icon=""
                    hide-details
                    label="No File Chosen"
                    style="max-inline-size: 300px;"
                    class="input-file-izin"
                    @change="uploadFile"
                  >
                    <!-- Button upload input -->
                    <template #append-inner>
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
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </div>
      <!-- ADD MODAL DATA PENYELIA HALAL END -->
    </template>
  </DialogWithAction>
  <FormData
    :on-submit="() => triggerSaveModal('Pengajuan Sertifikasi Halal')"
    :data="requestCertificateData"
    title="Pengajuan Sertifikasi Halal"
  />
  <br>
  <FormData
    :on-submit="() => triggerSaveModal('Penanggung Jawab')"
    :data="responsibility"
    title="Penanggung Jawab"
  />
  <br>
  <TableData
    :on-submit="() => triggerSaveModal('Aspek Legal')"
    :on-add="() => triggerAddModal('Aspek Legal')"
    :data="aspectLegalData"
    title="Aspek Legal"
    with-add-button
  />
  <br>
  <TableData
    :on-submit="() => triggerSaveModal('Pabrik')"
    :on-add="() => triggerAddModal('Pabrik')"
    :data="factoryData"
    title="Pabrik"
    with-add-button
  />
  <br>
  <TableData
    :on-submit="() => triggerSaveModal('Outlet')"
    :on-add="() => triggerAddModal('Outlet')"
    :data="outletData"
    title="Outlet"
    with-add-button
  />
  <br>
  <TableData
    :on-submit="() => triggerSaveModal('Penyelia Halal')"
    :on-add="() => triggerAddModal('Penyelia Halal')"
    :data="halalData"
    title="Penyelia Halal"
    with-add-button
  />
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
