<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

interface TimelineItem {
  title: string;
  user: string;
  date: string;
  color: string;
  comment: string;
}

const timelineItems = ref<TimelineItem[]>([]);

timelineItems.value = props.data?.map((item: any) => {
  const { status, username, created_at, comment } = item || {};

  return {
    title: status,
    user: username,
    date: created_at,
    color: "grey",
    comment,
  };
});
</script>

<template>
  <VContainer
    :style="
      timelineItems?.length > 5 ? 'max-height: 600px; overflow-y: auto' : ''
    "
    class="pa-0"
  >
    <VCard variant="flat" class="pa-4">
      <VTimeline
        side="end"
        align="start"
        line-inset="9"
        truncate-line="start"
        density="compact"
        class="v-timeline--variant-outlined"
      >
        <VTimelineItem
          v-for="(item, i) in timelineItems"
          :key="i"
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
              {{ item.title }}
            </span>
            <span class="app-timeline-meta">
              {{ formatDateId(item.date) }}</span
            >
          </div>
          <div class="app-timeline-text mt-1">
            {{ item.user }}
          </div>
          <div v-if="item.comment" class="app-timeline-text mt-1">
            {{ item.comment }}
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCard>
  </VContainer>
</template>

<style scoped>
.v-card {
  border: none !important;
  box-shadow: none !important;
}

.v-timeline {
  padding-inline-start: 0;
}

:deep(.v-timeline-item__body) {
  padding-block: 12px;
  padding-inline: 0;
}

:deep(.v-timeline-item__dot) {
  margin-inline-end: 16px;
}
</style>
