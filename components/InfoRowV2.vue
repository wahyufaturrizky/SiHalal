<template>
  <VRow no-gutters class="my-2 text-body-1">
    <VCol cols="7" >
      {{ name }}
    </VCol>
    <VCol cols="1" class="text-right px-2">
      {{ separator }}
    </VCol>
    <VCol cols="4">
      <slot></slot>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  separator: {
    type: String,
    default: ':',
  },
});
</script>

<style scoped lang="scss">
</style>
