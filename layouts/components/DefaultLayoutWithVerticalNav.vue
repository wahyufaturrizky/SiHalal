<script lang="ts" setup>
// import navItems from "@/navigation/index";
import { useConfigStore } from "@core/stores/config";
import { themeConfig } from "@themeConfig";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

// Components
import Footer from "@/layouts/components/Footer.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";

// @layouts plugin
import { VerticalNavLayout } from "@layouts";

const configStore = useConfigStore();
const menu = useMyAuthUserStore().getMenuVertical();

// ℹ️ Provide animation name for vertical nav collapse icon.
const verticalNavHeaderActionAnimationName = ref<
  "rotate-180" | "rotate-back-180" | null
>(null);

watch(
  [() => configStore.isVerticalNavCollapsed, () => configStore.isAppRTL],
  (val) => {
    if (configStore.isAppRTL)
      verticalNavHeaderActionAnimationName.value = val[0]
        ? "rotate-back-180"
        : "rotate-180";
    else
      verticalNavHeaderActionAnimationName.value = val[0]
        ? "rotate-180"
        : "rotate-back-180";
  },
  { immediate: true }
);
</script>

<template>
  <VerticalNavLayout :nav-items="menu">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n2 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <!-- <NavSearchBar class="ms-lg-n2" /> -->

        <VSpacer />

        <!-- <NavBarI18n
          v-if="
            themeConfig.app.i18n.enable &&
            themeConfig.app.i18n.langConfig?.length
          "
          :languages="themeConfig.app.i18n.langConfig"
          class="mr-5"
        /> -->
        <v-menu>
          <template #activator="{ props }">
            <VBtn
              class="mr-5 text-overline"
              color="black"
              size="small"
              variant="outlined"
              v-bind="props"
            >
              <VIcon start icon="fa-solid fa-globe" />
              {{ locale }}
              <VIcon end icon="mdi-chevron-down" />
            </VBtn>
          </template>
          <VList :selected="[locale]" color="primary" mandatory>
            <!-- List item -->
            <VListItem
              v-for="lang in themeConfig.app.i18n.langConfig"
              :key="lang.i18nLang"
              class="px-4"
              :value="lang.i18nLang"
              @click="locale = lang.i18nLang"
            >
              <!-- Language label -->
              <VListItemTitle>
                {{ lang.label }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </v-menu>
        <!-- <NavbarThemeSwitcher />
        <NavbarShortcuts /> -->
        <!-- <NavBarNotifications class="me-2" /> -->
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </VerticalNavLayout>
</template>

<style lang="scss">
@keyframes rotate-180 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

@keyframes rotate-back-180 {
  from {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.layout-vertical-nav {
  .nav-header {
    .header-action {
      animation-duration: 0.35s;
      animation-fill-mode: forwards;
      animation-name: v-bind(verticalNavHeaderActionAnimationName);
      transform: rotate(0deg);
    }
  }
}
</style>
