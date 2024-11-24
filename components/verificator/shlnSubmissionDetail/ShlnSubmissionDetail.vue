<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  datatracking: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <VRow>
    <VCol cols="8" style="max-height: 60svh; overflow-y: auto">
      <ShlnSubmDetLeftCard :data="props?.data" />
    </VCol>
    <VCol cols="4" style="max-height: 60svh; overflow-y: auto">
      <ShlnSubmDetRightCard :data="props.datatracking" />
    </VCol>
  </VRow>
</template>
