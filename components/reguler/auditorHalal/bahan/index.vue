<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const route = useRoute()

const props = defineProps({
  onComplete: {
    type: Function,
    default: () => { },
    required: false,
  },
})

const id = route.params.id

const addDialog = ref(false)
const confirmSaveDialog = ref(false)
const titleDialog = ref('')
const labelSaveBtn = ref('')
const tabs = ref(-1)
const file = ref<File | null>(null)
const dataProductClasification = ref([])
const listRincian = ref([])
const loading = ref(false)
const loadingRincian = ref(false)
const reRender = ref(false)
const tabBahan = ref(0)

const itemDetail = ref<any>({})

const formData = ref({
  kode_rincian: '',
  nama_produk: '',
  foto_produk: null,
})

const formDataCatatan = ref({
  id_reg_bahan: id,
  nama: '',
  jumlah: 0,
  tgl_pembelian: '',
  file_dok: '',
})

const uploadedFile = ref({
  name: '',
  file: null,
})

const uploadedFileBahan = ref({
  name: '',
  file: null,
})

const handleRemoveFile = () => {
  uploadedFile.value.name = '';
  uploadedFile.value.file = null;
  formData.value.foto_produk = '';
};

const documentList = ref([
  { nama: 'Izin Edar', fileName: 'Surat Izin Usaha.pdf', file: null },
  { nama: 'Izin Masuk', fileName: '', file: null },
])

const pengisianValue = ref('Unggah Foto')

const materialName = ref<any>({
  label: [
    { title: 'No.', key: 'no', nowrap: true },
    { title: 'Jenis Bahan', key: 'jenis_bahan', nowrap: true },
    { title: 'Nama Bahan', key: 'nama_bahan', nowrap: true },
    { title: 'Produsen', key: 'produsen', nowrap: true },
    { title: 'Nomor Sertifikat Halal', key: 'no_sertifikat', nowrap: true },
    { title: 'Action', value: 'actionPopOver3', sortable: false, nowrap: true, popOver: true },
  ],
  value: [],
})

const productName = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Produk', key: 'nama', nowrap: true },
      { title: 'Foto Produk', key: 'foto', nowrap: true },
      { title: 'Action', value: 'actionPopOver3', sortable: false, nowrap: true, popOver: true },
    ],
    value: [
      { no: 1, materialType: 'SIUP', materialName: '0128749286836', produsen: '-', certificateNo: '1231' },
      { no: 2, materialType: 'NPWP', materialName: '0128749286836', produsen: '11/11/2024', certificateNo: '1231' },
    ],
  },
)

const payNote = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'nama', nowrap: true },
      { title: 'Tipe Penambahan', key: 'addType', nowrap: true },
      { title: 'Jumlah', key: 'materialName', nowrap: true },
      { title: 'Tanggal Pembelian', key: 'materialName', nowrap: true },
      { title: 'File Dokumen', key: 'materialName', nowrap: true },
      { title: 'Action', value: 'actionEdit', sortable: false, nowrap: true, popOver: true },
    ],
    value: [],
  },
)

const materialCheck = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'nama', nowrap: true },
      { title: 'Tipe Penambahan', key: 'addType', nowrap: true },
      { title: 'Lokasi', key: 'location', nowrap: true },
      { title: 'Tanggal Pembelian', key: 'buyData', nowrap: true },
      { title: 'File Dokumen', key: 'file', nowrap: true },
      { title: 'Action', value: 'actionEdit', sortable: false, nowrap: true, popOver: true },
    ],
    value: [],
  },
)

const toggleAdd = (type: string) => {
  addDialog.value = true
  titleDialog.value = `Tambah ${type}`
  labelSaveBtn.value = type === 'Data Bahan' ? 'Unggah' : 'Tambah'
}

const toggleEdit = (item: any, type: string) => {
  itemDetail.value = item
  addDialog.value = true
  titleDialog.value = `Ubah ${type}`
  labelSaveBtn.value = 'Ubah'
}

const toggleDetail = (item: any, type: string) => {
  itemDetail.value = item
  addDialog.value = true
  titleDialog.value = `Detail ${type}`
  labelSaveBtn.value = 'Detail'
}

const uploadFile = (event: Event, index: string | number) => {
  const fileUpload = event.target.files[0]
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name
    documentList.value[0].file = fileUpload
  }
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
        formData.value.foto_produk = response.data.file_url;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const toggle = () => {
  addDialog.value = false
}

const handleSubmit = () => {
  confirmSaveDialog.value = false

  // submit simpan
}

const getListCatatan = async () => {
  try {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-bahan/catatan/list',
      {
        method: 'get',
        params: { id },
      },
    )

    if (response.code === 2000) {
      payNote.value = {
        ...payNote.value,
        value: response.data
      }

      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error'
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error');
  }
}

const getListFormulir = async () => {
  try {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-bahan/formulir/list',
      {
        method: 'get',
        query: { id },
      },
    )

    if (response.code === 2000) {
      console.log(response.data);
      materialCheck.value = {
        ...materialCheck.value,
        value: response.data
      }

      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error'
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error');
  }
}

const loadItemProductClasifications = async () => {
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/clasification/${id}`,
      {
        method: 'get',
      }
    );

    if (response.code === 2000) {
      dataProductClasification.value = response.data;

      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error'
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error');
  }
};

const loadItemProductRincian = async (kode_rincian: string) => {
  loadingRincian.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/rincian/${kode_rincian}`,
      {
        method: 'get',
      }
    );

    if (response.code === 2000) {
      listRincian.value = response.data || [];
      loadingRincian.value = false;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error'
      );
      loadingRincian.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan aaa', 'error');
    loadingRincian.value = false;
  }
};

const addProduct = async () => {
  if (titleDialog.value === 'Tambah Nama Produk') {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-bahan/products/create',
      {
        method: 'post',
        params: { id_reg: id },
        body: formData.value,
      },
    )

    if (response.code === 2000) {
      formData.value = {
        kode_rincian: '',
        nama_produk: '',
        foto_produk: null,
      }
      addDialog.value = false
      reRender.value = !reRender.value
      useSnackbar().sendSnackbar('Sukses menambah data', 'success')
    }
  }
  else if (titleDialog.value === 'Tambah Pembelian Bahan') {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-bahan/catatan/create',
      {
        method: 'post',
        params: { id_reg: id },
        body: formDataCatatan.value,
      },
    )

    if (response.code === 2000) {
      formDataCatatan.value = {
        kode_rincian: '',
        nama_produk: '',
        foto_produk: null,
      }
      addDialog.value = false
      reRender.value = !reRender.value
      useSnackbar().sendSnackbar('Sukses menambah data', 'success')
    }
  }
}

const getListIngredients = async () => {
  try {
    const response: any = await $api(
      '/self-declare/business-actor/ingredient/list',
      {
        method: 'get',
        query: {
          id_reg: id,
        },
      },
    )

    if (response.code === 2000)
      ingredientItems.value = response.data

    return response
  }
  catch (error) {
    console.log(error)
  }
}

const refresh = async () => {
  await Promise.allSettled([
    getListCatatan(),
    getListFormulir(),
  ])
}

onMounted(async () => {
  loading.value = true
  tabs.value = 0
  await Promise.allSettled([
    loadItemProductClasifications(),
    getListCatatan(),
    getListFormulir(),
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
      :toggle="toggle"
      :label-save-btn="labelSaveBtn"
      :on-save="addProduct"
    >
      <template #content>
        <div v-if="titleDialog === 'Tambah Data Bahan'">
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
                  <label>Tipe Bahan</label>
                  <VSelect
                    :items="['1', '2']"
                    outlined
                    placeholder="pilih tipe bahan"
                  />
                  <VDivider class="my-5" />
                  <br>
                  <label>Tipe Bahan</label>
                  <VTextField
                    class="-mt-10"
                    placeholder="pilih jenis bahan"
                  />
                  <br>
                  <label>Nama Bahan</label>
                  <VTextField
                    class="-mt-10"
                    value="Isi Nama Bahan, automatis terisi dengan cari bahan"
                    disabled
                    bg-color="#F6F6F6"
                  />
                  <br>
                  <label>Produsen</label>
                  <VTextField
                    class="-mt-10"
                    placeholder="isi nama produsen"
                  />
                  <br>
                  <label>Nomor Sertifikasi Halal</label>
                  <VTextField
                    class="-mt-10"
                    placeholder="isi nama Nomor Sertifikasi Halal"
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
                    <VFileInput
                      v-model="file"
                      class="custom-file-input"
                      density="compact"
                      rounded="xl"
                      label="No file choosen"
                      max-width="400"
                      dense
                      prepend-icon=""
                      hide-details
                      style="max-inline-size: 300px;"
                      @change="uploadFile"
                    >
                      <template #append-inner>
                        <VBtn rounded="s-0 e-xl" text="Choose" />
                      </template>
                    </VFileInput>
                  </div>
                </div>
              </div>
              <div v-else>
                <VRow
                  no-gutters
                  class="my-5 download-template"
                >
                  <VCol class="d-flex align-center">
                    <VBtn append-icon="mdi-download">
                      Unduh template acuan "unggah bahan"
                    </VBtn>
                  </VCol>
                </VRow>
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
        <div v-if="titleDialog === 'Ubah Data Bahan'">
          <ContentDialogDataBahan
            dialog-type="edit"
            :data="itemDetail"
            @loadList="getListIngredients()"
          />
        </div>
        <div v-if="titleDialog === 'Detail Data Bahan'">
          <ContentDialogDataBahan
            dialog-type="detail"
            :data="itemDetail"
            @loadList="getListIngredients()"
          />
        </div>
        <div v-else-if="titleDialog === 'Tambah Nama Produk'">
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
              @update:modelValue="loadItemProductRincian"
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
                    <VBtn rounded="s-0 e-xl" text="Choose" />
                  </template>
                </VFileInput>
              </VCol>
            </div>
          </div>
        </div>
        <div v-else-if="titleDialog === 'Ubah Catatan'">
          <div>
            <label>Nama</label>
            <VTextField
              class="-mt-10"
              value="isi nama"
            />
            <br>
            <label>Jumlah</label>
            <VTextField
              class="-mt-10"
              value="12"
            />
            <br>
            <label>Tanggal Pembelian</label>
            <VTextField
              id="startDate"
              type="date"
              placeholder="Pilih tanggal mulai"
              clearable
            />
          </div>
        </div>
        <div v-else-if="titleDialog === 'Tambah Pembelian Bahan'">
          <div class="d-flex justify-center align-center">
            <VTabs
              v-model="tabBahan"
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
                style="border-radius: 40px"
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
                style="border-radius: 40px"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsWindow v-model="tabBahan">
            <VTabsWindowItem value="1">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="formData.nama_produk"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="d-flex justify-space-between mt-5">
                <label style="align-self: center;">
                  Unggah Bahan
                </label>
                <VCol cols="6">
                  <VTextField
                    v-if="uploadedFileBahan.file"
                    :model-value="uploadedFileBahan.name"
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
                    :model-value="uploadedFileBahan.file"
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
            </VTabsWindowItem>
            <VTabsWindowItem value="2">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="formDataCatatan.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Jumlah</label>
                <VTextField
                  v-model="formDataCatatan.jumlah"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Tanggal Pembelian</label>
                <VueDatePicker
                  id="tanggal_daftar"
                  v-model="formDataCatatan.tgl_pembelian"
                  teleport-center
                  :enable-time-picker="false"
                  format="dd-MM-yyyy"
                />
              </div>
            </VTabsWindowItem>
          </VTabsWindow>
        </div>
        <div v-else-if="titleDialog === 'Tambah Formulir Pemeriksaan Bahan'">
          <div class="d-flex justify-center align-center">
            <VTabs
              v-model="tabBahan"
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
                style="border-radius: 40px"
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
                style="border-radius: 40px"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsWindow v-model="tabBahan">
            <VTabsWindowItem value="1">
              <div class="d-flex justify-space-between mt-5">
                <label style="align-self: center;">
                  Unggah Bahan
                </label>
                <VCol cols="6">
                  <VTextField
                    v-if="uploadedFileBahan.file"
                    :model-value="uploadedFileBahan.name"
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
                    :model-value="uploadedFileBahan.file"
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
            </VTabsWindowItem>
            <VTabsWindowItem value="2">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="formDataCatatan.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Jumlah</label>
                <VTextField
                  v-model="formDataCatatan.jumlah"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Tanggal Pembelian</label>
                <VueDatePicker
                  id="tanggal_daftar"
                  v-model="formDataCatatan.tgl_pembelian"
                  teleport-center
                  :enable-time-picker="false"
                  format="dd-MM-yyyy"
                />
              </div>
            </VTabsWindowItem>
          </VTabsWindow>
        </div>
      </template>
    </DialogWithAction>
    <TableData
      :id="props?.id"
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Data Bahan')"
      :on-edit="(el: any) => toggleEdit(el, 'Data Bahan')"
      :on-detail="(el: any) => toggleDetail(el, 'Data Bahan')"
      :data="materialName"
      :refresh="refresh"
      title="Daftar Nama Bahan dan Kemasan"
      with-add-button-bahan
    />
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Nama Produk')"
      :on-edit="() => toggleEdit(null, 'Nama Produk')"
      :on-detail="(el: any) => toggleDetail(el, 'Nama Produk')"
      :data="productName"
      :re-render="reRender"
      title="Daftar Nama Produk"
      with-add-button
    >
      <template #headerDialog>
        <div class="bgContent">
          <div class="d-flex flex-wrap mt-5">
            <VIcon
              icon="ri-error-warning-line"
              color="#652672"
            />
            <label class="subText">Setelah mengisi nama produk jangan lupa untuk menetapkan bahan-bahan yang digunakan pada kolom pengisian bahan.</label>
          </div>
        </div>
      </template>
    </TableData>
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Pembelian Bahan')"
      :on-edit="() => toggleEdit(null, 'Pembelian Bahan')"
      :data="payNote"
      title="Catatan Pembelian Bahan"
    />
    <br>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="() => toggleAdd('Formulir Pemeriksaan Bahan')"
      :on-edit="() => toggleEdit(null, 'Formulir Pemeriksaan Bahan')"
      :data="materialCheck"
      title="Formulir Pemeriksaan Bahan"
    />
  </div>
</template>

  <style scoped>
  .text-center {
    text-align: center;
  }
  .subText {
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 18px !important;
    align-content: center;
    padding-left: 10px;
    color: #652672 !important;
  }
  .bgContent {
    background-color: #F0E9F1;
    border-radius: 10px;
    padding-left: 10px;
  }
  .progress-text {
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 20px !important;
  }
  .ml5 {
    margin-left: 25px;
  }
  .download-template {
    background-color: #652672;
    border-radius: 10px;
    font-size: 16px !important;
    color: white;
    width: fit-content;
  }
  </style>
