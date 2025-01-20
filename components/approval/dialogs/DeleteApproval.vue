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
      <Vbtn
        variant="plain"
        class="cursor-pointer"
        v-bind="props"
      >
        <VRow>
          <VCol sm="3">
            <VIcon
              end
              icon="mdi-delete"
              color="error"
            />
          </VCol>
          <VCol>
            <label class="cursor-pointer text-error">Hapus</label>
          </VCol>
        </VRow>
      </Vbtn>
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
          @click="() => {
            dialog = false
            props.onDelete()
          }"
        >
          {{ props.buttonText }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
