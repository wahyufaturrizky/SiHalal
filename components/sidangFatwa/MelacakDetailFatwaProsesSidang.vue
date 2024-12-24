<script setup lang="ts">
const props = defineProps({
  trackingdata: {
    type: Array,
  },
});

const { trackingdata } = props || {};

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

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
            v-for="({ status, tanggal, username, comment }, i) in trackingdata"
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
                {{ status }}
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
