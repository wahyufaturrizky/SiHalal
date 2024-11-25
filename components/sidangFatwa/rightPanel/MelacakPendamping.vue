<script setup lang="ts">
import type { ShlnTracking } from "@/pages/sertifikasi-halal/luar-negeri/submission/[id]/index.vue";

const data: Array<ShlnTracking> = [
  {
    id: "1",
    status: "Verification",
    created_at: "2024/11/01",
    username: "John Doe",
  },
  {
    id: "1",
    status: "Submitted",
    created_at: "2024/11/10",
    username: "Jane Doe",
  },
];
</script>
<template>
  <VCard>
    <VCardTitle><h3>Melacak</h3></VCardTitle>
    <VCardItem style="max-height: 40svh; overflow-y: auto">
      <HalalTimeLine :event="data"></HalalTimeLine>
    </VCardItem>
  </VCard>
</template>
