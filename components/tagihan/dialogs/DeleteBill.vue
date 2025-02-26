<script setup lang="ts">
import { ref } from 'vue'

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
      <Vbtn
        variant="plain"
        class="cursor-pointer"
        v-bind="props"
      >
        <VIcon
          icon="mdi-delete"
          color="error"
        />
      </Vbtn>
    </template>

    <!-- Konten di dalam dialog -->
    <VCard>
      <VCardTitle>{{ t('task-force.tagihan-bpjph-dialog-delete-title') }}</VCardTitle>
      <VCardText>
        <slot name="contentDelete" />
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          variant="outlined"
          @click="dialog = false"
        >
          {{ t('task-force.tagihan-bpjph-dialog-delete-btn-batal') }}
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
        {{ t('task-force.tagihan-bpjph-dialog-delete-btn-submit') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
