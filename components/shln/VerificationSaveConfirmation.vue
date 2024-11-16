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
    <VBtn @click="openDialog" variant="flat" color="success" >
      Approve
    </VBtn>

    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard >
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Approve Confirmation  </span>
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
            Are you sure you want to approve this submission?
          </p>
        </VCardText>
        <VCardActions>
          <VBtn @click="cancel" variant="outlined" text >
            Cancel
          </VBtn>
          <VBtn @click="confirm" color="success" variant="flat" >
            Approve
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
</style>
