<script lang="ts" setup>
import { layoutConfig } from "@layouts";
import { useLayoutConfigStore } from "@layouts/stores/config";
import type { NavSectionTitle } from "@layouts/types";
import { getDynamicI18nProps } from "@layouts/utils";

const props = defineProps<{
  item: NavSectionTitle;
  roles: string[];
}>();

const { locale } = useI18n({ useScope: "global" });
const configStore = useLayoutConfigStore();
const shallRenderIcon = configStore.isVerticalNavMini();
const isShown = props.roles.some((item) => props.item.roles?.includes(item));
</script>

<template>
  <li v-if="isShown" class="nav-section-title">
    <div class="title-wrapper">
      <Transition name="vertical-nav-section-title" mode="out-in">
        <Component
          :is="
            shallRenderIcon
              ? layoutConfig.app.iconRenderer
              : layoutConfig.app.i18n.enable
              ? 'i18n-t'
              : 'span'
          "
          :key="shallRenderIcon"
          :class="shallRenderIcon ? 'placeholder-icon' : 'title-text'"
          v-bind="{
            ...layoutConfig.icons.sectionTitlePlaceholder,
            ...getDynamicI18nProps(
              locale == 'en' ? item.heading_en : item.heading,
              'span'
            ),
          }"
        >
          {{ !shallRenderIcon ? item.heading : null }}
        </Component>
      </Transition>
    </div>
  </li>
</template>
