<!-- eslint-disable regex/invalid -->
<script setup lang="ts">
const router = useRouter();
const { setVisible } = useSnackbar();
const back = () => {
  setVisible(false);
  router.back();
};
</script>
<template>
  <VBtn variant="text" prepend-icon="mdi-chevron-left" @click="back">
    Kembali
  </VBtn>
</template>
