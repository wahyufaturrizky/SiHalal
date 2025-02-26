<script setup lang="ts">
import { ref } from 'vue'

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// Props untuk menerima data dari parent
const props = defineProps({
  title: {
    type: String,
    default: 'Konfirmasi',
  },
  buttonText: {
    type: String,
    default: 'Ya, Setuju',
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
  },
  visibleDialogVerification: {
    type: Boolean,
    required: false,
  }
})

const dialog = ref(props.visibleDialogVerification)

watch(
  () => props.visibleDialogVerification,
  (newVal) => {
    dialog.value = newVal;
  }
);
</script>

<template>
  <VDialog
    v-model="dialog"
    max-width="60svw"
  >
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        :disabled="disabled"
      >
        {{ t('task-force.proses-sidang.detail.section-informasi-penetapan.btn') }}
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
      <VCardActions v-if="title === 'Konfirmasi'">
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
