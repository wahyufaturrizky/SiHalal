<script setup lang="ts">

import {ref} from 'vue'


const typedProcess = ref("")
const prosesProduction = ref("")


const snackbar = useSnackbar()

const save = () => {
  console.log("PROSES PRODUCTION ", prosesProduction.value)
  snackbar.sendSnackbar("Berhasil Mengubah Data ", "success")
}

const add = () => {
  prosesProduction.value = prosesProduction.value != '' ? `${prosesProduction.value  }\n${  typedProcess.value}` : typedProcess.value
}

</script>

<template>
  <VCard>
    <VCardTitle class="pa-4 d-flex justify-space-between align-center">
      <h4 class="text-h4">Proses Produksi Halal</h4>
      <VBtn @click="save" >Simpan Perubahan</VBtn>
    </VCardTitle>
    <VCardItem>
      <VRow class="d-flex justify-space-between align-center">
        <VCol cols="6" class="text-h6">Ketik Proses</VCol>
        <VCol cols="6" class="d-flex justify-space-between align-center ga-4">
          <VTextField
            v-model="typedProcess"
            placeholder="Isi Ketik Proses"
            dense
            outlined
            class="mr-3"
          />
          <VBtn dense outlined @click="add">
            Tambah
          </VBtn>
        </VCol>
      </VRow>
    </VCardItem>
    <br />
    <VCardText>
      <p>Proses Produksi</p>
      <VTextarea
        v-model="prosesProduction"
        placeholder="Masukkan proses produksi"
        outlined
        dense
      />
    </VCardText>

  </VCard>
</template>

<style scoped lang="scss">

</style>
