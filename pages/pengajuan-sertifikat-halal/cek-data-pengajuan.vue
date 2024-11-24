<script setup lang="ts">
import { ref } from 'vue';

interface TimelineItem {
  title: string;
  user: string;
  date: string;
  color: string;
}

const tabs = ref([
  { text: 'Pelaku Usaha', value: 'pelaku_usaha' },
  { text: 'Pengajuan', value: 'pengajuan' },
  { text: 'Melacak', value: 'melacak' },
]);

const tab = ref('pelaku_usaha'); // Default selected tab

const timelineItems = ref<TimelineItem[]>([
  {
    title: 'Submitted',
    user: 'Samsul',
    date: '2024-09-09',
    color: 'deep-orange-lighten-4',
  },
  {
    title: 'Draft',
    user: 'Samsul',
    date: '2024-09-09',
    color: 'purple-lighten-2',
  },
]);

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const showTimeline = ref(false);
</script>

<template>
  <VContainer class="pa-0">
    <!-- Title and Buttons Row -->
    <VRow>
      <VCol>
        <p class="text-h4">Detail Pengajuan</p>
      </VCol>
      <VCol class="d-flex justify-end align-center" cols="4" md="5">
        <v-btn variant="outlined" class="mx-2">Lihat Laporan</v-btn>
        <v-btn color="#49A84C" class="mx-2">Tandai OK</v-btn>
        <v-btn variant="outlined" color="error" class="mx-2">
          Batalkan Status Hijau
        </v-btn>
        <v-btn variant="outlined" class="mx-2">Pengembalian</v-btn>
        <v-btn color="#E1442E" class="mx-2">Dibatalkan</v-btn>
      </VCol>
    </VRow>

    <!-- Tabs -->
    <VRow>
      <VCol>
        <v-tabs v-model="tab" align-tabs="start" height="60">
          <v-tab v-for="item in tabs" :key="item.value" :value="item.value">
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </VCol>
    </VRow>

    <!-- Tab Content -->
    <VRow v-if="tab === 'melacak'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <div class="d-flex justify-space-between align-center" @click="showTimeline = !showTimeline">
            <p class="text-h4">Pengajuan Sertifikasi Halal</p>
            <VIcon :icon="showTimeline ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </div>
          <VExpandTransition>
            <div v-if="showTimeline">
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
                      <div class="text-subtitle-2 font-weight-bold">
                        {{ item.title }}
                      </div>
                      <div class="text-caption text-grey">{{ item.user }}</div>
                    </div>
                    <div class="text-caption text-grey">
                      {{ formatDate(item.date) }}
                    </div>
                  </div>
                </VTimelineItem>
              </VTimeline>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VRow>
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
