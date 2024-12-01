<script setup lang="ts">
const trackingData = ref([
  {
    title: "Draft PU",
    desc: "Ramen Gril Indonesia",
    date: "09/09/2024",
  },
  {
    title: "Submmited PU",
    desc: "Ramen Gril Indonesia",
    date: "09/09/2024",
  },
  {
    title: "Verifikasi",
    desc: "Oleh Yuan",
    date: "09/09/2024",
  },
  {
    title: "Dikirim ke LPH",
    desc: "Yuan (selesai verif)",
    date: "09/09/2024",
  },
  {
    title: "Penetapan Biaya",
    desc: "Global halal",
    date: "09/09/2024",
  },
]);
</script>

<template>
  <VCard class="pa-5">
    <VCardlTitle class="font-weight-bold text-h4"> Melacak </VCardlTitle>
    <VCardText class="px-0">
      <VTimeline side="end" align="start" hide-opposite>
        <VTimelineItem dot-color="#FFFFFF" v-for="item in trackingData">
          <VRow>
            <VCol cols="7">
              <div class="text-h6">{{ item.title }}</div>
              <div>{{ item.desc }}</div>
            </VCol>
            <VCol cols="5">
              <div>{{ item.date }}</div>
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
