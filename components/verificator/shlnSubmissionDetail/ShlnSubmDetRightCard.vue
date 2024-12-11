<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  datadetailregistration: {
    type: Object,
    required: true,
  },
});

const { status, registration_number, issued_date } =
  props.datadetailregistration || {};

const tracking = props.data?.map((item: any) => {
  const { status, username, id, created_at, comment } = item || {};

  return {
    id,
    key: status,
    value: username,
    created_at,
    comment,
  };
});

const registData = [
  { id: 1, key: "Status", value: status },
  { id: 2, key: "Registration No.", value: registration_number },
  { id: 3, key: "Date", value: issued_date },
];
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>Registration Data</VCardTitle>
        <VCardText>
          <VRow v-for="item in registData" :key="item.id" no-gutters>
            <VCol cols="4">
              {{ item.key }}
            </VCol>
            <VCol cols="1"> : </VCol>
            <VCol cols="7">
              <p>{{ item.value }}</p>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>Tracking</VCardTitle>
        <VCardText>
          <VTimeline
            side="end"
            align="start"
            line-inset="9"
            truncate-line="start"
            density="compact"
            class="v-timeline--variant-outlined"
          >
            <VTimelineItem
              v-for="item in tracking"
              :key="item.id"
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
                  {{ item.key }}
                </span>
                <span class="app-timeline-meta">
                  {{ formatDate(item.created_at) }}</span
                >
              </div>
              <div class="app-timeline-text mt-1">
                {{ item.value }}
              </div>
              <div v-if="item.comment" class="app-timeline-text mt-1">
                {{
                  item.comment.length > 38
                    ? item.comment.slice(0, 38) + "..."
                    : item.comment
                }}
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
