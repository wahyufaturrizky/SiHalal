<script setup lang="ts">
import { themeConfig } from "@themeConfig";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components/VForm";

import { emailValidator, requiredValidator } from "#imports";
import { VNodeRenderer } from "@/@layouts/components/VNodeRenderer";
import bseImage from "@images/bse.png";
import NoImage from "@images/no-image.png";
import ossImage from "@images/oss.png";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";

const { signIn, data: sessionData, status } = useAuth();
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

const isPasswordVisible = useState("isPasswordVisible", () => false);
const isDisabledSubmit = useState("isDisabledSubmit", () => true);

const route = useRoute();

const ability = useAbility();

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
});
const turnstile = ref();
const buttonClicked = ref(false);
const refVForm = ref<VForm>();

const credentials = ref({
  email: "",
  password: "",
});

const rememberMe = useState("rememberMe", () => false);

async function login() {
  try {
    const response = await signIn({
      callbackUrl: "/",
      redirect: false,
      email: credentials.value.email,
      password: credentials.value.password,
      token: turnstile.value,
    });
    navigateTo(route.query.to ? String(route.query.to) : "/", {
      replace: true,
    });
  } catch (error) {
    useSnackbar().sendSnackbar("username atau password salah", "error");
    buttonClicked.value = false;
    return;
  }

  // If error is not null => Error is occurred

  // Update user abilities
}
const captchaError = useState("captchaError", () => false);
const onSubmit = async () => {
  // sendSnackbar("error bang", "success");
  buttonClicked.value = true;
  console.log("ini", buttonClicked.value || !turnstile.value);
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login();
  });
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper">
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center login-bg"
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
            {{ status }}
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
                  placeholder="Masukkan Email"
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
                    isPasswordVisible
                      ? 'fa-eye-slash fa-reguler'
                      : 'fa-eye fa-reguler'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="my-6 gap-x-2">
                  <NuxtTurnstile v-model="turnstile" class="text-center" />
                </div>

                <VBtn
                  block
                  type="submit"
                  :disabled="!turnstile || buttonClicked"
                >
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block"> Belum punya akun ?</span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  :to="{ name: 'register' }"
                >
                  Daftar di sini
                </NuxtLink>
              </VCol>

              <!-- <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
                </VCol>
              -->

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
      <VImg :src="NoImage" height="100dvh" cover />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";

.auth-logo {
  div {
    svg {
      block-size: 60px;
      inline-size: 33px;
    }
  }
}
.login-bg {
  background-color: rgb(var(--v-theme-surface));
}
</style>
