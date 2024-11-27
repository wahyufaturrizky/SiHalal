<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { status, kode_fasilitasi } = props.data || {};

const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    Verification: "success",
    Pending: "warning",
    Rejected: "error",
  };

  return statusColors[status] || "grey";
};
</script>

<template>
  <VCardText class="pa-0">
    <VRow no-gutters align="center" justify="space-between" class="mb-2">
      <VCol cols="auto">
        <span class="text-grey-darken-1">Status</span>
      </VCol>
      <VCol cols="auto">
        <VChip
          :color="getStatusColor(status)"
          text-color="white"
          size="small"
          class="px-2"
        >
          {{ status }}
        </VChip>
      </VCol>
    </VRow>

    <VDivider class="my-3" />

    <VRow no-gutters align="center" justify="space-between">
      <VCol cols="auto">
        <span class="text-grey-darken-1">Halal Registration Number</span>
      </VCol>
      <VCol cols="auto">
        <span>{{ kode_fasilitasi }}</span>
      </VCol>
    </VRow>
  </VCardText>
</template>

<style scoped>
.v-card {
  border: none !important;
  box-shadow: none !important;
}

.v-chip {
  font-weight: normal;
}
</style>
