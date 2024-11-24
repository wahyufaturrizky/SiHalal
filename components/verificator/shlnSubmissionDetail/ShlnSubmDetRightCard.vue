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
  const { status, username, id } = item || {};

  return {
    id,
    key: status,
    value: username,
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
          <VTimeline side="end">
            <VTimelineItem
              v-for="item in tracking"
              :key="item.id"
              dot-color="blue"
            >
              <div>
                <div class="text-h6">
                  {{ item.key }}
                </div>
                <p>{{ item.value }}</p>
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
