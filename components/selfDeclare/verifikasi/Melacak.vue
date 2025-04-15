<script setup lang="ts">
const props = defineProps<{ data: any[] }>();

interface TimelineItem {
  comment: string;
  username: string;
  date: string;
  status: string;
}

const timelineItems = ref<TimelineItem[]>(props.data);

watchEffect(() => {
  timelineItems.value = props.data;
});

// const dummyData = [
// { status: "Draft PU", username: "Ramen Grill Indonesia", created_at: "2024-11-01" },
// { status: "Submitted PU", username: "Ramen Grill Indonesia", created_at: "2024-11-02" },
// { status: "Verifikasi", username: "Yuan", created_at: "2024-11-03" },
// ];
</script>

<template>
  <VContainer class="pa-0">
    <VCard variant="flat" class="pa-4">
      <VTimeline align="start" density="compact" truncate-line="both">
        <VTimelineItem
          v-for="(item, i) in timelineItems"
          :key="i"
          dot-color="#FFFFFF"
        >
          <template #icon>
            <VIcon icon="ri-circle-line" color="primary" size="35" />
          </template>
          <div class="d-flex justify-space-between align-start">
            <div>
              <div class="d-flex justify-space-between align-center gap-2">
                <span class="text-subtitle-2 font-weight-bold">
                  {{ item.status }}
                </span>
                <span class="text-caption text-grey">
                  {{ formatDateId(item.date) }}
                </span>
              </div>
              <div class="text-caption text-grey">
                {{ item.username }}
              </div>
              <div class="text-caption text-grey">
                {{ item.comment }}
              </div>
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
