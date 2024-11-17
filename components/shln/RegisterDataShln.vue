<script setup>
const registrationData = {
  status: "Verification",
  registrationNo: "RC-2024-0001676",
};
</script>

<template>
  <VCard class="registration-data" max-width="400">
    <VCardTitle class="text-h6 pb-2"> Registration Data </VCardTitle>

    <VCardText>
      <VRow dense>
        <VCol cols="4">
          <div class="text-subtitle-2 font-weight-medium">Status</div>
        </VCol>
        <VCol cols="8">
          <div>{{ registrationData.status }}</div>
        </VCol>
      </VRow>

      <VRow dense>
        <VCol cols="4">
          <div class="text-subtitle-2 font-weight-medium">Registration No.</div>
        </VCol>
        <VCol cols="8">
          <div>{{ registrationData.registrationNo }}</div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
.registration-data {
  border-radius: 8px;
}

.v-card-text {
  padding-block-end: 8px;
}

.v-row {
  margin: 0;
}
</style>
