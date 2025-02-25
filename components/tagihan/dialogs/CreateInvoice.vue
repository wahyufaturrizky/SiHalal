<script setup lang="ts">
import { ref } from 'vue'

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// Props untuk menerima data dari parent
const props = defineProps({
  title: {
    type: String,
    default: 'Konfirmasi Buat Invoice',
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
  onApprove: {
    type: Function,
    default: () => {},
    required: false,
  },
  withLabelHeader: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  }
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
        append-icon="ri-file-3-line"
        v-bind="props"
        :disabled="disabled"
      >
        {{ t('task-force.tagihan-bpjph-buat-tagihan-table.btn-invoice') }}
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
          <div
            style="margin-right: 10px;"
            @click="dialog = false"
          >
            <VIcon icon="fa-times" size="20px" />
          </div>
        </div>
      </VCardTitle>
      <VCardText>
        <slot name="content" />
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
              props.onApprove()
            }"
          >
            {{ props.buttonText }}
          </VBtn>
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
