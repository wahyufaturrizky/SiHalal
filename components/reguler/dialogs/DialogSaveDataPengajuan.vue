<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { ref } from 'vue'

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
      <VCardTitle class="font-weight-bold">
        {{ title }}
      </VCardTitle>
      <VCardText>
        <p>Apakah yakin ingi menyimpan perubahan data ini?</p>
      </VCardText>
      <VCardActions>
        <VBtn
          color="primary"
          variant="outlined"
          @click="props.toggle"
        >
          Batal
        </VBtn>
        <VBtn
          text
          variant="elevated"
          @click="props.onSave"
        >
          Ya, Simpan
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
