<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update:dialogVisible'])

const localDialogVisible = ref(props.dialogVisible)
const answers = ref(Array(props.questions.length).fill(null))

watch(() => props.dialogVisible, newVal => {
  localDialogVisible.value = newVal
})

watch(localDialogVisible, newVal => {
  emit('update:dialogVisible', newVal)
})

const closeDialog = () => {
  localDialogVisible.value = false
}

const handleSubmit = () => {
  props.submit(answers.value)
  closeDialog()
}
</script>

<template>
  <VDialog
    v-model="localDialogVisible"
    max-width="50%"
  >
    <VCard class="pa-8">
      <VCardTitle>
        <span class="text-h5">Kuisioner Self Declare</span>
      </VCardTitle>
      <VCardText>
        <VForm>
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="pa-2"
          >
            <VRadioGroup
              v-model="answers[index]"
              :label="question"
              inline
            >
              <VRadio
                label="Yes"
                value="yes"
              />
              <VRadio
                label="No"
                value="no"
              />
            </VRadioGroup>
          </div>
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn @click="closeDialog">
          Batal
        </VBtn>
        <VBtn
          color="primary"
          @click="handleSubmit"
        >
          Simpan
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
</style>
