<script setup lang="ts">
import ForgotPassLayout from "@/layouts/forgotPassLayout.vue";
definePageMeta({
  layout: "blank",
  unauthenticatedOnly: true,
});

const newPassDone = ref(false);

const newPassEmitted = (val: boolean) => {
  if (val) {
    newPassDone.value = true;
  }
};
</script>

<template>
  <ForgotPassLayout>
    <template #pageTitle>
      <VRow>
        <VCol>
          <h2 v-if="!newPassDone" style="color: #2c222e">
            Atur Ulang Kata Sandi
          </h2>
          <h2 v-if="newPassDone" style="color: #2c222e">Berhasil!</h2>
          <span v-if="!newPassDone" style="color: #746d76"
            >Buat Kata Sandi Baru untuk Akun Anda</span
          >
          <span v-if="newPassDone" style="color: #746d76"
            >Kata sandi pada akun kamu berhasil diubah, silakan kembali login
            dengan kata sandi yang baru.</span
          >
        </VCol>
      </VRow>
      <br />
      <VRow v-if="newPassDone">
        <VCol class="v-col-12">
          <VBtn width="450" prepend-icon="mdi-arrow-left"
            ><NuxtLink style="color: white" to="/login"
              >Kembali ke Halaman Login</NuxtLink
            ></VBtn
          >
        </VCol>
      </VRow>
    </template>
    <template v-if="!newPassDone" #formSlot
      ><ResetPassForm @submitNewPass="newPassEmitted"></ResetPassForm
    ></template>
  </ForgotPassLayout>
</template>
