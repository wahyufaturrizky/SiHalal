<script setup lang="ts">
import { themeConfig } from "@themeConfig";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components/VForm";

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
      };

      const payloadcheck = {
        email: form.value.email,
        phone_number: form.value.noHandphone,
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
      fetchType.value = resp?.filter((val: any) => val.name !== ""); // Menyimpan data ke dalam ref
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

const currentImage = ref("");

// const getRandomImage = () => {
//   const randomIndex = Math.floor(Math.random() * imageArray.length)

//   console.log(currentImage, 'sini', randomIndex, '---', imageArray[randomIndex])

//   return imageArray[randomIndex]
// }
const handleLoadImageAuth = async () => {
  try {
    const response: any = await $api("/admin/images/random-image", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      handleLoadImageFile(response.data.file_name);
    }
  } catch (error) {
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

// onMounted(() => {
//   // currentImage.value = getRandomImage()
//   handleLoadImageAuth();
// });
useAsyncData(
  "random-regis-image",
  async () => {
    await handleLoadImageAuth();
    return true;
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <HelpButton />
  <VRow no-gutters class="auth-wrapper">
    <VCol cols="12" md="6" class="d-flex align-center justify-center bg-white">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <VCardText>
          <NuxtLink to="/">
            <div class="auth-logo app-logo">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </NuxtLink>
        </VCardText>
        <VCardText>
          <h4 class="text-h4 mb-1">
            Buat Akun
            <span class="text-capitalize" color="#652672">{{
              themeConfig.app.title
            }}</span>
          </h4>
          <p class="mb-0">
            Silahkan buat akun menggunakan fitur web {{ themeConfig.app.title }}
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12" style="max-block-size: 45svh; overflow-y: auto">
                <!-- Tipe Pengguna -->
                <VCol cols="12">
                  <b> Tipe Pengguna</b>

                  <VSelect
                    v-model="form.typeUser"
                    :items="fetchType"
                    item-title="name"
                    item-value="id"
                    label="Pilih tipe pengguna"
                    persistent-hint
                    return-object
                    single-line
                  />
                </VCol>

                <!-- nama -->
                <VCol cols="12">
                  <b> Nama</b>
                  <VTextField
                    v-model="form.name"
                    placeholder="Masukan Nama"
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
                  <b> Email </b>
                  <VTextField
                    v-model="form.email"
                    type="text"
                    placeholder="Masukan Email"
                    @input="validateEmail"
                  />
                  <span v-if="errors.email" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.email }}
                  </span>
                </VCol>

                <!-- no Handphone -->
                <VCol cols="12">
                  <b> Nomor Handphone</b>
                  <VTextField
                    v-model="form.noHandphone"
                    type="tel"
                    :maxlength="MAX_LENGTH_PHONE_NUMBER"
                    placeholder="Masukan Nomor Handphone"
                    @input="validateNomorHandphone"
                    @paste="handlePasteNomorTelepon"
                  />
                  <span v-if="errors.noHandphone" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.noHandphone }}
                  </span>
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <b> Kata Sandi</b>
                  <VTextField
                    v-model="form.password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                    "
                    placeholder="Masukan kata sandi"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />

                  <span v-if="errors.password" class="error-text">
                    <VIcon icon="mdi-alert-circle" color="error" size="small" />
                    {{ errors.password }}
                  </span>
                </VCol>

                <!-- password confrim -->
                <VCol cols="12">
                  <b>Konfirmasi Kata Sandi</b>
                  <VTextField
                    v-model="form.passwordConfirm"
                    :type="isPasswordVisibleConfrim ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisibleConfrim
                        ? 'ri-eye-off-line'
                        : 'ri-eye-line'
                    "
                    placeholder="Masukan konfirmasi kata sandi"
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
                  Buat Akun
                </VBtn>
              </VCol>
              <!-- disabled -->

              <!-- create account -->
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block"> Sudah punya akun ?</span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  :to="{ name: 'index' }"
                >
                  Masuk di sini
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
    <VCol v-if="mdAndUp" md="6" class="d-flex align-center justify-center">
      <VImg
        :src="currentImage"
        eager
        width="100%"
        height="100%"
        rounded="xl"
        class="responsive-image"
      />
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

.responsive-image {
  block-size: 100%;
  inline-size: 100%;
  object-fit: fill;
  pointer-events: none !important;
}
.v-img__img--contain {
  object-fit: fill;
}
</style>
