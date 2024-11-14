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
  namaOutlet: '',
  alamatOutlet: '',
  kabKota: '',
  provinsi: '',
  negara: '',
  kodePos: '',
})
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

<template>
  <div class="ma-1">
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
          <span>{{ props.mode === 'add' ? 'Tambah Data Outlet' : 'Edit Data Outlet' }}</span>
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
          <VTextField
            v-model="form.namaOutlet"
            label="Nama Outlet"
            outlined
            dense
            required
            class="mb-2"
          />
          <VTextField
            v-model="form.alamatOutlet"
            label="Alamat Outlet"
            outlined
            dense
            required
            class="mb-2"
          />

          <VRow no-gutters class="mb-2">
            <VCol cols="5" class="me-2">
              <VTextField
                v-model="form.kabKota"
                label="Kab/Kota"
                outlined
                dense
                required
              />
            </VCol>
            <VSpacer />
            <VCol cols="5">
              <VTextField
                v-model="form.provinsi"
                label="Provinsi"
                outlined
                dense
                required
              />
            </VCol>
          </VRow>

          <VRow no-gutters>
            <VCol cols="5" class="me-2">
              <VTextField
                v-model="form.negara"
                label="Negara"
                outlined
                dense
                required
              />
            </VCol>
            <VSpacer />
            <VCol cols="5">
              <VTextField
                v-model="form.kodePos"
                label="Kode Pos"
                outlined
                dense
                required
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

<style scoped>
</style>
