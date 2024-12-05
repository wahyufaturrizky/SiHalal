<!-- eslint-disable regex/invalid -->
<script setup lang="ts">
const router = useRouter();
</script>
<template>
  <VBtn variant="text" prepend-icon="mdi-chevron-left" @click="router.back()">
    Kembali
  </VBtn>
</template>
