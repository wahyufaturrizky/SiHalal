<script setup lang="ts">
import { themeConfig } from "@themeConfig";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components/VForm";

import { emailValidator, requiredValidator } from "#imports";
import { VNodeRenderer } from "@/@layouts/components/VNodeRenderer";
import HelpButton from "@/views/pages/HelpButton.vue";
import bseImage from "@images/bse.png";
import NoImage from "@images/no-image.png";
import ossImage from "@images/oss.png";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
const { signIn, data: sessionData, status, signOut } = useAuth();
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
const { handleReset, handleGetResponse } = useRecaptcha();

const isPasswordVisible = useState("isPasswordVisible", () => false);
const isDisabledSubmit = useState("isDisabledSubmit", () => true);
const config = useRuntimeConfig();
const siteKey = config.public.turnstile.siteKey;
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
  buttonClicked.value = true;
  try {
    const response = await signIn({
      callbackUrl: "/",
      redirect: false,
      email: credentials.value.email,
      password: credentials.value.password,
      token: token.value,
    });

    navigateTo(route.query.to ? String(route.query.to) : "/", {
      replace: true,
    });
  } catch (error: any) {
    buttonClicked.value = true;
    handleReset(widgetCaptcha.value);
    if (error.data.statusCode == 400) {
      useUserVerificationStore().setUserData({
        id: error.data.data.user.id,
        email: error.data.data.user.email,
        phone_number: error.data.data.user.phone_number,
      });
      navigateTo({
        path: "/verifikasi-user",
        query: {
          id: error.data.data.user.id,
          email: error.data.data.user.email,
        },
      });
      return;
    }
    if (error.data.data.code === 400000) {
      errors.value.password = "Kata sandi tidak tepat!";
      errors.value.email = "Alamat Email tidak ditemukan!";
    }
    if (error.data.data.success == false) {
      useSnackbar().sendSnackbar("Captcha Failed", "error");

      return;
    }
    useSnackbar().sendSnackbar(
      "Gagal masuk, mohon periksa kembali kelengkapan data!",
      "error"
    );
    buttonClicked.value = false;
  }

  // If error is not null => Error is occurred

  // Update user abilities
}
const captchaError = useState("captchaError", () => false);

const onSubmit = async () => {
  // sendSnackbar("error bang", "success");
  buttonClicked.value = true;
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login();
  });
  buttonClicked.value = false;
};

const redirectToForgotPass = () => {
  navigateTo("/forgot-password");
};
const widgetCaptcha = ref();
const handleWidgetId = (widgetId: number) => {
  widgetCaptcha.value = widgetId;
  handleGetResponse(widgetId);
};
const handleErrorCallback = () => {
  token.value = "";
};
const handleExpiredCallback = () => {
  token.value = "";
};
const token = ref("");
const handleLoadCallback = (response: unknown) => {
  token.value = response;
};

const getDate = (): string => {
  // Get the current date
  const currentDate = new Date();

  // Format the modified date to "id-ID" locale
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};

const currentImage = ref("");
const handleLoadImageAuth = async () => {
  try {
    const response: any = await $api("/admin/images/random-image", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      handleLoadImageFile(response.data.file_name);
    } else {
      currentImage.value = NoImage;
    }
  } catch (error) {
    currentImage.value = NoImage;
    console.error(error);
  }
};
const handleLoadImageFile = async (filename: string) => {
  try {
    const response: any = await $api("/admin/images/download", {
      method: "post",
      query: {
        filename,
      },
    } as any);
    currentImage.value = response.url;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(() => {
  handleLoadImageAuth();
});
const items = [
  {
    title: "Option 1",
    value: "Option 1",
    props: {
      prependIcon: "fa-whatsapp",
    },
  },
];
</script>

<template>
  <HelpButton />
  <VRow no-gutters>
    <VCol cols="12" md="6" class="d-flex align-start justify-center login-bg">
      <VCard flat :max-width="500" class="mt-3 mt-sm-0 pa-2 pa-lg-3">
        <VCardText>
          <NuxtLink to="/">
            <div class="auth-logo app-logo">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </NuxtLink>
        </VCardText>
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
                  placeholder="Masukkan Email"
                  type="email"
                  :autofocus="false"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                  @input="errors.email = undefined"
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
                  @input="errors.password = undefined"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <VCol cols="12" class="text-body-1 text-right">
                  <NuxtLink
                    class="text-primary ms-1 d-inline-block text-body-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    Lupa Kata Sandi?
                  </NuxtLink>
                </VCol>

                <div class="my-4 gap-x-2 d-flex justify-center">
                  <RecaptchaV2
                    :sitekey="config.public.recaptcha.siteKey"
                    @widget-id="handleWidgetId"
                    @error-callback="handleErrorCallback"
                    @expired-callback="handleExpiredCallback"
                    @load-callback="handleLoadCallback"
                  />
                  <!--
                    <recaptcha
                    @error="handleErrorCallback"
                    @success="handleLoadCallback"
                    @expired="handleExpiredCallback"
                    />
                  -->
                  <!--
                    <div
                    class="g-recaptcha"
                    :data-sitekey="siteKey"
                    :data-callback="handleLoadCallback"
                    ></div>
                  -->
                </div>

                <VBtn
                  block
                  type="submit"
                  :disabled="
                    token == '' ||
                    buttonClicked ||
                    credentials.email == '' ||
                    credentials.password == ''
                  "
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
            </VRow>
          </VForm>
        </VCardText>
        <VCardText>
          <VCol cols="12" class="text-body-1 text-center">
            <span class="d-inline-block">Terhubung Ke</span>
          </VCol>
          <VRow align="center" justify="center">
            <VCol cols="auto" class="d-flex align-center">
              <img :src="ossImage" width="100" height="44" />
            </VCol>
            <VCol cols="auto" class="d-flex align-center">
              <img :src="bseImage" width="100" height="44" />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" align="center" justify="center">
              Update:
              {{ getDate() }}
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      v-if="mdAndUp"
      md="6"
      class="d-flex align-start justify-start py-1 pe-2 bg-white"
      style="max-height: calc(100vh - 48px)"
    >
      <img :src="currentImage" height="100%" style="border-radius: 20px" />
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
