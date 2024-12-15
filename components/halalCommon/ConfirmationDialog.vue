<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps({
  parentBtnLabel: { type: String, required: true },
  parentBtnVariant: { type: String, required: false },
  parentBtnColor: { type: String, required: false, default: 'primary' },
  appendIcon: { type: String, required: false, default: '' },
  prependIcon: { type: String, required: false, default: '' },

  // cardItem: { type: Object, required: true },
  cardWidth: { type: Number, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  cancelLabel: { type: String, default: 'Cancel' },
  confirmLabel: { type: String, default: 'Confirm' },
  confirmColor: { type: String, default: 'primary' },
})

const emit = defineEmits(['confirm', 'cancel'])

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const confirm = () => {
  emit('confirm')
  closeDialog()
}

const cancel = () => {
  emit('cancel')
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? props.cardWidth : '90%'
})
</script>

<template>
  <div class="ma-1">
    <VBtn
      :variant="props.parentBtnVariant"
      :color="props.parentBtnColor"
      :append-icon="props.appendIcon"
      :prepend-icon="props.prependIcon"
      @click="openDialog"
    >
      {{ props.parentBtnLabel }}
    </VBtn>

    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>{{ props.title }}</span>
          <VBtn
            icon
            color="transparent"
            style="border: none;"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">
              ri-close-line
            </VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>{{ props.message }}</VCardText>
        <div class="d-flex justify-end ga-2">
          <VBtn
            variant="outlined"
            @click="cancel"
          >
            {{ props.cancelLabel }}
          </VBtn>
          <VBtn
            :color="props.confirmColor"
            @click="confirm"
          >
            {{ props.confirmLabel }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped></style>
