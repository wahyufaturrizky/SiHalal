<script setup lang="ts">
import { themeConfig } from "@themeConfig";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components/VForm";

import { VNodeRenderer } from "@/@layouts/components/VNodeRenderer";
import type { MasterCountry } from "@/server/interface/master.iface";
import HelpButton from "@/views/pages/HelpButton.vue";
import bseImage from "@images/bse.png";
import NoImage from "@images/no-image.png";
import ossImage from "@images/oss.png";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";
import { useI18n } from "vue-i18n";

const MAX_LENGTH_PHONE_NUMBER = 16;

const { sendSnackbar } = useSnackbar();
const userVerificationStore = useUserVerificationStore();

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
const isPasswordVisibleConfrim = ref(false);

const route = useRoute();

const ability = useAbility();

const errors = reactive({
  email: undefined,
  typeUser: undefined,
  name: undefined,
  noHandphone: undefined,
  password: undefined,
  passwordConfirm: undefined,
});

const validateName = () => {
  if (!form.value.name) errors.name = "Wajib diisi";
  else errors.name = "";
};

const validateEmail = () => {
  const email = form.value.email;

  const emailRegexV2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) errors.email = "Wajib diisi";
  else if (!emailRegexV2.test(email)) errors.email = "Format email tidak valid";
  else errors.email = "";
};

const validateNomorHandphone = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.value = target.value.replace(/\D/g, "");

  if (target.value.startsWith(0)) {
    target.value = target.value.substring(1);
  }

  form.value.noHandphone = target.value;
  if (!form.value.noHandphone) errors.noHandphone = "Wajib diisi";
  else errors.noHandphone = "";
};

const handlePasteNomorTelepon = (event: ClipboardEvent) => {
  event.preventDefault();
  const target = event.target as HTMLInputElement;

  const clipboardData = event.clipboardData?.getData("text") || "";
  let filteredData = clipboardData.replace(/\D/g, "");
  filteredData = filteredData.slice(0, MAX_LENGTH_PHONE_NUMBER);

  if (target) target.value = filteredData;

  form.value.noHandphone = filteredData;

  if (!target.value) {
    errors.noHandphone = "Wajib diisi";
  } else {
    errors.noHandphone = "";
  }
};

const refVForm = ref<VForm>();

const form = ref({
  typeUser: null,
  name: null,
  email: null,
  noHandphone: null,
  password: "",
  passwordConfirm: "",
});

const validateConfrimPassword = () => {
  if (form.value.passwordConfirm.length === 0)
    errors.passwordConfirm = "Wajib diisi";
  else if (form.value.passwordConfirm < 8)
    errors.passwordConfirm = "Pastikan kata sandi minimal 8 karakter!";
  else if (form.value.passwordConfirm !== form.value.password)
    errors.passwordConfirm = "Kata sandi tidak sama!";
  else errors.passwordConfirm = "";
};

const validatePassword = () => {
  if (form.value.password.length === 0) errors.password = "Wajib diisi";
  else if (form.value.password.length < 8)
    errors.password = "Password harus minimal 8 karakter";
  else if (form.value.password !== form.value.passwordConfirm)
    errors.password = "Kata sandi tidak sama!";
  else errors.password = "";
};

watch([() => form.value.password, () => form.value.passwordConfirm], () => {
  console.log("TRIGGER WATCH ");
  validatePassword();
  validateConfrimPassword();
});

const router = useRouter();

const selectedPhoneCode = ref();
const onSubmit = async () => {
  // localStorage.setItem('formData', JSON.stringify(form.value))

  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      const payload = {
        role_id: form.value.typeUser.id,
        name: form.value.name,
        email: form.value.email,
        phone_number: form.value.noHandphone,
        password: form.value.password,
        confirm_password: form.value.passwordConfirm,
        code_country: selectedPhoneCode.value,
      };

      const payloadcheck = {
        email: form.value.email,
        phone_number: `${selectedPhoneCode.value}${form.value.noHandphone}`,
      };

      try {
        const response = await $api("/auth/check-email-phone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadcheck),
        });

        console.log("RESPONSE CHECK EMAIL PHONE : ", response);

        if (!response.data) {
          (errors.noHandphone = ""), (errors.email = "");

          return;
        }

        if (response.data.phone_number_is_exist) {
          errors.noHandphone =
            "Nomor handphone sudah terdaftar, silahkan gunakan nomor lain!";

          return;
        }
        if (response.data.email_is_exist) {
          errors.email = "Email sudah terdaftar, silahkan gunakan email lain!";

          return;
        }

        const responseRegister = await $api("/auth/register", {
          method: "POST", // Mengatur metode menjadi POST
          headers: {
            "Content-Type": "application/json", // Mengatur tipe konten
          },
          body: payload,
        });

        console.log("RESPONSE REGISTER : ", responseRegister);

        if (responseRegister.code !== 2000) {
          sendSnackbar(
            "Gagal melakukan pembuatan akun, mohon periksa kembali kelengkapan data! ",
            "error"
          );

          return;
        }

        userVerificationStore.setUserData(responseRegister.data.user);

        navigateTo({
          path: "/verifikasi-user",
        });
      } catch (error) {
        console.log(error, "sini erorrr");
      }
    }
  });
};

const typeUserItem = ["Pelaku Usaha", "Buisness Actor", "Impoter"];

// check  disableSubmit
const isDisabledSubmit = computed(() => {
  const email = form.value.email;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return !(
    form.value.typeUser &&
    form.value.name &&
    form.value.email &&
    emailRegex.test(email) &&
    form.value.noHandphone &&
    form.value.password &&
    form.value.passwordConfirm &&
    errors.password === ""
  );
});

onMounted(async () => {
  try {
    const response: any = await $api("/auth/type-role", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp: any) => {
      console.log("fetch type = ", resp);

      const eligibleRole = ["r.10", "r.45", "r.5", "r.50"];
      fetchType.value = resp?.filter(
        (val: any) =>
          val.name !== "" && eligibleRole.includes(val.code?.toLowerCase())
      ); // Menyimpan data ke dalam ref
    });
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
});

onMounted(() => {
  const savedData = localStorage.getItem("formData");
  if (savedData) form.value = JSON.parse(savedData);
});

const fetchType = ref([]);

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

const imageArray = [
  "/images/login-register/1.png",
  "/images/login-register/2.png",
  "/images/login-register/3.png",
];

const fileType = ref("IMG");
const videOrientation = ref("PORTRAIT");
const currentDisplayFile = ref("");

// const getRandomImage = () => {
//   const randomIndex = Math.floor(Math.random() * imageArray.length)

//   console.log(currentDisplayFile, 'sini', randomIndex, '---', imageArray[randomIndex])

//   return imageArray[randomIndex]
// }
const handleLoadImageAuth = async () => {
  try {
    const response: any = await $api("/admin/images/random-image", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      fileType.value = response.data?.type;
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

onMounted(() => {
  // currentDisplayFile.value = getRandomImage()
  handleLoadImageAuth();
});

const country = ref();
onMounted(async () => {
  const response: MasterCountry[] = await $api("/master/country", {
    method: "get",
  });
  country.value = response.map((item) => {
    return { name: item.name, cc: item.kode_telepon };
  });
  selectedPhoneCode.value = "62";
});

const { t } = useI18n();
</script>

<template>
  <HelpButton />
  <VRow
    no-gutters
    class="position-relative"
    style="min-block-size: calc(100vh - 48px)"
  >
    <VCol cols="12" md="6" class="d-flex align-center justify-center bg-white">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-3">
        <VCardText>
          <NuxtLink to="/">
            <div class="auth-logo app-logo">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </NuxtLink>
        </VCardText>
        <VCardText>
          <h4 class="text-h4 mb-1">
            {{ t("register.create") }}
            <span class="text-capitalize" color="#652672">{{
              themeConfig.app.title
            }}</span>
          </h4>
          <p class="mb-0">
            {{ t("register.welcome-create") }} {{ themeConfig.app.title }}
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12">
                <!-- Tipe Pengguna -->
                <VCol cols="12">
                  <b> {{ t("register.user-type") }}</b>

                  <VSelect
                    v-model="form.typeUser"
                    :items="fetchType"
                    item-title="name"
                    item-value="id"
                    :label="t('register.user-type')"
                    persistent-hint
                    return-object
                    single-line
                  />
                </VCol>

                <!-- nama -->
                <VCol cols="12">
                  <b> {{ t("register.name") }}</b>
                  <VTextField
                    v-model="form.name"
                    :placeholder="t('register.place-name')"
                    type="text"
                    @input="validateName"
                  />

                  <span v-if="errors.name" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.name }}
                  </span>
                </VCol>

                <!-- email -->
                <VCol cols="12">
                  <b> {{ t("register.email") }} </b>
                  <VTextField
                    v-model="form.email"
                    type="text"
                    :placeholder="t('register.place-email')"
                    @input="validateEmail"
                  />
                  <span v-if="errors.email" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.email }}
                  </span>
                </VCol>

                <!-- no Handphone -->
                <VCol cols="12">
                  <VRow no-gutters>
                    <VCol cols="12">
                      <b> {{ t("register.phone") }}</b>
                    </VCol>
                  </VRow>
                  <VRow no-gutters>
                    <VCol cols="4" style="padding-inline-end: 0">
                      <VSelect
                        rounded="s-xl e-0"
                        density="comfortable"
                        hide-details
                        hide-selected
                        variant="outlined"
                        :items="country"
                        item-value="cc"
                        item-title="name"
                        v-model="selectedPhoneCode"
                        style="border-radius: 10px 0 0 10px"
                      >
                        <!-- Custom item slot -->
                        <template v-slot:item="{ props, item }">
                          <VListItem
                            v-bind="props"
                            :title="item.raw.cc"
                            :subtitle="item.raw.name"
                            style="inline-size: 200px"
                          >
                          </VListItem>
                        </template>

                        <!-- Custom selection slot -->
                        <template v-slot:selection="{ item }">
                          <p style="margin-block-end: 0">
                            {{ `+${item.raw.cc}` }}
                          </p>
                        </template>
                      </VSelect>
                    </VCol>
                    <VCol cols="8" style="padding-inline-start: 0">
                      <VTextField
                        style="padding: 0"
                        rounded="s-0 e-xl"
                        v-model="form.noHandphone"
                        type="tel"
                        :maxlength="MAX_LENGTH_PHONE_NUMBER"
                        :placeholder="t('register.place-phone')"
                        @input="validateNomorHandphone"
                        @paste="handlePasteNomorTelepon"
                      >
                      </VTextField>
                    </VCol>
                  </VRow>

                  <span v-if="errors.noHandphone" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.noHandphone }}
                  </span>
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <b> {{ t("register.password") }}</b>
                  <VTextField
                    v-model="form.password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                    "
                    :placeholder="t('register.place-password')"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />

                  <span v-if="errors.password" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.password }}
                  </span>
                </VCol>

                <!-- password confrim -->
                <VCol cols="12">
                  <b>{{ t("register.confrim-pasword") }}</b>
                  <VTextField
                    v-model="form.passwordConfirm"
                    :type="isPasswordVisibleConfrim ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisibleConfrim
                        ? 'ri-eye-off-line'
                        : 'ri-eye-line'
                    "
                    :placeholder="t('register.place-password')"
                    @click:append-inner="
                      isPasswordVisibleConfrim = !isPasswordVisibleConfrim
                    "
                  />

                  <span v-if="errors.passwordConfirm" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.passwordConfirm }}
                  </span>
                </VCol>
              </VCol>

              <VCol cols="12">
                <VBtn block :disabled="isDisabledSubmit" type="submit">
                  {{ t("register.create-account") }}
                </VBtn>
              </VCol>
              <!-- disabled -->

              <!-- create account -->
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block">
                  {{ t("register.footer-register") }}</span
                >
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  :to="{ name: 'index' }"
                >
                  {{ t("register.footer-register-1") }}
                </NuxtLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardText>
          <VCol cols="12" class="text-body-1 text-center">
            <span class="d-inline-block">{{ t("register.connect") }}</span>
          </VCol>
          <VRow align="center" justify="center">
            <VCol cols="auto" class="d-flex align-center">
              <img :src="ossImage" width="100" height="48" />
            </VCol>
            <VCol cols="auto" class="d-flex align-center">
              <img :src="bseImage" width="100" height="48" />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" align="center" justify="center">
              Update: {{ getDate() }}
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
            muted
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
            muted
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

.bg-white {
  background-color: white;
}

.error-text {
  display: block;
  color: red;
  font-size: 0.875rem;
  margin-block-start: 4px;
}

.v-field--prepended {
  padding-inline-start: 0 !important;
}
</style>
