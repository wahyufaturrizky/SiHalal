<template>
  <div class="mb-2">
    <VBtn v-if="props.mode === 'add'" @click="openDialog" variant="outlined" append-icon="ri-add-line">
      Tambah
    </VBtn>
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Tambah Data Aspek Legal'</span>
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
          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Jenis Document</VLabel>
              <VAutocomplete
                v-model="form.jenisDocument"
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
                  v-model="form.nomorDocument"
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
              <VLabel>Tanggal Document</VLabel>
              <VTextField
                  v-model="form.tanggalDocument"
                  placeholder="Isi Tanggal Document"
                  outlined
                  dense
                  required
                  type="date"
                  class="input-field"
              />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Masa Berlaku</VLabel>
              <VTextField
                  v-model="form.masaBerlaku"
                  placeholder="Isi Masa Berlaku"
                  outlined
                  dense
                  required
                  type="date"
                  class="input-field"
              />
            </VCol>
          </VRow>

          <VRow class="mb-1">
            <VCol cols="12">
              <VLabel>Instansi Penerbit</VLabel>
              <VTextField
                  v-model="form.instansiPenerbit"
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
          <VBtn @click="cancel" variant="outlined">
            Batal
          </VBtn>
          <VBtn @click="confirm" :color="props.confirmColor">
            {{ props.mode === 'add' ? 'Tambah' : 'Simpan' }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

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

const form = ref({
  jenisDocument: null,
  nomorDocument: '',
  tanggalDocument: '',
  masaBerlaku: '',
  instansiPenerbit: '',
})

const documentTypes = ['SIUP', 'ANOTHER']

watch(
    () => props.initialData,
    newData => {
      if (props.mode === 'edit' && newData) {
        form.value = { ...newData }
      }
    },
    { immediate: true },
)
</script>

<style scoped>
</style>
