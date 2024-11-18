<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'
import { useDisplay } from 'vuetify'


const emit = defineEmits(['confirm', 'cancel'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const confirm = () => {
  emit('confirm')
  closeDialog()
}

const cancel = () => {
  emit('cancel')
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp ? 700 : '90%'
})
</script>

<template>
  <div class="ma-1">
    <VBtn @click="openDialog" variant="flat" color="primary" >
      Simpan Perubahan
    </VBtn>

    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard >
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Simpan Perubahan  </span>
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
        <VCardText >
          <p class="mb-2">
            Apakah kamu yakin ingin menyimpan perubahan data ?
          </p>
        </VCardText>
        <VCardActions>
          <VBtn @click="cancel" variant="outlined" text >
            Batal
          </VBtn>
          <VBtn @click="confirm" class="primaru" variant="flat" >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>A
  </div>
</template>

<style scoped>
</style>
