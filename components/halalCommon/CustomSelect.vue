<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, default: 'Pilih' },
  rules: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  disable: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watchEffect(()=> {
  internalValue.value = props.modelValue
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
    <VSelect
      :id="id"
      v-model="internalValue"
      :placeholder="placeholder"
      :rules="rules"
      :items="items"
      clearable
      :disabled="props.disable"
      :readonly="props.readonly"
    >
      <template #message="{ message }">
        <div>
          <i class="ri-error-warning-fill" /> {{ message }}
        </div>
      </template>
    </VSelect>
  </div>
</template>
