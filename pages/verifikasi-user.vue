<script setup lang="ts">
import type { User } from "next-auth";
import type { NuxtError } from "nuxt/app";

import { themeConfig } from "@themeConfig";
import { useDisplay } from "vuetify";
import type { VForm } from "vuetify/components/VForm";

import { emailValidator, requiredValidator } from "#imports";
import NoImage from "@images/no-image.png";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";

const { signIn, data: sessionData } = useAuth();
const { mdAndUp } = useDisplay();

const authThemeImg = useGenerateImageVariant(
  NoImage,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);

const authThemeMask = useGenerateImageVariant(
  authV2LoginMaskLight,
  authV2LoginMaskDark
);

definePageMeta({
  layout: "blank",
  unauthenticatedOnly: true,
});

const isPasswordVisible = ref(false);

const route = useRoute();

const ability = useAbility();

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  noHandphone: undefined,
});

// const turnstile = ref();
const refVForm = ref<VForm>();

// const credentials = ref({
//   typeUser: '',
//   name: '',
//   email: 'admin@demo.com',
//   noHandphone: '',
//   password: 'admin',
//   passwordConfrim: '',
// })

const form = ref({
  email: null,
  noHandphone: null,
});

async function login() {
  const response = await signIn("credentials", {
    callbackUrl: "/",
    redirect: false,
    ...credentials.value,
  });

  // If error is not null => Error is occurred
  if (response && response.error) {
    const apiStringifiedError = response.error;
    const apiError: NuxtError = JSON.parse(apiStringifiedError);

    errors.value = apiError.data as Record<string, string | undefined>;

    // If err => Don't execute further
    return;
  }

  // Reset error on successful login
  errors.value = {};

  // Update user abilities
  const { user } = sessionData.value!;

  useCookie<Partial<User>>("userData").value = user;

  // Save user abilities in cookie so we can retrieve it back on refresh
  useCookie<User["abilityRules"]>("userAbilityRules").value = user.abilityRules;

  ability.update(user.abilityRules ?? []);

  navigateTo(route.query.to ? String(route.query.to) : "/", { replace: true });
}
const captchaError = useState("captchaError", () => false);

const onSubmit = async () => {
  // const captchaResponse = await $fetch("/api/validateTurnstile", {
  //   method: "POST",
  //   body: { token: turnstile.value },
  // });

  // if (!captchaResponse.success) {
  //   captchaError.value = true;

  //   return;
  // }
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login();
  });
};

// check  disableSubmit
const isDisabledSubmit = computed(() => {
  return !form.email.value;
});

// validasi
const phoneValidator = (value: string) => {
  const isValid = /^\d{10,13}$/.test(value);

  return (
    isValid ||
    'Nomor Handphone harus dimulai dengan "08" dan berjumlah 10-13 digit angka'
  );
};

const requiredValidator = (value: string) => !!value || "Wajib diisi";

const currentTab = ref(0);

const isPhoneTabDisabled = computed(() => {
  console.log(form.value.email, "email ini");

  // Misalnya, tab kedua dinonaktifkan jika email belum terisi
  return form.value.email || errors.value.email;
});
</script>

<template>
  <!--
    <VSnackbar
    v-model="captchaError"
    location="top"
    color="error"
    >
    Captcha failed
    </VSnackbar>
  -->

  <VRow no-gutters class="auth-wrapper">
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center bg-white"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <VCardText>
          <h3 class="text-h4 mb-1">Akun Kamu Berhasil Terdaftar!</h3>
          <p class="mb-0">
            Terima kasih telha membuat akun di website
            {{ themeConfig.app.title }}, untuk proses selanjutnya verfikasi
            menggunakan email atua nomor handphone yang telah terdaftar
          </p>
        </VCardText>

        <VCardText>
          <VTabs v-model="currentTab" grow>
            <VTab>Email</VTab>
            <VTab :disabled="isPhoneTabDisabled"> NomorHandphone </VTab>
          </VTabs>

          <VWindow v-model="currentTab" class="mt-5">
            <VWindowItem key="1">
              <VCol cols="12">
                <h3 class="verifikasi-title">Verifikasi dengan Email</h3>
                <p>klik button untuk mengirim kode verifikasi</p>
                <VTextField
                  v-model="form.email"
                  class="mb-5"
                  :rules="[requiredValidator, emailValidator]"
                  type="text"
                  :error-messages="errors.email"
                  placeholder="Masukan Email"
                />

                <VBtn block :disabled="isDisabledSubmit" type="submit">
                  Kirim Kode Verifikasi
                </VBtn>
              </VCol>
            </VWindowItem>
            <VWindowItem key="2">
              <h3 class="verifikasi-title">
                Verifikasi dengan Nomor Handphone
              </h3>
              <p>klik button untuk mengirim kode verifikasi</p>
              <VTextField
                v-model="form.noHandphone"
                class="mb-5"
                :rules="[requiredValidator, phoneValidator]"
                type="text"
                :error-messages="errors.email"
                placeholder="Masukan Email"
              />

              <VBtn block :disabled="isDisabledSubmit" type="submit">
                Kirim Kode Verifikasi
              </VBtn>
            </VWindowItem>
          </VWindow>
        </VCardText>

        <!--
          <VCardText>
          <VRow align="center" justify="center">
          <VCol cols="12" md="auto" class="d-flex align-center">
          <VImg :src="ossImage" width="100" height="48" />
          </VCol>
          <VCol cols="12" md="auto" class="d-flex align-center">
          <VImg :src="bseImage" width="100" height="48" />
          </VCol>
          </VRow>
          </VCardText>
        -->
      </VCard>
    </VCol>
    <VCol
      v-if="mdAndUp"
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VImg :src="NoImage" />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";

.verifikasi-title {
  font-size: 1.25rem; /* Atur ukuran font sesuai kebutuhan */
  font-weight: bold; /* Menjadikan teks menjadi tebal */
  margin-block-end: 16px; /* Mengatur jarak di bawah judul */
}

.auth-logo {
  div {
    svg {
      block-size: 60px;
      inline-size: 33px;
    }
  }
}

.bg-white {
  background-color: white;
}
</style>
