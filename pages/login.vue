<script setup lang="ts">
import type { User } from "next-auth";
import type { NuxtError } from "nuxt/app";

import { themeConfig } from "@themeConfig";
import { VForm } from "vuetify/components/VForm";

import { VNodeRenderer } from "@/@layouts/components/VNodeRenderer";
import bseImage from "@images/bse.png";
import NoImage from "@images/no-image.png";
import ossImage from "@images/oss.png";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";
import { useDisplay } from "vuetify";

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
  password: undefined,
});
const turnstile = ref();
const refVForm = ref<VForm>();

const credentials = ref({
  email: "admin@demo.com",
  password: "admin",
});

const rememberMe = ref(false);

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
  const captchaResponse = await $fetch("/_turnstile/validate", {
    method: "POST",
    body: { token: turnstile.value },
  });
  if (!captchaResponse.success) {
    captchaError.value = true;
    return;
  }
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login();
  });
};
</script>

<template>
  <VSnackbar v-model="captchaError" location="top" color="error">
    Captcha failed
  </VSnackbar>

  <VRow no-gutters class="auth-wrapper">
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <v-card-text>
          <NuxtLink to="/">
            <div class="auth-logo app-logo">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </NuxtLink>
        </v-card-text>
        <VCardText>
          <h4 class="text-h4 mb-1">
            Selamat Datang di
            <span class="text-capitalize" color="#652672">{{
              themeConfig.app.title
            }}</span>
          </h4>
          <p class="mb-0">
            Login untuk mengakses fitur pada web {{ themeConfig.app.title }}
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.email"
                  label="Email"
                  placeholder="johndoe@email.com"
                  type="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.password"
                  label="Password"
                  placeholder="············"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div
                  class="d-flex align-center flex-wrap justify-space-between my-6 gap-x-2"
                >
                  <VCheckbox v-model="rememberMe" label="Remember me" />
                  <!-- <NuxtLink
                    class="text-primary"
                    :to="{ name: 'forgot-password' }"
                  >
                    Forgot Password?
                  </NuxtLink> -->
                </div>
                <div class="my-6 gap-x-2">
                  <NuxtTurnstile v-model="turnstile" class="text-center" />
                </div>

                <VBtn block type="submit"> Login </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block"> Belum punya akun ?</span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  :to="{ name: 'index' }"
                >
                  Daftar di sini
                </NuxtLink>
              </VCol>

              <!-- <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol> -->

              <!-- auth providers -->
              <!-- <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol> -->
            </VRow>
          </VForm>
        </VCardText>
        <VCardText>
          <VCol cols="12" class="text-body-1 text-center">
            <span class="d-inline-block">Terhubung Ke</span>
          </VCol>
          <VRow align="center" justify="center">
            <VCol cols="12" md="auto" class="d-flex align-center">
              <VImg :src="ossImage" width="100" height="48" />
            </VCol>
            <VCol cols="12" md="auto" class="d-flex align-center">
              <VImg :src="bseImage" width="100" height="48" />
            </VCol>
          </VRow>
        </VCardText>
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
@use "@core/scss/template/pages/page-auth.scss";
.auth-logo {
  div {
    svg {
      height: 60px;
      width: 33px;
    }
  }
}
</style>
