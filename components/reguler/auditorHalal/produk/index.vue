<script setup>
import { ref } from 'vue'

const addDialog = ref(false)
const confirmSaveDialog = ref(false)
const titleDialog = ref('')

const comitmentData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Produk', key: 'productName', nowrap: true },
      { title: 'Nama Pabrik', key: 'factoryName', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true, popOver: true },
    ],
    value: [
      { no: 1, productName: 'Kopi Luak Ciater', factoryName: 'Kopi Luakuy' },
      { no: 2, productName: 'Kopi Luak Lembang', factoryName: 'Kopi Lembang' },
    ],
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
        <div v-if="titleDialog === 'Tambah Pemetaan Produk dan Pabrik'">
          <VRow class="mb-1">
            <VCol>
              <label>Nomor</label>
              <VSelect
                :items="['1', '2']"
                outlined
                class="-mt-5"
                placeholder="pilih nomor"
              />
            </VCol>
            <VCol>
              <label>Sampai</label>
              <VSelect
                :items="['1', '2']"
                outlined
                class="-mt-5"
                placeholder="pilih sampai"
              />
            </VCol>
          </VRow>
          <label>
            Pabrik
          </label>
          <VTextField
            class="-mt-10"
            placeholder="isi Nama Pabrik"
          />
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
