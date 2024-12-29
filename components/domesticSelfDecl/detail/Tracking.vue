<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

interface TimelineItem {
  title: string;
  user: string;
  date: string;
  color: string;
}

const timelineItems = ref<TimelineItem[]>([]);
timelineItems.value = props.data?.map((item: any) => {
  const { status, username, tanggal } = item || {};

  return {
    title: status,
    user: username,
    date: tanggal,
    color: "grey",
  };
});

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusItem = new Proxy(
  {
    OF1: { color: "primary", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF11: { color: "success", desc: "Verification" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
    OF71: { color: "success", desc: "Selesai P3H" },
  },
  {
    get(target: any, prop: string) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);
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
              <div class="text-subtitle-2 font-weight-bold">
                {{ statusItem[item.title].desc }}
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
