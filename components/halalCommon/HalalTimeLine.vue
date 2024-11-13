<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import pdf from '@images/icons/project-icons/pdf.png'
</script>

<template>
  <VCard >
    <VCardText>
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
    </VCardText>
  </VCard>
</template>
