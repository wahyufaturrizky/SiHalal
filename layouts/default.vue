<script lang="ts" setup>
import { useConfigStore } from "@core/stores/config";
import { AppContentLayoutNav } from "@layouts/enums";
import { switchToVerticalNavOnLtOverlayNavBreakpoint } from "@layouts/utils";

const DefaultLayoutWithHorizontalNav = defineAsyncComponent(
  () => import("./components/DefaultLayoutWithHorizontalNav.vue")
);
const DefaultLayoutWithVerticalNav = defineAsyncComponent(
  () => import("./components/DefaultLayoutWithVerticalNav.vue")
);

const configStore = useConfigStore();

// ℹ️ This will switch to vertical nav when define breakpoint is reached when in horizontal nav layout
// Remove below composable usage if you are not using horizontal nav layout in your app
switchToVerticalNavOnLtOverlayNavBreakpoint();

const { layoutAttrs, injectSkinClasses } = useSkins();
const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();

injectSkinClasses();

const loadingStore = useMyLoadingStore();
</script>

<template>
  <div v-if="loadingStore.isLoading" class="main-loading-overlay">
    <div class="main-spinner"></div>
    <p>Loading...</p>
  </div>
  <Component
    v-bind="layoutAttrs"
    :is="
      configStore.appContentLayoutNav === AppContentLayoutNav.Vertical
        ? DefaultLayoutWithVerticalNav
        : DefaultLayoutWithHorizontalNav
    "
  >
    <VSnackbar
      v-model="isSnackbarVisible"
      location="top"
      :color="snackColor"
      :timeout="5000"
    >
      <v-icon left>fa-info-circle</v-icon> {{ snackMessage }}
    </VSnackbar>
    <slot />
  </Component>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
.main-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-size: 18px;
  z-index: 9999;
}

/* Simple Spinner Animation */
.main-spinner {
  width: 40px;
  height: 40px;
  border: 5px solid #fff;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: main_spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes main_spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
