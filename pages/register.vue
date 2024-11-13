<script setup lang="ts">
import { themeConfig } from "@themeConfig";
import { useDisplay } from "vuetify";
import { VForm } from "vuetify/components/VForm";

import { requiredValidator } from "#imports";
import { VNodeRenderer } from "@/@layouts/components/VNodeRenderer";
import bseImage from "@images/bse.png";
import NoImage from "@images/no-image.png";
import ossImage from "@images/oss.png";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";

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

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  typeUser: undefined,
  name: undefined,
  noHandphone: undefined,
  password: undefined,
  passwordConfirm: undefined,
});

// const turnstile = ref();
const refVForm = ref<VForm>();

const form = ref({
  typeUser: null,
  name: null,
  email: null,
  noHandphone: null,
  password: null,
  passwordConfirm: null,
});

const router = useRouter();

const onSubmit = async () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      // Definisikan payload
      // const payload = {

      //   typeUser: form.value.typeUser,
      //   name: form.value.name,
      //   email: form.value.email,
      //   noHandphone: form.value.noHandphone,
      //   password: form.value.password,
      //   passwordConfirm: form.value.passwordConfirm,
      // }

      const payload = {
        role_id: form.value.typeUser.id,
        name: form.value.name,
        email: form.value.email,
        phone_number: form.value.noHandphone,
        password: form.value.password,
        confirm_password: form.value.passwordConfirm,
      };

      try {
        const response = await $api("/auth/register", {
          method: "POST", // Mengatur metode menjadi POST
          headers: {
            "Content-Type": "application/json", // Mengatur tipe konten
          },
          body: JSON.stringify(payload), // Mengubah payload menjadi format JSON
        });

        if (response.code === 2000) {
          // Cek apakah response berhasil
          const data = response.data;

          console.log("Akun berhasil dibuat:", data);

          // navigateTo({
          //   path: "/verifikasi-user"
          // });
          const id = data.user.id;
          const email = data.user.email;

          console.log("id : ", id);

          navigateTo({
            path: "/verifikasi-user",
            query: { id, email },
          });

          // router.push({ name: 'verifikasi-user', params: { id: id } })
        }
      } catch (error) {
        console.error("Error saat membuat akun:", error);
      }
    }
  });
};

const typeUserItem = ["Pelaku Usaha", "Buisness Actor", "Impoter"];

// check  disableSubmit
const isDisabledSubmit = computed(() => {
  return !(
    form.value.typeUser &&
    form.value.name &&
    form.value.email &&
    form.value.noHandphone &&
    form.value.password &&
    form.value.passwordConfirm
  );
});

// validasi
const phoneValidator = (value: string) => {
  const isValid = /^08\d{8,11}$/.test(value);

  return (
    isValid ||
    'Nomor Handphone harus dimulai dengan "08" dan berjumlah 10-13 digit angka'
  );
};

const emailValidator = (value: string) => {
  const isValid =
    /^(?!.*[.]{2})[a-z0-9.]+@[a-z]+.(com|co.id|go.id|id|net)$/.test(value);

  return isValid || "Format  Email digunakan salah";
};

const requiredValidator = (value: string) => !!value || "Wajib diisi";

const requiredSamePassword = (value) =>
  value === form.value.password || "Kata sandi tidak sama!";

const requiredMinLength = (value) =>
  value.length >= 8 || "Pastikan kata sandi minimal 8 karakter!";

const requiredValidasinoHP = (value) =>
  value !== "08123456789" ||
  "Nomor handphone sudah terdaftar, gunakan nomor lain!";

const requiredValidasiEmail = (value) =>
  value !== "hallal@gmail.com" ||
  "Email sudah terdaftar,silahkan gunakan email lain!";

// Gagal melakukan pembuatan akun, mohon periksa kembali kelengkapan data!
// jika error pas di input maka tapil diatas
const { sendSnackbar } = useSnackbar();

// const global = () => {
//   sendSnackbar(
//     "Gagal melakukan pembuatan akun, mohon periksa kembali kelengkapan data!",
//     "error"
//   );
// };
onMounted(async () => {
  try {
    const response = await $api("/auth/type-role", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchType.value = response.data; // Menyimpan data ke dalam ref
    console.log("fetch", fetchType.value, "fetch");
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
});

const items = ref([
  { id: "7913d132-ef22-4d66-bd11-7ac830e1e3de", name: "Pelaku Usaha" },
  { id: "dadb053e-613a-4ae0-9c52-1e955c4374f0", name: "Verifikator HLN" },
  { id: "ae839e9d-0078-4a15-9223-9bca9dee630f", name: "Keuangan" },

  // { id: '7913d132-ef22-4d66-bd11-7ac830e1e3d1', name: '' },
]);
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
              <!-- Tipe Pengguna -->
              <VCol cols="12">
                <b> Tipe Pengguna</b>

                <VSelect
                  v-model="form.typeUser"
                  :items="items"
                  :rules="[requiredValidator]"
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
                  :rules="[requiredValidator]"
                  placeholder="Masukan Nama"
                  type="text"
                  :error-messages="errors.name"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <b> Email </b>
                <VTextField
                  v-model="form.email"
                  :rules="[
                    requiredValidator,
                    emailValidator,
                    requiredValidasiEmail,
                  ]"
                  type="text"
                  :error-messages="errors.email"
                  placeholder="Masukan Email"
                />
              </VCol>

              <!-- no Handphone -->
              <VCol cols="12">
                <b> Nomor Handphone</b>
                <VTextField
                  v-model="form.noHandphone"
                  :rules="[
                    requiredValidator,
                    phoneValidator,
                    requiredValidasinoHP,
                  ]"
                  type="tel"
                  maxlength="13"
                  placeholder="Masukan Nomor Handphone"
                  :error-messages="errors.noHandphone"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <b> Kata Sandi</b>
                <VTextField
                  v-model="form.password"
                  :rules="[requiredValidator, requiredMinLength]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                  "
                  placeholder="Masukan kata sandi"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- password confrim -->
              <VCol cols="12">
                <b>Konfirmasi Kata Sandi</b>
                <VTextField
                  v-model="form.passwordConfirm"
                  :rules="[
                    requiredValidator,
                    requiredMinLength,
                    requiredSamePassword,
                  ]"
                  :type="isPasswordVisibleConfrim ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisibleConfrim ? 'ri-eye-off-line' : 'ri-eye-line'
                  "
                  placeholder="Masukan konfirmasi kata sandi"
                  @click:append-inner="
                    isPasswordVisibleConfrim = !isPasswordVisibleConfrim
                  "
                />
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

              <!--
                <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
                </VCol>
              -->

              <!-- auth providers -->
              <!--
                <VCol cols="12" class="text-center">
                <AuthProvider />
                </VCol>
              -->
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
</style>
