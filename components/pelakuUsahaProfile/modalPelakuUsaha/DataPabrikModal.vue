<template>
  <div class="mb-2">
    <VBtn v-if="props.mode === 'add'" @click="openDialog" variant="outlined" append-icon="ri-add-line">
      Tambah
    </VBtn>
    <VBtn v-else-if="props.mode === 'edit'" @click="openDialog" variant="outlined" prepend-icon="ri-edit-line">
      Edit
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>{{ props.mode === 'add' ? 'Tambah Data Pabrik' : 'Edit Data Pabrik' }}</span>
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
                v-model="form.lokasiPabrik"
                :items="lokasiPabrikOptions"
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
                v-model="form.namaPabrik"
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
                v-model="form.alamatPabrik"
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
                v-model="form.kabKota"
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
                v-model="form.negara"
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
                v-model="form.kodePos"
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
                v-model="form.statusPabrik"
                :items="statusOptions"
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
          <VBtn @click="confirm" :color="props.confirmColor">
            {{ props.mode === 'add' ? 'Tambah' : 'Simpan' }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  mode: { type: String, default: 'add' },
  initialData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['confirmAdd', 'confirmEdit', 'cancel'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const confirm = () => {
  if (props.mode === 'add') {
    emit('confirmAdd', form.value)
  } else {
    emit('confirmEdit', form.value)
  }
  closeDialog()
}

const cancel = () => {
  emit('cancel')
  closeDialog()
}

const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})

const form = ref({
  lokasiPabrik: '',
  namaPabrik: '',
  alamatPabrik: '',
  kabKota: '',
  provinsi: '',
  negara: '',
  kodePos: '',
  statusPabrik: '',
})

const statusOptions = ['Aktif', 'Non-Aktif']
const lokasiPabrikOptions = ['Lokasi 1', 'Lokasi 2', 'Lokasi 3']

watch(
  () => props.initialData,
  newData => {
    if (props.mode === 'edit' && newData) {
      form.value = { ...newData }
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.input-field {
  height: 36px;
}
</style>
