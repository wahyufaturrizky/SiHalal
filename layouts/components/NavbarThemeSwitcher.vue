<script setup lang="ts">
import type { ThemeSwitcherTheme } from "@layouts/types";

const themes: ThemeSwitcherTheme[] = [
  // {
  //   name: 'system',
  //   icon: 'ri-macbook-line',
  // },
  {
    name: "light",
    icon: "ri-sun-line",
  },
  // {
  //   name: 'dark',
  //   icon: 'ri-moon-clear-line',
  // },
];
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
