<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// Define props with modelValue for v-model binding
const props = defineProps<{ modelValue: any }>();

// Emit function to emit changes to parent component
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

// Provide the selectedValue and update function to child components
provide(
  "selectedValue",
  computed(() => props.modelValue)
);
provide("updateSelectedValue", (value: any) => {
  emit("update:modelValue", value);
});

// Watch for changes in modelValue prop and update the provided value
watch(
  () => props.modelValue,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);
</script>

<style></style>
