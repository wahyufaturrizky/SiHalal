<script setup>
import { ref } from 'vue'

// Props untuk menerima data dari parent
defineProps({
  title: {
    type: String,
    default: 'Default Title',
  },
  content: {
    type: String,
    default: 'Default Content',
  },
  buttonText: {
    type: String,
    default: 'Open Dialog',
  },
})

const dialog = ref(false)

const confirmAction = () => {
  dialog.value = false
  alert('Confirmed!')
}
</script>

<template>
  <VDialog
    v-model="dialog"
    max-width="400px"
  >
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        variant="outlined"
        append-icon="ri-add-line"
      >
        {{ buttonText }}
      </VBtn>
    </template>

    <!-- Konten di dalam dialog -->
    <VCard>
      <VCardTitle class="font-weight-bold">
        {{ title }}
      </VCardTitle>
      <VCardText>
        <slot name="content" />
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          variant="outlined"
          @click="dialog = false"
        >
          Batal
        </VBtn>
        <VBtn
          text
          variant="elevated"
          @click="confirmAction"
        >
          Tambah
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
