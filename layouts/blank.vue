<script lang="ts" setup>
const { injectSkinClasses } = useSkins();
const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();
// ℹ️ This will inject classes in body tag for accurate styling
injectSkinClasses();
</script>

<template>
  <div class="layout-wrapper layout-blank">
    <VSnackbar v-model="isSnackbarVisible" location="top" :color="snackColor">
      {{ snackMessage }}
    </VSnackbar>
    <slot />
  </div>
</template>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
