<script setup lang="ts">
const props = defineProps({
  parentBtnLabel: String,
  cardItem: Object,
  cardWidth: Number,
})
</script>

<template>
  <div>
    <VBtn variant="outlined">
      {{ props.parentBtnLabel }}
      <VDialog
        activator="parent"
        :max-width="props.cardWidth"
      >
        <slot name="content" />
      </VDialog>
    </VBtn>
  </div>
</template>
