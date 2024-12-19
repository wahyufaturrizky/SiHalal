<script setup lang="ts">
const props = defineProps<{
  data: array
}>()
</script>

<template>
  <VCard class="pa-5">
    <VCardlTitle class="font-weight-bold text-h4"> Melacak </VCardlTitle>
    <VCardText class="px-0">
      <VTimeline side="end" align="start" hide-opposite>
        <VTimelineItem
          v-for="(item, index) in props?.data"
          :key="index"
          dot-color="#FFFFFF"
        >
          <VRow>
            <VCol cols="7">
              <div class="text-h6">{{ item.status }}</div>
              <div>{{ item.username }}</div>
            </VCol>
            <VCol cols="5" v-if="item.date">
              <div>{{ formatDateIntl(new Date(item.date)) }}</div>
            </VCol>
          </VRow>
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
