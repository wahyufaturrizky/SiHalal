<script setup lang="ts">
import { useDisplay } from 'vuetify'

const snackBar = useSnackbar()

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['confirm'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const form = ref(props.initialData)


const confirm = () => {
  emit('confirm', form.value)
  closeDialog()
}

const cancel = () => {
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})

const kualitasProduk = [
  { title: 'Kualitas Produk 1' , value: '1'},
  { title: 'Kualitas Produk 2' , value : '2'}
]

const rincialProduk = [
  { title: 'Rincian Produk 1' , value: '1'},
  { title: 'Rincian Produk 2' , value : '2'}
]


</script>

<template>
  <VBtn variant="text" prepend-icon="ri-edit-line"
        @click="openDialog" block >
    Ubah
  </VBtn>
  <VDialog
    v-model="isVisible"
    :max-width="dialogMaxWidth"
  >
    <VCard class="pa-2">
      <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
        <span>Edit Nama Produk</span>
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
        <VLabel for="kualitasProduk">
          Kualitas Produk
        </VLabel>
        <VSelect
          id="kualitasProduk"
          v-model="form.kualitasProduk"
          placeholder="Pilih Kualitas Produk"
          outlined
          dense
          required
          class="mb-2"
          :items="kualitasProduk"
        />

        <VLabel for="rincianProduk">
          Rincian Produk
        </VLabel>
        <VSelect
          id="rincianProduk"
          v-model="form.rincianProduk"
          placeholder="Isi Rincian Produk"
          outlined
          dense
          required
          class="mb-2"
          :items="rincialProduk"
        />
        <VLabel for="namaProduk">
          Nama Produk
        </VLabel>
        <VTextField
          id="namaProduk"
          v-model="form.namaProduk"
          placeholder="Isi Nama Produk"
          outlined
          dense
          required
          class="mb-4"
        />
        <VRow no-gutters class="d-flex justify-space-between align-center">
          <VCol cols="6">
            <VLabel for="uploadProduk">Upload Produk</VLabel>
          </VCol>
          <VCol cols="6">
            <VFileInput v-model="form.foto"  ></VFileInput>
          </VCol>
        </VRow>
      </VCardText>

      <div class="d-flex justify-end ga-2">
        <VBtn @click="cancel" variant="outlined">
          Batal
        </VBtn>
        <VBtn @click="confirm">
          Ubah
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped>
</style>
