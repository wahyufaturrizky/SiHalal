<script setup>
import { ref } from 'vue'

// Props untuk menerima data dari parent
const props = defineProps({
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
    default: 'Hapus',
    required: false,
  },
})

const dialog = ref(false)

const confirmAction = () => {
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
        variant="plain"
        append-icon="fa-trash"
      />
    </template>

    <!-- Konten di dalam dialog -->
    <VCard>
      <VCardTitle>{{ title }}</VCardTitle>
      <VCardText>
        <slot name="contentDelete" />
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
          color="#E1442E"
          @click="confirmAction"
        >
          {{ props.buttonText }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
