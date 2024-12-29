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
    default: 'Open Dialog',
  },
  labelBackBtn: {
    type: String,
    default: 'Batal',
  },
  labelSaveBtn: {
    type: String,
    default: 'Ubah',
  },
})

const dialog = ref(false)

const emit = defineEmits()

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
        append-icon="ri-more-2-line"
        variant="plain"
      />
    </template>

    <!-- Konten di dalam dialog -->
    <VCard>
      <VCardTitle>{{ title }}</VCardTitle>
      <VCardText>
        <slot name="content" />
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          variant="outlined"
          @click="dialog = false"
        >
          {{ props.labelBackBtn }}
        </VBtn>
        <VBtn
          text
          variant="elevated"
          @click="confirmAction"
        >
          {{ props.labelSaveBtn }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
