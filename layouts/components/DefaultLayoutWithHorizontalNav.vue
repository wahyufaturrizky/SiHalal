<script lang="ts" setup>
import { themeConfig } from "@themeConfig";
const menu = useMyAuthUserStore().getMenuHorizontal();

// Components
import Footer from "@/layouts/components/Footer.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";
import NavBarI18n from "@core/components/I18n.vue";
import { HorizontalNavLayout } from "@layouts";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"; /* PartiallyEnd: #3632/scriptSetup.vue */
</script>

<template>
  <HorizontalNavLayout :nav-items="menu">
    <!-- 👉 navbar -->
    <template #navbar>
      <NuxtLink to="/" class="app-logo">
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <h1 class="app-logo-title leading-normal">
          {{ themeConfig.app.title }}
        </h1>
      </NuxtLink>
      <VSpacer />

      <!-- <NavSearchBar /> -->

      <NavBarI18n
        v-if="
          themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length
        "
        :languages="themeConfig.app.i18n.langConfig"
      />

      <!-- <NavbarThemeSwitcher />
      <NavbarShortcuts />
      <NavBarNotifications class="me-2" /> -->
      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </HorizontalNavLayout>
</template>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.75rem;
    text-transform: capitalize;
  }
}
</style>
