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

const { status_code, registration_number, issued_date } =
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
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const registData = [
  { id: 1, key: "Status", value: status_code },
  { id: 2, key: "Registration No.", value: registration_number },
  { id: 3, key: "Date", value: issued_date ? formatDate(issued_date) : "" },
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
              <template v-if="item.key === 'Status'">
                <VChip label :color="statusItem[item.value].color">
                  {{ statusItem[item.value].desc }}
                </VChip>
              </template>
              <p v-else>
                {{ item.value }}
              </p>
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
          <VContainer
            :style="
              tracking?.length > 5 ? 'max-height: 600px; overflow-y: auto' : ''
            "
          >
            <VTimeline
              :style="
                tracking?.length > 5
                  ? 'max-height: 500px; overflow-y: auto'
                  : ''
              "
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
                      ? `${item.comment.slice(0, 38)}...`
                      : item.comment
                  }}
                </div>
              </VTimelineItem>
            </VTimeline>
          </VContainer>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
