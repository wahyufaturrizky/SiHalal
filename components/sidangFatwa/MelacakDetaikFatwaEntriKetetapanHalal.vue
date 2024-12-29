<script setup lang="ts">
const props = defineProps({
  trackingdata: {
    type: Array,
  },
});

const { trackingdata } = props || {};

const expanded = ref(0);
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Melacak</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VTimeline
          side="end"
          align="start"
          line-inset="9"
          truncate-line="start"
          density="compact"
          class="v-timeline--variant-outlined"
        >
          <VTimelineItem
            v-for="({ tanggal, username, comment }, i) in trackingdata"
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
                {{ comment }}
              </span>
              <span class="app-timeline-meta">{{ formatDate(tanggal) }}</span>
            </div>
            <div class="app-timeline-text mt-1">
              {{ username }}
            </div>
            <div v-if="comment" class="app-timeline-text mt-1">
              {{
                (comment as any).length > 38
                  ? (comment as any).slice(0, 38) + "..."
                  : (comment as any)
              }}
            </div>
          </VTimelineItem>
        </VTimeline>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
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
