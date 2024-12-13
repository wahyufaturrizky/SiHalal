<script setup lang="ts">
interface TimelineItem {
  title: string;
  user: string;
  date: string;
  color: string;
  comment: string;
}

const isVisible = ref(false);
const props = defineProps({
  data: {
    type: Array<Object>,
    required: true,
  },
});

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

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
</script>
<template>
  <IconBtn @click="isVisible = true">
    <VIcon icon="fa-history" />
  </IconBtn>
  <VDialog v-model="isVisible">
    <VCard>
      <VCardTitle style="padding: 2.2svw">
        <VRow>
          <VCol cols="10"><h3>Tracking Details</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end"
            ><VIcon
              @click="isVisible = false"
              icon="fa-times"
              size="small"
            ></VIcon
          ></VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VTimeline
          side="end"
          align="start"
          line-inset="9"
          truncate-line="start"
          class="v-timeline--variant-outlined"
          density="comfortable"
          size="large"
        >
          <VTimelineItem
            v-for="(item, i) in timelineItems"
            :key="i"
            dot-color="rgb(var(--v-theme-surface))"
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
                {{ formatDate(item.date) }}</span
              >
            </div>
            <div class="app-timeline-text mt-1">
              {{ item.user }}
            </div>
            <div v-if="item.comment" class="app-timeline-text mt-1">
              {{
                item.comment.length > 38
                  ? item.comment.slice(0, 38) + "..."
                  : item.comment
              }}
            </div>
          </VTimelineItem>
        </VTimeline>
        <br />
        <br />
      </VCardItem>
    </VCard>
  </VDialog>
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
