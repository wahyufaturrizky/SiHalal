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
const loading = ref(false)

const addDialog = ref(false)
const titleDialog = ref('')
const formAdd = ref<any>({
  name: '',
  jabatan: '',
  posisi: '',
})

const labelSaveDialog = ref('')

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
  titleDialog.value = 'Tambah Anggota Komitmen'
}

const toggleEdit = () => {
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

const handleAddOrEdit = async () => {
  const response = await $api('/reguler/pelaku-usaha/add-komitmen-tanggung-jawab', {
    method: 'post',
    params: { id },
    body: formAdd.value,
  })

  if (response?.code === 2000)
    useSnackbar().sendSnackbar('Sukses menambah data', 'success')
  else
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
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
            :items="[{ name: 'Ketua', value: 'Ketua' }, { name: 'Lainnya', value: 'Lainnya' }]"
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
