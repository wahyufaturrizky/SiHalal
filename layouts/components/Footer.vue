<script setup>
const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <div
    class="h-100 d-flex align-center justify-space-between text-medium-emphasis"
  >
    <!-- 👉 Footer: left content -->
    <div class="d-flex align-center text-base">&copy BPJPH {{ currentYear }}</div>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none"> </span>
  </div>
</template>
