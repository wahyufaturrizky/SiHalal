<script setup lang="ts">
import ForgotPassLayout from "@/layouts/forgotPassLayout.vue";
definePageMeta({
  layout: "blank",
  unauthenticatedOnly: true,
  middleware: "reject-uri-wo-param",
});

const newPassDone = ref(false);
const newPassFail = ref(false);

const newPassEmitted = (val: boolean) => {
  newPassDone.value = val;
};
const newPassFailEmitted = (val: boolean) => {
  newPassFail.value = val;
};
</script>

<template>
  <ForgotPassLayout>
    <template #pageTitle>
      <VRow>
        <VCol cols="12">
          <VAlert
            v-if="newPassFail"
            type="error"
            text="Kata Sandi Gagal diubah"
          ></VAlert>
        </VCol>
      </VRow>
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
      ><ResetPassForm
        @new-pass-failed="newPassFailEmitted"
        @submitNewPass="newPassEmitted"
      ></ResetPassForm
    ></template>
  </ForgotPassLayout>
</template>
