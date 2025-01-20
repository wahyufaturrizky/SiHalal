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
  onReturn: {
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
      <VBtn
        append-icon="fa-undo"
        v-bind="props"
        variant="outlined"
      >
        Dikembalikan
      </VBtn>
    </template>

    <!-- Konten di dalam dialog -->
    <VCard>
      <VCardTitle>
        <div
          class="d-flex w-100"
          style="justify-content: space-between;"
        >
          {{ title }}
          <div style="margin-right: 10px;">
            <VIcon icon="fa-times" size="20px" />
          </div>
        </div>
      </VCardTitle>
      <VCardText>
        <slot name="contentDelete" />
      </VCardText>
      <VCardActions>
        <div style="margin-right: 10px;">
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
            color="primary"
            @click="() => {
              dialog = false
              props.onReturn()
            }"
          >
            {{ props.buttonText }}
          </VBtn>
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
