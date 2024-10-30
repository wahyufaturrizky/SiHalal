<script setup lang="ts">
import ForgotPassLayout from "@/layouts/forgotPassLayout.vue";
definePageMeta({
  layout: "blank",
  unauthenticatedOnly: true,
});
</script>

<template>
  <ForgotPassLayout>
    <template #pageTitle>
      <h2 style="color: #2c222e">Lupa Kata Sandi?</h2>
      <span style="color: #746d76">Verifikasi akun kamu melalui email</span>
    </template>
    <template #formSlot><EmailForm></EmailForm></template>
  </ForgotPassLayout>
</template>
