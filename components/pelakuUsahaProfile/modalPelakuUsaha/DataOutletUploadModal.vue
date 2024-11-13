<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
})

const emit = defineEmits(['cancel', 'uploadFile'])

const isVisible = ref(false)
const file = ref<File | null>(null)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const cancel = () => {
  emit('cancel')
  closeDialog()
}

const upload = () => {
  if (file.value) {
    emit('uploadFile', file.value)
    closeDialog()
  } else {
    alert("Please choose a file to upload")
  }
}

const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})
</script>

<template>
  <div class="ma-1">
    <VBtn @click="openDialog" variant="outlined" append-icon="ri-add-line">
      Upload
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Upload Data Outlet</span>
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
          <div>
            <span>Untuk template file upload, bisa untuk melalui <a href="/path/to/template.xlsx" download class="text-decoration-underline">link ini</a> download</span>
          </div>
          <VFileInput
            v-model="file"
            label="Pilih Dokumen"
            outlined
            dense
            required
            class="my-4"
          />
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn @click="cancel" variant="outlined">
            Batal
          </VBtn>
          <VBtn @click="upload" color="primary">
            Upload
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
</style>
