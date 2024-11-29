<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

interface TimelineItem {
  title: string
  user: string
  date: string
  color: string
}

const timelineItems = ref<TimelineItem[]>([
  {
    title: 'Draft PU',
    user: 'Ramen Grill Indonesia',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Submitted PU',
    user: 'Ramen Grill Indonesia',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Verifikasi',
    user: 'Oleh Yuan',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Dikeluarkan ke PU',
    user: '1. Mohon identifikasi produk\n2. Mohon lampirkan salinan KTP',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Submitted PU',
    user: 'Ramen Grill Indonesia',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Submitted PU',
    user: 'Ramen Grill Indonesia',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Verifikasi',
    user: 'Oleh Yuan',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Dikirim ke LPH',
    user: 'Yuni (selesai verif)',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Penetapan Biaya',
    user: 'Global halal',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Pembayaran',
    user: 'Lubna',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Proses di LPH',
    user: 'Global halal',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Selesai Proses di LPH',
    user: 'Global halal',
    date: '09/09/2024',
    color: 'grey',
  },
  {
    title: 'Selesai Proses di LPH',
    user: 'Global halal',
    date: '09/09/2024',
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

const expanded = ref(0)
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Melacak</h3>
      </VExpansionPanelTitle>
      <br>
      <VExpansionPanelText>
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
