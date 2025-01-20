<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array,
    required: false,
  },
})
</script>

<template>
  <InfoRow
    v-for="(item, index) in props.data"
    :key="index"
    cols-name="6"
    cols-separator="1"
    cols-value="5"
    :name="item.label"
  >
    {{ item.value }}
  </InfoRow>
</template>
