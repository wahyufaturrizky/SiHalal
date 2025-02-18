<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    default: "Default Title",
  },
  content: {
    type: String,
    default: "Default Content",
  },
  buttonText: {
    type: String,
    default: "Open Dialog",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  toggle: {
    type: Function,
    default: () => {},
    required: false,
  },
  onSave: {
    type: Function,
    default: () => {},
    required: false,
  },
});

const emit = defineEmits(["update:isOpen"]);

const dialogOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit("update:isOpen", value),
});
</script>

<template>
  <VDialog v-model="dialogOpen" max-width="60svw">
    <VCard>
      <VCardTitle class="font-weight-bold">
        {{ title }}
      </VCardTitle>
      <VCardText>
        <p>{{ t("pengajuan-reguler.reguler-label-save-1") }}</p>
      </VCardText>
      <VCardActions>
        <VBtn color="primary" variant="outlined" @click="props.toggle">
          {{ t("pengajuan-reguler.reguler-label-save-2") }}
        </VBtn>
        <VBtn text variant="elevated" @click="props.onSave">
          {{ t("pengajuan-reguler.reguler-label-save-3") }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
