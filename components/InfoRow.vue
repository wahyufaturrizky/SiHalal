<template>
  <VRow no-gutters class="my-2 text-body-1">
    <VCol :cols="colsName" :style="nameStyle">
      {{ name }}
    </VCol>
    <VCol :cols="colsSeparator" class="text-right px-2">
      {{ separator }}
    </VCol>
    <VCol :cols="colsValue">
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
  colsName: {
    type: String,
    default: '4'
  },
  colsSeparator: {
    type: String,
    default: '1'
  },
  colsValue: {
    type: String,
    default: '7'
  },
  nameStyle: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style scoped lang="scss">
</style>
