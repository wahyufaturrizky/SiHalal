<script lang="ts" setup>
import { NuxtLink } from "#components";

import { layoutConfig } from "@layouts";
import { useLayoutConfigStore } from "@layouts/stores/config";
import type { NavLink } from "@layouts/types";
import {
  getComputedNavLinkToProp,
  getDynamicI18nProps,
  isNavLinkActive,
} from "@layouts/utils";

const props = defineProps<{
  item: NavLink;
  roles: string[];
}>();
const { locale } = useI18n({ useScope: "global" });
const configStore = useLayoutConfigStore();
const hideTitleAndBadge = configStore.isVerticalNavMini();
const isShown = props.roles.some((item) => props.item.roles?.includes(item));
</script>

<template>
  <li v-if="isShown" class="nav-link" :class="{ disabled: item.disable }">
    <Component
      :is="item.to ? NuxtLink : 'a'"
      v-bind="getComputedNavLinkToProp(item)"
      :class="{
        'router-link-active router-link-exact-active': isNavLinkActive(
          props.item,
          $router
        ),
      }"
    >
      <Component
        :is="layoutConfig.app.iconRenderer || 'div'"
        v-bind="
          props.item.icon || layoutConfig.verticalNav.defaultNavItemIconProps
        "
        class="nav-item-icon"
      />
      <TransitionGroup name="transition-slide-x">
        <!-- 👉 Title -->
        <Component
          :is="layoutConfig.app.i18n.enable ? 'i18n-t' : 'span'"
          v-show="!hideTitleAndBadge"
          key="title_en"
          class="nav-item-title"
          v-bind="
            getDynamicI18nProps(
              locale == 'en' ? props.item.title_en : props.item.title,
              'span'
            )
          "
          v-tooltip:top="$t(props.item.title)"
        >
          <!-- {{ locale == "en" ? props.item.title_en : props.item.title_en }} -->
        </Component>

        <!-- 👉 Badge -->
        <Component
          :is="layoutConfig.app.i18n.enable ? 'i18n-t' : 'span'"
          v-if="props.item.badgeContent"
          v-show="!hideTitleAndBadge"
          key="badge"
          class="nav-item-badge"
          :class="props.item.badgeClass"
          v-bind="getDynamicI18nProps(props.item.badgeContent, 'span')"
        >
          {{ props.item.badgeContent }}
        </Component>
      </TransitionGroup>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
  }
}
</style>
