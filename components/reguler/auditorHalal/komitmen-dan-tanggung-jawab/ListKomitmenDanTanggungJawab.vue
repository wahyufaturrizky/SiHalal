<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  onComplete: {
    type: Function,
    default: () => { },
    required: false,
  },
})

const route = useRoute()
const id = route.params.id
const idForEdit = ref('')
const isEdit = ref(false)
const loading = ref(false)

const addDialog = ref(false)
const titleDialog = ref('')

const formAdd = ref<any>({
  nama: '',
  jabatan: '',
  posisi: '',
})

const resetForm = () => {
  formAdd.value = {
    nama: '',
    jabatan: '',
    posisi: '',
  }
}

const labelSaveDialog = ref('')
const editItem = ref<any>({})

const comitmentData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'nama', nowrap: true },
      { title: 'Jabatan', key: 'jabatan', nowrap: true },
      { title: 'Posisi', key: 'posisi', nowrap: true },
      { title: 'Action', value: 'actionPopOver2', sortable: false, nowrap: true, popOver: true },
    ],
    value: [],
  },
)

const toggleAdd = () => {
  addDialog.value = true
  isEdit.value = false
  titleDialog.value = 'Tambah Anggota Komitmen'
}

const toggleEdit = (item: any) => {
  idForEdit.value = item?.id_reg_tim
  isEdit.value = true
  formAdd.value = {
    nama: item?.nama,
    jabatan: item?.jabatan,
    posisi: item?.posisi,
  }
  addDialog.value = true
  titleDialog.value = 'Ubah Anggota Komitmen'
}

const getDetailData: any = async () => {
  try {
    const response = await $api('/reguler/pelaku-usaha/detail-tab', {
      method: 'get',
      params: { id, type: 'tim-manajemen-halal' },
    })

    comitmentData.value = {
      ...comitmentData.value,
      value: response?.data || []
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const toggleDelete = async (item: any) => {
  const response = await $api('/reguler/pelaku-usaha/delete-komitmen-tanggung-jawab', {
    method: 'delete',
    params: { id, id_edit: item?.id_reg_tim },
    body: {
      nama: item?.nama,
      jabatan: item?.jabatan,
      posisi: item?.posisi,
    },
  })

  if (response?.code === 2000) {
    formAdd.value = {
      name: '',
      jabatan: '',
      posisi: '',
    }
    useSnackbar().sendSnackbar('Sukses menghapus data', 'success')
  }
  else {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
  await getDetailData()
}

const handleAddOrEdit = async () => {
  if (isEdit.value) {
    const response = await $api('/reguler/pelaku-usaha/edit-komitmen-tanggung-jawab', {
      method: 'put',
      params: { id, id_edit: idForEdit.value },
      body: formAdd.value,
    })

    if (response?.code === 2000) {
      formAdd.value = {
        name: '',
        jabatan: '',
        posisi: '',
      }
      useSnackbar().sendSnackbar('Sukses menambah data', 'success')
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  else {
    const response = await $api('/reguler/pelaku-usaha/add-komitmen-tanggung-jawab', {
      method: 'post',
      params: { id },
      body: formAdd.value,
    })

    if (response?.code === 2000) {
      formAdd.value = {
        name: '',
        jabatan: '',
        posisi: '',
      }
      useSnackbar().sendSnackbar('Sukses menambah data', 'success')
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  addDialog.value = false
  await getDetailData()
}

onMounted(async () => {
  loading.value = true
  await getDetailData()
  loading.value = false
})
</script>

<template>
  <div v-if="!loading">
    <DialogWithAction
      :title="titleDialog"
      :is-open="addDialog"
      :label-save-btn="labelSaveBtn"
      :toggle="() => addDialog = false"
      :on-save="handleAddOrEdit"
    >
      <template #content>
        <div>
          <p class="label-pengajuan">
            Nama
          </p>
          <VTextField
            v-model="formAdd.nama"
            class="-mt-10"
            placeholder="isi Nama"
          />
          <br>
          <p class="label-pengajuan">
            Jabatan
          </p>
          <VTextField
            v-model="formAdd.jabatan"
            class="-mt-10"
            placeholder="isi Jabatan"
          />
          <br>
          <p class="label-pengajuan">
            Posisi
          </p>
          <VSelect
            v-model="formAdd.posisi"
            :items="[{ name: 'Ketua', value: 'Ketua' }, { name: 'Anggota', value: 'Anggota' }]"
            item-value="value"
            item-title="name"
            density="compact"
            placeholder="Pilih posisi"
          />
        </div>
      </template>
    </DialogWithAction>
    <TableData
      :on-submit="() => onSubmit()"
      :on-add="toggleAdd"
      :on-edit="toggleEdit"
      :on-delete="toggleDelete"
      :data="comitmentData"
      title="Komitmen dan Tanggung Jawab"
      with-add-button
      with-approve-button
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
  </style>
