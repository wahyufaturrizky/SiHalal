<script setup lang="ts">
import { ref } from 'vue'

// Props untuk menerima data dari parent
const props = defineProps({
  title: {
    type: String,
    default: 'Default Title',
  },
  buttonText: {
    type: String,
    default: 'Hapus',
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  onDelete: {
    type: Function,
    default: () => {},
    required: false,
  },
  withLabelHeader: {
    type: Boolean,
    required: false,
  },
})

const dialog = ref(false)
</script>

<template>
  <VDialog
    v-model="dialog"
    max-width="60svw"
  >
    <template #activator="{ props }">
      <div class="d-flex gap-2">
        <VBtn
          v-bind="props"
          variant="plain"
          append-icon="fa-trash"
        />
        <div v-bind="props">
          <p class="mt-2 cursor-pointer">Delete</p>
        </div>
      </div>
    </template>

    <!-- Konten di dalam dialog -->
    <VCard>
      <VCardTitle>{{ title }}</VCardTitle>
      <VCardText>
        Are you sure you want to delete this data?
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          variant="outlined"
          @click="dialog = false"
        >
          Cancel
        </VBtn>
        <VBtn
          text
          variant="elevated"
          color="#E1442E"
          @click="() => {
            dialog = false
            props.onDelete()
          }"
        >
          Delete
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
