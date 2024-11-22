<script setup lang="ts">
interface TimelineItem {
  title: string
  user: string
  date: string
  color: string
}

const timelineItems = ref<TimelineItem[]>([
  {
    title: 'Submitted',
    user: 'Samsul',
    date: '2024-09-09',
    color: 'success',
  },
  {
    title: 'Draft',
    user: 'Samsul',
    date: '2024-09-09',
    color: 'grey',
  },
])

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>

<template>
  <VContainer class="pa-0">
    <VCard
      variant="flat"
      class="pa-4"
    >
      <VTimeline
        density="compact"
        align="start"
      >
        <VTimelineItem
          v-for="(item, i) in timelineItems"
          :key="i"
          :dot-color="item.color"
          size="small"
        >
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-subtitle-2 font-weight-normal">
                {{ item.title }}
              </div>
              <div class="text-caption text-grey">
                {{ item.user }}
              </div>
            </div>
            <div class="text-caption text-grey">
              {{ formatDate(item.date) }}
            </div>
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
