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
  datadetailregistration: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <VRow>
    <VCol cols="8">
      <ShlnSubmDetLeftCard :data="props?.data" />
    </VCol>
    <VCol cols="4">
      <ShlnSubmDetRightCard
        :data="props.datatracking"
        :datadetailregistration="props.datadetailregistration"
      />
    </VCol>
  </VRow>
</template>
