<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  melacak: {
    type: Array,
    required: true,
  },
})

console.log(props.melacak, 'ini props tracking di halal 2 timeline')

const melacak2 = ref([])

// Watch the `databahan` prop for changes and process it
watch(
  () => props.melacak,
  newDataTracking => {
    console.log(newDataTracking, 'Updated databahan')
    melacak2.value = Array.isArray(newDataTracking) ? [...newDataTracking] : []
    console.log(melacak2.value, 'Processed melacak')
  },
  { immediate: true },
)
</script>

<template>
  <VTimeline
    side="end"
    align="start"
    line-inset="9"
    truncate-line="start"
    density="compact"
    class="v-timeline--variant-outlined"
  >
    <VTimelineItem
      v-for="(item, index) in melacak2"
      :key="index"
      dot-color="rgb(var(--v-theme-surface))"
      size="x-small"
    >
      <template #icon>
        <VIcon
          icon="ri-circle-line"
          color="primary"
          size="16"
        />
      </template>
      <div class="d-flex justify-space-between align-center gap-2 flex-wrap mb-2">
        <span class="app-timeline-title">
          {{ item.status }}
        </span>
        <span class="app-timeline-meta">{{ formatDate(item.tanggal) }}</span>
      </div>
      <div class="app-timeline-text mt-1">
        {{ item.username }}
      </div>
      <div
        v-if="item.comment !== ''"
        class="app-timeline-text mt-1"
      >
        {{ item.comment }}
      </div>
    </VTimelineItem>
  </VTimeline>
</template>
