<script setup lang="ts">
import { ref } from "vue";

const headers = [
  { title: "No", key: "no" },
  { title: "Manufacture", key: "manufacture" },
  { title: "Product Name", key: "product_name" },
  { title: "HS Code", key: "hs_code" },
];

const items = ref([
  {
    no: "1",
    manufacture: "Allyn Group",
    product_name: "Product A",
    hs_code: "O2O1.3030|Boneless",
  },
]);
</script>

<template>
  <VRow>
    <VCol cols="8">
      <VCard class="pa-4">
        <VRow>
          <VCol cols="8">
            <p class="text-h3">Products</p>
          </VCol>
          <VCol cols="4">
            <VRow no-gutters>
              <VCol cols="6">
                <VerificationProductReturnConfirmation />
              </VCol>
              <VCol cols="6">
                <VerificationProductSaveConfirmation />
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
        <HalalTimeLine
          :timeline-data="[
            {
              title: 'Verification',
              date: '2024/11/01',
              description: 'John Doe',
            },
            { title: 'Submitted', date: '2024/11/10', description: 'Jane Doe' },
          ]"
        />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
