<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, default: '' },
  rules: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(internalValue, newValue => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div>
    <VLabel
      :for="id"
      class="font-weight-bold"
    >
      {{ label }}
    </VLabel>
    <VTextField
      :id="id"
      v-model="internalValue"
      :placeholder="placeholder"
      :rules="rules"
    >
      <template #message="{ message }">
        <div>
          <i class="ri-error-warning-fill" /> {{ message }}
        </div>
      </template>
    </VTextField>
  </div>
</template>
