<script lang="ts" setup>
const { injectSkinClasses } = useSkins();
const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();
// ℹ️ This will inject classes in body tag for accurate styling
injectSkinClasses();
</script>

<template>
  <div class="layout-wrapper layout-blank bg-white">
    <VSnackbar
      v-model="isSnackbarVisible"
      location="top"
      :color="snackColor"
      :timeout="5000"
    >
      <v-icon left>fa-info-circle</v-icon> {{ snackMessage }}
    </VSnackbar>
    <slot />
  </div>
</template>

<style>
/* .layout-wrapper.layout-blank {
  flex-direction: column;
} */
</style>
