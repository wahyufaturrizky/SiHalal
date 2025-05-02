<script setup lang="ts">
import ScrollToTop from "@core/components/ScrollToTop.vue";
import initCore from "@core/initCore";
import { initConfigStore, useConfigStore } from "@core/stores/config";
import { hexToRgb } from "@core/utils/colorConverter";
import { useTheme } from "vuetify";
import { useCheckVersion } from "./composables/checkVersion";

const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
initCore();
initConfigStore();

const configStore = useConfigStore();
const { isMobile } = useDevice();
const snackbar = useSnackbar();
if (isMobile) configStore.appContentLayoutNav = "vertical";
onMounted(() => {
  useCheckVersion();
});
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp
      :style="`--v-global-theme-primary: ${hexToRgb(
        global.current.value.colors.primary
      )}`"
    >
      <!-- <VSnackbar
        v-model="snackbar.isSnackbarVisible.value"
        location="top"
        :color="snackbar.color.value"
      >
        {{ snackbar.message }}
      </VSnackbar> -->
      <NuxtLayout>
        <NuxtPage />
         <!-- Google Tag Manager (noscript) -->
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NLP5B23R"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            ></iframe>
          </noscript>
          <!-- End Google Tag Manager (noscript) -->
      </NuxtLayout>
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
