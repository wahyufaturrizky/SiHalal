<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'
import { useDisplay } from 'vuetify'


const inputValue = ref("")

const emit = defineEmits(['confirm', 'cancel'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const confirm = () => {
  emit('confirm', inputValue.value)
  inputValue.value = ""
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
    <VBtn @click="openDialog" variant="outlined" color="primary" append-icon="ri-reset-left-line">
      Return
    </VBtn>

    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard >
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Return Confirmation </span>
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
            Are you sure you want to Return this submission?
          </p>
          <VTextarea
            v-model="inputValue"
            placeholder="Input Return Note (Opsional) "
            clearable
            auto-grow
            dense
            outlined
            :style="{ maxWidth: '100%' }"
          />
        </VCardText>
        <VCardActions>
          <VBtn @click="cancel" variant="outlined" text >
            Cancel
          </VBtn>
          <VBtn @click="confirm" color="primary" variant="flat" >
            Yes, Return
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
</style>
