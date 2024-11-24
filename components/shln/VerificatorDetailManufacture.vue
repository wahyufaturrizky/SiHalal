<script setup lang="ts">
import { ref } from "vue";

const headers = [
  { title: "No", key: "no" },
  { title: "Manufacture Name", key: "manufacture_name" },
  { title: "Address", key: "address" },
  { title: "Country", key: "country" },
];

const items = ref([
  {
    no: "1",
    manufacture_name: "Allyn Group",
    address: "Jl. Mangga Besar Raya 211 Mangga Besar, Jakarta",
    country: "Thailand",
  },
]);
</script>

<template>
  <VRow>
    <VCol cols="8">
      <VCard class="pa-4">
        <VRow>
          <VCol cols="8">
            <p class="text-h3">Manufacture</p>
          </VCol>
          <VCol cols="4">
            <VRow no-gutters>
              <VCol cols="6">
                <VerificationManufactureReturnConfirmation />
              </VCol>
              <VCol cols="6">
                <VerificationManufactureSaveConfirmation />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VDataTable :headers="headers" :items="items" />
      </VCard>
    </VCol>

    <VCol cols="4">
      <VCard class="pa-4">
        <p class="text-h3">Tracking</p>
        <HalalTimeLine :events="timelineEvents" />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
