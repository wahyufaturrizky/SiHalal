<script setup lang="ts">
import type { ShlnTracking } from "@/pages/sertifikasi-halal/shln-detail/[id].vue";

const props = defineProps<{
  event: ShlnTracking[];
}>();
console.log(props.event);
</script>

<template>
  <div class="pa-2">
    <VTimeline
      side="end"
      align="start"
      line-inset="9"
      truncate-line="start"
      density="compact"
      class="v-timeline--variant-outlined"
    >
      <VTimelineItem
        v-for="item in event"
        dot-color="rgb(var(--v-theme-surface))"
        size="x-small"
      >
        <template #icon>
          <VIcon icon="ri-circle-line" color="primary" size="16" />
        </template>
        <div
          class="d-flex justify-space-between align-center gap-2 flex-wrap mb-2"
        >
          <span class="app-timeline-title">
            {{ item.status }}
          </span>
          <span class="app-timeline-meta">{{ item.created_at }}</span>
        </div>

        <div class="app-timeline-text mt-1">
          {{ item.username }}
        </div>
      </VTimelineItem>
    </VTimeline>
  </div>
</template>
