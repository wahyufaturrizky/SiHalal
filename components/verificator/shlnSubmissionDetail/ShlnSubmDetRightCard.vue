<script setup lang="ts">
const registData = [
  { id: 1, key: "Status", value: "Verification" },
  { id: 2, key: "Registration No.", value: "RC-2024-0001676" },
  { id: 3, key: "Date", value: "14/10/2024" },
];

const tracking = [
  { id: 1, key: "Draft", value: "fachrudin@panganlestari.com" },
  { id: 2, key: "Submitted", value: "fachrudin@panganlestari.com" },
  { id: 3, key: "Verification", value: "Arini HS" },
  { id: 4, key: "Returned", value: "ARINI HS" },
  { id: 5, key: "Submitted", value: "fachrudin@panganlestari.com" },
];
</script>
<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>Registration Data</VCardTitle>
        <VCardText>
          <VRow no-gutters v-for="item in registData" :key="item.id">
            <VCol cols="4">{{ item.key }}</VCol>
            <VCol cols="1">:</VCol>
            <VCol cols="7"
              ><p>{{ item.value }}</p></VCol
            >
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
              dot-color="blue"
              v-for="item in tracking"
              :key="item.id"
            >
              <div>
                <div class="text-h6">{{ item.key }}</div>
                <p>{{ item.value }}</p>
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
