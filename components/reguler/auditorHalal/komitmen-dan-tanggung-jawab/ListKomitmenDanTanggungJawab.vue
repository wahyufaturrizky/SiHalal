<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  onComplete: {
    type: Function,
    default: () => { },
    required: false,
  },
})

const addDialog = ref(false)
const titleDialog = ref('')
const labelSaveDialog = ref('')

const comitmentData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'name', nowrap: true },
      { title: 'Jabatan', key: 'role', nowrap: true },
      { title: 'Posisi', key: 'position', nowrap: true },
      { title: 'Action', value: 'actionPopOver2', sortable: false, nowrap: true, popOver: true },
    ],
    value: [
      { no: 1, name: 'SIUP', role: '0128749286836', position: '-' },
      { no: 2, name: 'NPWP', role: '0128749286836', position: '11/11/2024' },
    ],
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

// const getDetailData: any = async () => {
//   try {
//     const response = await $api('/reguler/pelaku-usaha/detail-tab', {
//       method: 'get',
//       params: { id: props?.id, type: 'tim-manajemen-halal' },
//     })
//     console.log(response, '<<<<===')
//   }
//   catch (error) {
//     useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
//   }
// }

// onMounted(async () => {
//   await getDetailData()
// })
</script>

<template>
  <div>
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
            class="-mt-10"
            placeholder="isi Nama"
          />
          <br>
          <p class="label-pengajuan">
            Jabatan
          </p>
          <VTextField
            class="-mt-10"
            placeholder="isi Jabatan"
          />
          <br>
          <p class="label-pengajuan">
            Posisi
          </p>
          <VTextField
            class="-mt-10"
            placeholder="isi Posisi"
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
