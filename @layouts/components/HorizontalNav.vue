<script lang="ts" setup>
import { HorizontalNavGroup, HorizontalNavLink } from "@layouts/components";
import type { HorizontalNavItems, NavGroup, NavLink } from "@layouts/types";

defineProps<{
  navItems: HorizontalNavItems;
}>();

const resolveNavItemComponent = (item: NavLink | NavGroup) => {
  if ("children" in item) return HorizontalNavGroup;

  return HorizontalNavLink;
};
const sessionData = await useMyAuthUserStore().getSession();
const userRole = sessionData.value?.roles.map((role) => role.name);
console.log(userRole, "ini role");
</script>

<template>
  <ul class="nav-items">
    <Component
      :is="resolveNavItemComponent(item)"
      :roles="userRole"
      v-for="(item, index) in navItems"
      :key="index"
      :item="item"
    />
  </ul>
</template>

<style lang="scss">
.layout-wrapper.layout-nav-type-horizontal {
  .nav-items {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
