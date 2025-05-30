<script setup lang="ts">
import { themeConfig } from "@themeConfig";
import { useI18n } from "vue-i18n";
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components/VForm";

import { requiredValidator } from "#imports";
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

const loadingSubmit = ref(false);
const rememberMe = useState("rememberMe", () => false);

const evaluateEmail = (value: string) => {
  if (value.includes("@")) return value.toLowerCase();

  return value;
};

async function login() {
  buttonClicked.value = true;
  loadingSubmit.value = true;
  try {
    const response = await signIn({
      callbackUrl: "/",
      redirect: false,
      email: evaluateEmail(credentials.value.email),
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
      errors.value.password = t("login.msg-err-password");
      errors.value.username = t("login.msg-err-username");
    }
    if (error.data.data.success == false) {
      useSnackbar().sendSnackbar("Captcha Failed", "error");
      loadingSubmit.value = false;

      return;
    }
    useSnackbar().sendSnackbar(t("login.msg-err-login"), "error");
    loadingSubmit.value = false;
  } finally {
    token.value = "";
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

const token = ref<unknown | string>("");

const handleLoadCallback = (response: unknown) => {
  token.value = response;
};

const getDate = (): string => {
  // Get the current date
  const currentDate = new Date();

  // Format the modified date to "id-ID" locale
  return currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const fileType = ref("IMG");
const videOrientation = ref("PORTRAIT");
const currentDisplayFile = ref("");

const handleLoadImageAuth = async () => {
  try {
    const response: any = await $api("/admin/images/random-image", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      fileType.value = response.data.type.toUpperCase();

      // const fileExt = response.data.file_name.split(".").pop();
      // fileType.value = !["webp"].includes(fileExt) ? "VID" : "IMG";
      if (fileType.value === "VID") {
        const orientationStr = response.data.file_name.split("-").pop();

        videOrientation.value = orientationStr.split(".")[0];
      }

      handleLoadImageFile(response.data.file_name);
    } else {
      currentDisplayFile.value = NoImage;
    }
  } catch (error) {
    currentDisplayFile.value = NoImage;
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

    currentDisplayFile.value = response.url;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const requiredValidatorTranslated = (value) => {
  return requiredValidator(value, t("validation.fill"));
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

const { t } = useI18n();
</script>

<template>
  <HelpButton />
  <VRow
    no-gutters
    class="position-relative"
    style="min-block-size: calc(100vh - 48px)"
  >
    <VCol cols="12" md="6" class="d-flex align-center justify-center login-bg">
      <VCard flat :max-width="500" class="mt-3 mt-sm-0 pa-2 pa-lg-3">
        <VCardText class="pt-0">
          <NuxtLink to="/">
            <div class="auth-logo app-logo">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </NuxtLink>
        </VCardText>
        <VCardText>
          <h4 class="text-h4 mb-1">
            {{ t("login.header") }}
            <span class="text-capitalize" color="#652672">{{
              themeConfig.app.title
            }}</span>
          </h4>
          <p class="mb-0">
            {{ t("login.subheader") }}
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.email"
                  :label="t('login.username-attr')"
                  :placeholder="t('login.username-tip')"
                  type="text"
                  :autofocus="false"
                  :rules="[requiredValidatorTranslated]"
                  :error-messages="errors.email"
                />
              </VCol>
              <!-- @input="errors.email = undefined" -->
              <!-- emailValidator -->

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.password"
                  :label="t('login.password-attr')"
                  :placeholder="t('login.password-tip')"
                  :rules="[requiredValidatorTranslated]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.username"
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
                    {{ t("login.action-forgot-password") }}
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
                  :loading="loadingSubmit"
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
                <span class="d-inline-block"> {{ t("login.tip-1") }}</span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  :to="{ name: 'register' }"
                >
                  {{ t("login.tip-1a") }}
                </NuxtLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardText>
          <VAlert
            :title="t('login.browser-compatibility-title')"
            :text="t('login.browser-compatibility-info')"
            type="info"
            variant="outlined"
            color="primary"
          />
          <VCol cols="12" class="text-body-1 text-center">
            <span class="d-inline-block"> {{ t("login.tip-2") }}</span>
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
      class="py-1 pe-2 bg-white position-sticky"
      style="inset-block-start: 23px; max-block-size: calc(100vh - 48px)"
    >
      <div
        v-if="fileType === 'IMG'"
        class="h-100 d-flex align-center justify-start"
      >
        <img
          :src="currentDisplayFile"
          height="100%"
          style="border-radius: 20px"
        />
      </div>
      <div v-else class="h-100">
        <div
          v-if="videOrientation === 'POTRAIT'"
          class="h-100 d-flex align-center justify-start"
        >
          <video
            v-if="currentDisplayFile"
            height="100%"
            autoplay
            controls
            loop
            style="border-radius: 20px"
          >
            <source :src="currentDisplayFile" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div v-else class="h-100 d-flex align-center justify-center">
          <video
            v-if="currentDisplayFile"
            width="100%"
            autoplay
            controls
            loop
            style="border-radius: 20px"
          >
            <source :src="currentDisplayFile" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
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

.browser-info {
  p {
    font-size: 1rem;
    line-height: 1.25rem;
    margin-block-end: 0.5rem;
  }
}
</style>
