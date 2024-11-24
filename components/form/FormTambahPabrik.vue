<script setup lang="ts">
import { useDisplay } from 'vuetify'

const emit = defineEmits(['confirm'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const form = ref({
  location: null,
  name: '',
  address: '',
  regency: '',
  provinsi: '',
  country: '',
  zipCode: '',
  status: null,
})

const resetForm = () => {
  form.value = {
    location: null,
    name: '',
    address: '',
    regency: '',
    provinsi: '',
    country: '',
    zipCode: '',
    status: null,
  }
}

const status = [{title : 'Milik Sendiri', value: '1'}, {title: 'Publik', value: '2'} ]
const location = [{title : 'Lokasi 1', value : '1'} , {title : 'Lokasi 2', value: '2' }]


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

</script>

<template>
  <div class="mb-2">
    <VBtn @click="openDialog" variant="outlined" prepend-icon="ri-add-line">
      Tambah
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Tambah Data Pabrik</span>
          <VBtn
            icon
            color="transparent"
            style="border: none;"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">ri-close-line</VIcon>
          </VBtn>
        </VCardTitle>

        <VCardText>
          <!-- Lokasi Pabrik -->
          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Lokasi Pabrik</VLabel>
              <VAutocomplete
                v-model="form.location"
                :items="location"
                placeholder="Pilih Lokasi Pabrik"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Nama Pabrik</VLabel>
              <VTextField
                v-model="form.name"
                placeholder="Isi Nama Pabrik"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Alamat Pabrik</VLabel>
              <VTextField
                v-model="form.address"
                placeholder="Isi Alamat Pabrik"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="6" class="pe-1">
              <VLabel>Kab/Kota</VLabel>
              <VTextField
                v-model="form.regency"
                placeholder="Isi Kab/Kota"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
            <VCol cols="6" class="ps-1">
              <VLabel>Provinsi</VLabel>
              <VTextField
                v-model="form.provinsi"
                placeholder="Isi Provinsi"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>

          <!-- Negara and Kode Pos -->
          <VRow class="mb-1">
            <VCol cols="6" class="pe-1">
              <VLabel>Negara</VLabel>
              <VTextField
                v-model="form.country"
                placeholder="Isi Negara"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
            <VCol cols="6" class="ps-1">
              <VLabel>Kode Pos</VLabel>
              <VTextField
                v-model="form.zipCode"
                placeholder="Isi Kode Pos"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>

          <!-- Status Pabrik -->
          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Status Pabrik</VLabel>
              <VAutocomplete
                v-model="form.status"
                :items="status"
                placeholder="Pilih Status Pabrik"
                outlined
                dense
                required
                class="input-field"
              />
            </VCol>
          </VRow>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined">
            Batal
          </VBtn>
          <VBtn @click="confirm" >
            Tambah
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
</style>
