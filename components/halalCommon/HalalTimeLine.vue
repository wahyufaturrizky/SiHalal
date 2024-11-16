<script setup lang="ts">
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
              Register
            </span>
          <span class="app-timeline-meta">2024/10/05</span>
        </div>

        <div class="app-timeline-text mt-1">
          SAMSUL
        </div>

      </VTimelineItem>
      <VTimelineItem
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
              Draft
            </span>
          <span class="app-timeline-meta">2024/09/10</span>
        </div>

        <!-- 👉 Content -->
        <div class="app-timeline-text mt-1">
          SAMSUL
        </div>

      </VTimelineItem>
    </VTimeline>
  </div>
</template>
