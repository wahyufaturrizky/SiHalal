<script setup>
const trackingItems = ref([
  {
    id: 1,
    date: "14/10/2024",
    status: "Draft",
    email: "fachruddin@panganilestari.com",
    description: "",
  },
  {
    id: 2,
    date: "14/10/2024",
    status: "Submitted",
    email: "fachruddin@panganilestari.com",
    description: "",
  },
  {
    id: 3,
    date: "18/10/2024",
    status: "Verification",
    email: "ARIN-HS",
    description: "",
  },
  {
    id: 4,
    date: "19/10/2024",
    status: "Returned",
    email: "ARIN-HS",
    description:
      "Terima kasih atas pengajuannya. Pengajuan dikembalikan karena terdapat kekurangan/ketidaksesuaian data/dokumen, ada: 1. Mohon revisi untuk Scopi Slaughtering Service menjadi Food, karena Daging masuk dalam sampel Makanan pada KMA 746/2021 2. Mohon lengkapi nama Manufacturer sesuai yang tercantum di SHLN.",
  },
  {
    id: 5,
    date: "22/10/2024",
    status: "Submitted",
    email: "fachruddin@panganilestari.com",
    description:
      "1. Scope sudah menjadi food 2. company name dan manufacturer sudah diubah sesuai SHLN",
  },
  {
    id: 6,
    date: "23/10/2024",
    status: "Verification",
    email: "ARIN-HS",
    description: "",
  },
  {
    id: 7,
    date: "23/10/2024",
    status: "Returned",
    email: "ARIN-HS",
    description: "",
  },
]);

const getStatusColor = (status) => {
  const colors = {
    Draft: "grey",
    Submitted: "primary",
    Verification: "warning",
    Returned: "error",
  };

  return colors[status] || "grey";
};
</script>

<template>
  <VCard flat>
    <VCardTitle class="d-flex align-center">
      <VIcon start> mdi-timeline-clock </VIcon>
      Tracking
    </VCardTitle>
    <VCardText>
      <VTimeline side="end">
        <VTimelineItem
          v-for="item in trackingItems"
          :key="item.id"
          :dot-color="getStatusColor(item.status)"
          size="small"
          fill-dot
        >
          <template #opposite>
            <div class="text-caption">
              {{ item.date }}
            </div>
          </template>

          <div class="d-flex flex-column">
            <div class="text-subtitle-2 font-weight-medium">
              {{ item.status }}
            </div>
            <div class="text-body-2">
              {{ item.email }}
            </div>
            <div v-if="item.description" class="text-caption mt-1">
              {{ item.description }}
            </div>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>

<style scoped>
.v-timeline-item {
  margin-block-end: 8px;
}
</style>
