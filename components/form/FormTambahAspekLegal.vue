<script setup lang="ts">
import { useDisplay } from 'vuetify'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['confirm'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const form = ref({
  type: null,
  documentNumber: null,
  date: new Date(),
  validDate: new Date(),
  issuer: null,
})

const resetForm = () => {
  form.value = {
    type: null,
    documentNumber: null,
    date: new Date(),
    validDate: new Date(),
    issuer: null,
  }
}

const confirm = () => {
  emit('confirm', form.value)
  resetForm()
  closeDialog()
}

const cancel = () => {
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})

const documentTypes = ['SIUP', 'ANOTHER']

</script>

<template>
  <div class="mb-2">
    <VBtn
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
    >
      Tambah
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Tambah Data Aspek Legal</span>
          <VBtn
            icon
            color="transparent"
            style="border: none;"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">
              ri-close-line
            </VIcon>
          </VBtn>
        </VCardTitle>

        <VCardText>
          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Jenis Document</VLabel>
              <VAutocomplete
                v-model="form.type"
                :items="documentTypes"
                placeholder="Pilih Jenis Document"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Nomor Document</VLabel>
              <VTextField
                v-model="form.documentNumber"
                placeholder="Isi Nomor Document"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>
          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel for="tanggalDocument">Tanggal Document</VLabel>
              <VueDatePicker teleport-center id="tanggalDocument" v-model="form.date" :enable-time-picker="false" />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel for="masaBerlaku">Masa Berlaku</VLabel>
              <VueDatePicker teleport-center id="masaBerlaku" v-model="form.validDate" :enable-time-picker="false" />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Instansi Penerbit</VLabel>
              <VTextField
                v-model="form.issuer"
                placeholder="Isi Instansi Penerbit"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn
            variant="outlined"
            @click="cancel"
          >
            Batal
          </VBtn>
          <VBtn
            @click="confirm"
          >
            Simpan
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
</style>
