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

const emit = defineEmits()


const dialog = ref(false)

const confirmAction = () => {
  emit('submit')
  dialog.value = false
}
</script>

<template>
  <VDialog
    v-model="dialog"
    max-width="60svw"
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
