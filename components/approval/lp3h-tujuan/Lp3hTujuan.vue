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
    <div class="d-flex ga-4">
      <VIcon
        v-if="index === props.data.length - 1"
        icon="fa-download"
        color="primary"
      />
      {{ item.value }}
    </div>
  </InfoRow>
</template>
