<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import { useDisplay } from 'vuetify'

const emit = defineEmits(['confirm'])

const isVisible = ref(false)

const rules = {
  required: value => !!value || 'Wajib Diisi',
  selectRequired: v => v.length > 0 || 'Wajib Diisi',
}


const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const formRef = ref(null)

const formSubmission = ref({
  name: '',
  jabatan: '',
  posisi: '',
})

const resetForm = () => {
  form.value = {
    name: null,
    jabatan: null,
    posisi: null,
  }
}

// TODO -> CEK FORM
const confirm = () => {
  console.log('valid ', formRef.value)
  emit('confirm', formSubmission.value)
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
  <div class="ma-1">
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
          <span>Tambah Anggota Komitmen</span>
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
        <VForm
          ref="formRef"
          @submit.prevent="confirm"
        >
          <VCardItem>
            <CustomTextField
              id="name"
              v-model="formSubmission.name"
              label="Nama"
              placeholder="Isi Nama"
              :rules="[rules.required]"
              class="mb-4"
            />
            <CustomTextField
              id="name"
              v-model="formSubmission.jabatan"
              label="Jabatan"
              placeholder="Isi Jabatan"
              :rules="[rules.required]"
              class="mb-4"
            />
            <CustomTextField
              id="posisi"
              v-model="formSubmission.posisi"
              label="Posisi"
              placeholder="Isi Posisi"
              :rules="[rules.required]"
              class="mb-4"
            />
          </VCardItem>

          <VCardActions class="d-flex justify-end gap-2">
            <VBtn
              variant="outlined"
              @click="cancel"
            >
              Batal
            </VBtn>
            <VBtn
              color="primary"
              type="submit"
            >
              Tambah
            </VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">

</style>
