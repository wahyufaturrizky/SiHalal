<script setup lang="ts">
const props = defineProps({
  trackingdata: {
    type: Array,
  },
})

const { trackingdata } = props || {}

const expanded = ref(0)

const defaultStatus = { color: 'error', desc: 'Unknown Status' }

const statusItem = new Proxy(
  {
    OF1: { color: 'primary', desc: 'Draft' },
    OF10: { color: 'success', desc: 'Submitted' },
    OF11: { color: 'success', desc: 'Verification' },
    OF15: { color: 'success', desc: 'Verified' },
    OF2: { color: 'error', desc: 'Returned' },
    OF290: { color: 'error', desc: 'Rejected' },
    OF5: { color: 'success', desc: 'Invoice issued' },
    OF300: { color: 'success', desc: 'Halal Certified Issued' },
    OF320: { color: 'success', desc: 'Code Issued' },
    OF50: { color: 'success', desc: 'Dikirim ke LPH' },
    OF55: { color: 'success', desc: 'Penetapan Biaya' },
    OF60: { color: 'success', desc: 'Proses di LPH' },
    OF70: { color: 'success', desc: 'Selesai Proses di LPH' },
    OF285: { color: 'success', desc: 'Dikembalikan Oleh Fatwa' },
    OF74: { color: 'success', desc: 'Sent to Komite Fatwa' },
    OF75: { color: 'success', desc: 'Dikirim ke Komisi Fatwa' },
    OF280: { color: 'success', desc: 'Dikembalikan Ke PU' },
    OF100: { color: 'success', desc: 'Selesai Sidang Fatwa' },
    OF120: { color: 'success', desc: 'Certificate Issued' },
    OF900: { color: 'error', desc: 'Dibatalkan' },
    OF71: { color: 'success', desc: 'Selesai P3H' },
    OF56: { color: 'success', desc: 'Pembayaran' },
    OF72: { color: 'success', desc: 'Verifikasi LP3H' },
  },
  {
    get(target: any, prop: string) {
      return prop in target ? target[prop] : defaultStatus
    },
  },
)
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
              <VIcon
                icon="ri-circle-line"
                color="primary"
                size="16"
              />
            </template>

            <span class="app-timeline-title mb-3">
              {{ statusItem[status].desc }}
            </span>
            <div class="d-flex justify-space-between align-center gap-2 flex-wrap mb-1">
              <span class="app-timeline-text">
                {{ comment || "NA" }}
              </span>
              <span class="app-timeline-meta">{{ formatDate(tanggal) }}</span>
            </div>
            <div class="app-timeline-text">
              {{ username }}
            </div>
            <div
              v-if="comment"
              class="app-timeline-text mt-1"
            >
              {{
                (comment as any).length > 38
                  ? `${(comment as any).slice(0, 38)}...`
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
