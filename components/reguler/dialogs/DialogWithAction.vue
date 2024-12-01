<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Default Title',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  toggle: {
    type: Function,
    default: () => { },
    required: false,
  },
  onSave: {
    type: Function,
    default: () => { },
    required: false,
  },
  labelSaveBtn: {
    type: String,
    default: 'Tambah',
  },
  labelBackBtn: {
    type: String,
    default: 'Batal',
  },
})

const emit = defineEmits(['update:isOpen'])

const dialogOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})
</script>

<template>
  <VDialog
    v-model="dialogOpen"
    max-width="60svw"
  >
    <VCard>
      <VCardTitle class="text-h5 font-weight-bold">
        {{ title }}
      </VCardTitle>
      <VCardText>
        <slot name="content" />
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          variant="outlined"
          @click="props.toggle"
        >
          {{ props.labelBackBtn }}
        </VBtn>
        <VBtn
          text
          variant="elevated"
          @click="props.onSave"
        >
          {{ props.labelSaveBtn }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
