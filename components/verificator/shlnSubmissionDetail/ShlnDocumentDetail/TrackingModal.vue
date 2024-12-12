<script setup lang="ts">
const isVisible = ref(false);
</script>
<template>
  <IconBtn @click="isVisible = true">
    <VIcon icon="fa-history" />
  </IconBtn>
  <VDialog v-model="isVisible">
    <template #default>
      <TrackingShln
        :use-title="true"
        title-text="Tracking Details"
        :data="[]"
      ></TrackingShln>
    </template>
  </VDialog>
</template>
