<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  melacak: {
    type: Array,
    required: true,
  },
});

const defaultStatus = { color: "error", desc: "Unknown Status" };
const melacak2 = ref([]);

const statusMap = {
  OF1: { color: "primary", desc: "Draf" },
  OF10: { color: "success", desc: "Pengajuan" },
  OF15: { color: "success", desc: "Terverifikasi" },
  OF50: { color: "success", desc: "Dikirim ke LPH" },
  OF55: { color: "success", desc: "Penetapan Biaya" },
  OF56: { color: "success", desc: "Pembayaran" },
  OF60: { color: "success", desc: "Proses di LPH" },
  OF70: { color: "success", desc: "Dikirim" },
  OF71: { color: "success", desc: "Selesai P3H" },
  OF72: { color: "success", desc: "Verifikasi LP3H" },
  OF74: { color: "success", desc: "Dikirim Ke Komite Fatwa" },
  OF75: { color: "success", desc: "Dikirim ke Komisi Fatwa" },
  OF80: { color: "success", desc: "Diterima Komisi Fatwa" },
  OF280: { color: "error", desc: "Dikembalikan Ke PU" },
  OF285: { color: "error", desc: "Dikembalikan Oleh Fatwa" },
  OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
  OF120: { color: "success", desc: "Penerbitan Sertifikat" },
  OF300: { color: "success", desc: "Sertifikat Halal Terbit" },
};

const getStatusDesc = (status: string) =>
  statusMap[status]?.desc || "Unknown Status";

// Example usage in `watch`:
watch(
  () => props.melacak,
  (newDataTracking) => {
    melacak2.value = Array.isArray(newDataTracking)
      ? newDataTracking.map((item) => ({
          ...item,
          status: getStatusDesc(item.status),
        }))
      : [];
  },
  { immediate: true }
);
</script>

<template>
  <VTimeline
    side="end"
    align="start"
    line-inset="9"
    truncate-line="start"
    density="compact"
    class="v-timeline--variant-outlined"
  >
    <VTimelineItem
      v-for="(item, index) in melacak2"
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
          {{ item.status }}
        </span>
        <span class="app-timeline-meta">{{ formatDate(item.tanggal) }}</span>
      </div>
      <div class="app-timeline-text mt-1">
        {{ item.username }}
      </div>
      <div v-if="item.comment !== ''" class="app-timeline-text mt-1">
        {{ item.comment }}
      </div>
    </VTimelineItem>
  </VTimeline>
</template>
