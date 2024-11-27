<script setup lang="ts">
import { useDisplay } from "vuetify"

const emit = defineEmits(['confirm'])
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
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? props.cardWidth : '90%'
})
</script>

<template>
  <VBtn @click="openDialog" variant="flat" min-width="120px">
    Simpan
  </VBtn>

  <VDialog
    v-model="isVisible"
    :max-width="dialogMaxWidth"
  >
    <VCard class="pa-2">
      <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
        <span>Simpan Perubahan</span>
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
      <VCardText>Apakah yakin ingin menyimpan perubahan data ini</VCardText>
      <div class="d-flex justify-end ga-2">
        <VBtn @click="cancel" variant="outlined" >
          Batal
        </VBtn>
        <VBtn @click="confirm" variant="flat">
          Ya, Simpan
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">

</style>
