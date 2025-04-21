<script setup lang="ts">
import type { ShlnTracking } from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/index.vue";

const props = defineProps<{
  event: ShlnTracking[];
  showKeterangan?: boolean;
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
      class="w-100"
    >
      <template #icon>
        <VIcon icon="ri-circle-line" color="primary" size="16" />
      </template>
      <div
        class="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2"
      >
        <span class="app-timeline-title text-truncate">
          {{ item.status }}
        </span>
        <span class="app-timeline-meta">{{ formatDate(item.created_at) }}</span>
      </div>
      <div class="app-timeline-text mt-1 text-break">
        {{ item.username }}
      </div>
      <div v-if="item.comment !== ''" class="app-timeline-text mt-1 text-break">
        {{ item.comment }}
      </div>
      <div
        v-if="item.keterangan !== '' && props.showKeterangan === true"
        class="app-timeline-text mt-1 text-break"
      >
        {{ item.keterangan }}
      </div>
    </VTimelineItem>
  </VTimeline>
</template>

<style scoped>
/* Styling khusus untuk memastikan konten timeline tidak melebihi container */
:deep(.v-timeline-item__body) {
  max-width: 100%;
}
</style>
