<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const addDialog = ref(false)
const confirmSaveDialog = ref(false)
const loading = ref(false)
const titleDialog = ref('')
const id = route.params.id
const lovPabrik = ref<any>([])

const comitmentData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Produk', key: 'nama_produk', nowrap: true },
      { title: 'Nama Pabrik', key: 'nama_pabrik', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true, popOver: true },
    ],
    value: [],
  },
)

const toggleAdd = () => {
  addDialog.value = true
  titleDialog.value = 'Tambah Pemetaan Produk dan Pabrik'
}

const toggleEdit = () => {
  addDialog.value = true
  titleDialog.value = 'Ubah Pemetaan Produk dan Pabrik'
}

const handleSubmit = () => {
  // submit
}

const getListData = async () => {
  try {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-produk/list',
      {
        method: 'get',
        query: {
          url: `${LIST_TAB_PRODUK}${id}/list`,
        },
      },
    )

    if (response.code === 2000) {
      comitmentData.value = {
        ...comitmentData.value,
        value: response.data,
      }
    }

    return response.data
  }
  catch (error) {
    console.log(error)
  }
}

const getListPabrikLayout = async () => {
  try {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-produk/list',
      {
        method: 'get',
        query: {
          url: `${LIST_TAB_PRODUK}${id}/list-pabrik`,
        },
      },
    )

    if (response.code === 2000)
      lovPabrik.value = response.data

    return response.data
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.allSettled([
    getListData(),
    getListPabrikLayout(),
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
      :on-save="handleAddOrEdit"
    >
      <template #content>
        <div v-if="titleDialog === 'Tambah Pemetaan Produk dan Pabrik'">
          <ProductModalContent :data="lovPabrik" />
        </div>
      </template>
    </DialogWithAction>
    <TableData
      :on-submit="() => confirmSaveDialog = true"
      :on-add="toggleAdd"
      :on-edit="toggleEdit"
      :data="comitmentData"
      title="Pemetaan Produk dan Pabrik"
      with-add-button
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
