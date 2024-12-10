<script setup lang="ts">
import ForgotPassLayout from '@/layouts/forgotPassLayout.vue'

definePageMeta({
  layout: 'blank',
  unauthenticatedOnly: true,
  middleware: 'reject-uri-wo-param',
})

const newPassDone = ref(false)
const newPassFail = ref(false)

const newPassEmitted = (val: boolean) => {
  newPassDone.value = val
}

const newPassFailEmitted = (val: boolean) => {
  newPassFail.value = val
}
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
          />
        </VCol>
      </VRow>
      <VRow
        no-gutters
      >
        <VCol class="text-left">
          <p
            class="mb-4 text-h3"
            style="color: #2c222e"
          >
            {{ !newPassDone ? "Atur Ulang Kata Sandi" : "Berhasil!" }}
          </p>
          <span
            v-if="!newPassDone"
            style="color: #746d76"
            class="text-xxl-body-1"
          >Buat Kata Sandi Baru untuk Akun Anda</span>
          <span
            v-if="newPassDone"
            style="color: #746d76;"
            class="text-xxl-body-2"
          >
            Kata sandi pada akun kamu berhasil diubah,
            silakan kembali login dengan kata sandi yang baru.
          </span>
        </VCol>
      </VRow>
      <br>
      <VRow v-if="newPassDone">
        <VCol class="v-col-12">
          <VBtn
            prepend-icon="mdi-arrow-left"
            min-width="100%"
          >
            <NuxtLink
              style="color: white"
              to="/login"
            >
              Kembali ke Halaman Login
            </NuxtLink>
          </VBtn>
        </VCol>
      </VRow>
    </template>
    <template
      v-if="!newPassDone"
      #formSlot
    >
      <ResetPassForm
        @new-pass-failed="newPassFailEmitted"
        @submit-new-pass="newPassEmitted"
      />
    </template>
  </ForgotPassLayout>
</template>
