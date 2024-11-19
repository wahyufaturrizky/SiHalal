<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface TimelineItem {
  title: string
  date: string
  description: string
}

const props = defineProps<{
  timelineData?: TimelineItem[]
}>()

const timelineItems = computed(() => {
  return props.timelineData && props.timelineData.length
    ? props.timelineData
    : [
        { title: 'Register', date: '2024/10/05', description: 'Dummy User 1' },
        { title: 'Draft', date: '2024/09/10', description: 'Dummy User 2' },
    ]
})
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
        v-for="(item, index) in timelineItems"
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
          <span class="app-timeline-title">{{ item.title }}</span>
          <span class="app-timeline-meta">{{ item.date }}</span>
        </div>
        <div class="app-timeline-text mt-1">
          {{ item.description }}
        </div>
      </VTimelineItem>
    </VTimeline>
  </div>
</template>
