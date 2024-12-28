<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  tracking: {
    type: Array,
    required: true,
  },
})

console.log(props.tracking, 'ini props tracking22')

const tracking2 = ref<Array<any>>([])

// Watch the `databahan` prop for changes and process it
watch(
  () => props.tracking,
  newDataTracking => {
    console.log(newDataTracking, 'Updated tracking 1')

    if (newDataTracking && Array.isArray(newDataTracking))
      tracking2.value = newDataTracking

    console.log(tracking2.value, 'Processed tracking 2')
    console.log('tracking2 length:', tracking2.value.length)
  },
  { immediate: true },
)
</script>

<template>
  <VCard>
    <VCardTitle><h3>Melacak</h3></VCardTitle>
    <VCardItem style="max-block-size: 40svh; overflow-y: auto;">
      <div v-if="tracking2.value && tracking2.value.length === 0">
        No tracking data available.
      </div>
      <PegajuanTimeLine
        v-else
        :melacak="tracking2"
      />
    </VCardItem>
  </VCard>
</template>
