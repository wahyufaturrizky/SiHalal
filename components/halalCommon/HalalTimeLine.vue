<script setup lang="ts">
import type { ShlnTracking } from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/index.vue";

const props = defineProps<{
  event: ShlnTracking[];
}>();
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
        <span class="app-timeline-meta">{{ formatDate(item.created_at) }}</span>
      </div>
      <div class="app-timeline-text mt-1">
        {{ item.username }}
      </div>
      <div v-if="item.comment !== ''" class="app-timeline-text mt-1">
        {{ item.comment }}
      </div>
    </VTimelineItem>
  </VTimeline>
</template>
