<script setup lang="ts">
const props = defineProps<{
  data: array;
}>();
</script>

<template>
  <VCard class="pa-5">
    <VCardlTitle class="font-weight-bold text-h4"> Melacak </VCardlTitle>
    <VCardText class="px-0">
      <VTimeline
        side="end"
        align="start"
        line-inset="9"
        truncate-line="start"
        density="compact"
        class="v-timeline--variant-outlined"
      >
        <VTimelineItem
          v-for="(item, index) in props?.data"
          :key="index"
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
              {{
                (item.comment as any).length > 38
                  ? (item.comment as any).slice(0, 38) + "..."
                  : (item.comment as any)
              }}
            </span>
            <span class="app-timeline-meta">{{
              formatDate((item as any).date)
            }}</span>
          </div>
          <div class="app-timeline-text mt-1">
            {{ (item as any).username }}
          </div>
          <div
            v-if="(item.status === 'OF280' || item.status === 'OF290' || item.status === 'OF900' || item.status === 'OF285') && item.keterangan"
            class="app-timeline-text mt-1"
          >
            {{
              (item.keterangan as any).length > 38
                ? (item.keterangan as any).slice(0, 38) + "..."
                : (item.keterangan as any)
            }}
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
:deep(.v-timeline.v-timeline--vertical) {
  .v-timeline-divider__dot .v-timeline-divider__inner-dot {
    box-shadow: 0 0 0 2px #652672;
  }
  // .v-timeline-item:first-child .v-timeline-divider {
  //   padding-block-start: 0px;
  // }
}
</style>
