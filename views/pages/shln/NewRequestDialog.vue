<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update:dialogVisible'])

const localDialogVisible = ref(props.dialogVisible)

watch(() => props.dialogVisible, newVal => {
  localDialogVisible.value = newVal
})

watch(localDialogVisible, newVal => {
  emit('update:dialogVisible', newVal)
})

const closeDialog = () => {
  localDialogVisible.value = false
}

const kbliOptions = ref(['Option 1', 'Option 2', 'Option 3'])
const selectedKBLI = ref(kbliOptions.value[0])

const handleRegister = () => {
  props.submit(selectedKBLI.value)
  closeDialog()
}

import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 500 : '90%'
})

</script>

<template>
  <VDialog
    v-model="localDialogVisible"
    :max-width="dialogMaxWidth"
  >
    <VCard class="pa-2">
      <VCardTitle class="headline d-flex space-between align-center">
        <h4>
          Foreign Halal Certificate Registration
        </h4>
        <VSpacer />
        <VBtn
          icon
          class="no-bg"
          @click="localDialogVisible = false"
        >
          <VIcon
            icon="mdi-close"
            style="color: black;"/>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VCard
          class="my-2 pa-4 d-flex flex-column mx-auto mb-8"
          elevation="4"
          width="90%"
        >
          <h3 class="font-weight-bold text-center ">
            New
          </h3>
          <p class="text-center text-body-2 mt-2">Register your Foreign Halal Certificate to receive BPJPH Registration Number</p>
          <VBtn
            color="primary"
            class="mt-2 text-center"
            @click="handleRegister"
            width="100%"
          >
            Register
          </VBtn>
        </VCard>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.headline {
  font-size: 1.2rem;
}
.no-bg {
  background-color: transparent !important;
  color: inherit;
  box-shadow: none;
}
</style>
