<script setup lang="ts">
import { themeConfig } from '@themeConfig'
import { useDisplay } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'

import { requiredValidator } from '#imports'
import { VNodeRenderer } from '@/@layouts/components/VNodeRenderer'
import bseImage from '@images/bse.png'
import NoImage from '@images/no-image.png'
import ossImage from '@images/oss.png'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginMaskDark from '@images/pages/auth-v2-login-mask-dark.png'
import authV2LoginMaskLight from '@images/pages/auth-v2-login-mask-light.png'

const { mdAndUp } = useDisplay()

const authThemeImg = useGenerateImageVariant(
  NoImage,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true,
)

const authThemeMask = useGenerateImageVariant(
  authV2LoginMaskLight,
  authV2LoginMaskDark,
)

definePageMeta({
  layout: 'blank',
  unauthenticatedOnly: true,
})

const isPasswordVisible = ref(false)
const isPasswordVisibleConfrim = ref(false)

const route = useRoute()

const ability = useAbility()

const errors = reactive({
  email: undefined,
  typeUser: undefined,
  name: undefined,
  noHandphone: undefined,
  password: undefined,
  passwordConfirm: undefined,
})

const validateName = () => {
  if (!form.value.name)
    errors.name = 'Wajib diisi'
  else
    errors.name = ''
}

const validateEmail = () => {
  const email = form.value.email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!email)
    errors.email = 'Wajib diisi'
  else if (email.includes('-'))
    errors.email = 'Format email tidak bisa menggunakan dash (-)'
  else if (!emailRegex.test(email))
    errors.email = 'Format email tidak valid'
  else
    errors.email = ''
}

// validateNomorhandphone
const validateNomorHandphone = async (event: Event) => {
  const target = event.target as HTMLInputElement

  target.value = target.value.replace(/\D/g, '')

  if (!form.value.noHandphone)
    errors.noHandphone = 'Wajib diisi'
  else
    errors.noHandphone = ''
}

const validatePassword = (value: string) => {
  // const password = form.value.password

  console.log(value.srcElement._value, 'ini value')
  console.log(form.value.passwordConfirm, 'ini value confirmasi')
  console.log(value.srcElement._value === form.value.passwordConfirm)

  if (!value.srcElement._value)
    errors.password = 'Wajib diisi'

  else if (value.srcElement._value.length < 8)
    errors.password = 'Password harus minimal 8 karakter'
  else if (value.srcElement._value !== form.value.passwordConfirm)
    errors.password = 'Kata sandi tidak sama!'

  // else if (!/[A-Z]/.test(password))
  //   errors.password = 'Password harus mengandung minimal satu huruf kapital'
  // else if (!/[a-z]/.test(password))
  //   errors.password = 'Password harus mengandung minimal satu huruf kecil'
  // else if (!/[0-9]/.test(password))
  //   errors.password = 'Password harus mengandung minimal satu angka'
  // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
  //   errors.password = 'Password harus mengandung minimal satu karakter spesial (!@#$%^&*)'
  else
    errors.password = ''
}

// validateConfrimPassword
const validateConfrimPassword = (value: string) => {
  // const password = form.value.password

  if (!value.srcElement._value)
    errors.passwordConfirm = 'Wajib diisi'

  else if (value.srcElement._value.length < 8)
    errors.passwordConfirm = 'Pastikan kata sandi minimal 8 karakter!'
  else if (value.srcElement._value !== form.value.password)
    errors.passwordConfirm = 'Kata sandi tidak sama!'

  // else if (!/[A-Z]/.test(password))
  //   errors.passwordConfirm = 'Password harus mengandung minimal satu huruf kapital'
  // else if (!/[a-z]/.test(password))
  //   errors.passwordConfirm = 'Password harus mengandung minimal satu huruf kecil'
  // else if (!/[0-9]/.test(password))
  //   errors.passwordConfirm = 'Password harus mengandung minimal satu angka'
  // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
  //   errors.passwordConfirm = 'Password harus mengandung minimal satu karakter spesial (!@#$%^&*)'
  else
    errors.passwordConfirm = ''
}

// const turnstile = ref();
const refVForm = ref<VForm>()

const form = ref({
  typeUser: null,
  name: null,
  email: null,
  noHandphone: null,
  password: null,
  passwordConfirm: null,
})

const router = useRouter()

const onSubmit = async () => {
  localStorage.setItem('formData', JSON.stringify(form.value))

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
      }

      const id = payload.role_id
      const email = payload.email

      // navigateTo({
      //   path: '/verifikasi-user',
      //   query: { id, email, payload: JSON.stringify(payload) },
      // })
      const payloadcheck = {
        email: form.value.email,
        phone_number: form.value.noHandphone,

      }

      try {
        const response = await $api('/auth/check-email-phone', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadcheck),
        })

        if (response.data) {
          if (response.data.phone_number_is_exist)
            errors.noHandphone = 'Nomor handphone sudah terdaftar, silahkan gunakan nomor lain!'
          if (response.data.email_is_exist)
            errors.email = 'Email sudah terdaftar, silahkan gunakan email lain!'
          if (!response.data.phone_number_is_exist && !response.data.email_is_exist) {
            navigateTo({
              path: '/verifikasi-user',
              query: { id, email, payload: JSON.stringify(payload) },
            })
          }
        }
        else {
          errors.noHandphone = '',
          errors.email = ''
        }
      }
      catch (error) {
        console.log(error, 'sini erorrr')
      }

      // try {
      //   const response = await $api("/auth/register", {
      //     method: "POST", // Mengatur metode menjadi POST
      //     headers: {
      //       "Content-Type": "application/json", // Mengatur tipe konten
      //     },
      //     body: JSON.stringify(payload), // Mengubah payload menjadi format JSON
      //   });

      //   // console.log("log", response);

      //   if (response.code === 2000) {
      //     // Cek apakah response berhasil
      //     const data = response.data;

      //     console.log("Akun berhasil dibuat:", data);

      //     // navigateTo({
      //     //   path: "/verifikasi-user"
      //     // });
      //     const id = data.user.id;
      //     const email = data.user.email;

      //     console.log("id : ", id);

      //     navigateTo({
      //       path: "/verifikasi-user",
      //       query: { id, email, payload },
      //     });

      //     // router.push({ name: 'verifikasi-user', params: { id: id } })
      //   } else if (response.code === 4001) {
      //     sendSnackbar(`${response.errors.list_error}`, "error");
      //   } else {
      //     sendSnackbar(
      //       "Gagal melakukan pembuatan akun, mohon periksa kembali kelengkapan data!",
      //       "error"
      //     );
      //   }
      // } catch (error) {
      //   console.error("Error saat membuat akun:", error);
      // }
    }
  })
}

const typeUserItem = ['Pelaku Usaha', 'Buisness Actor', 'Impoter']

// check  disableSubmit
const isDisabledSubmit = computed(() => {
  const email = form.value.email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return !(
    form.value.typeUser
    && form.value.name
    && form.value.email

    // && email.includes('-')
    // && !emailRegex.test(email)
    && form.value.noHandphone
    && form.value.password
    && form.value.passwordConfirm

  // && form.value.passwordConfirm === form.value.password
  // && form.value.passwordConfirm.length < 8
  // && form.value.password.length < 8
  )
})

// validasi
// const phoneValidator = (value: string) => {
//   const isValid = /^08\d{8,11}$/.test(value);

//   return (
//     isValid ||
//     'Nomor Handphone harus dimulai dengan "08" dan berjumlah 10-13 digit angka'
//   );
// };

const emailValidator = (value: string) => {
  if (value.includes('-'))
    return 'Format email tidak bisa menggunakan dash (-)'

  const isValid
    = /^(?!.*[.]{2})[a-z0-9.]+@[a-z]+.(com|co.id|go.id|id|net)$/.test(value)

  return isValid || ' Format Email digunakan salah'
}

const requiredValidator = (value: string) => !!value || 'Wajib diisi'

const requiredSamePassword = (value: string) =>
  value === form.value.password || 'Kata sandi tidak sama!'

const requiredMinLength = (value: string) =>
  value.length >= 8 || 'Pastikan kata sandi minimal 8 karakter!'

const requiredValidasinoHP = (value: string) =>
  value !== '08123456789'
  || 'Nomor handphone sudah terdaftar, gunakan nomor lain!'

const requiredValidasiEmail = (value: string) =>
  value !== 'hallal@gmail.com'
  || 'Email sudah terdaftar,silahkan gunakan email lain!'

// Gagal melakukan pembuatan akun, mohon periksa kembali kelengkapan data!
// jika error pas di input maka tapil diatas
const { sendSnackbar } = useSnackbar()

onMounted(async () => {
  try {
    const response: any = await $api('/auth/type-role', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp: any) => {
      console.log('fetch type = ', resp)
      fetchType.value = resp?.filter((val: any) => val.name !== '') // Menyimpan data ke dalam ref
    })
  }
  catch (error) {
    console.error('Gagal mengambil data:', error)
  }
})

onMounted(() => {
  const savedData = localStorage.getItem('formData')
  if (savedData)
    form.value = JSON.parse(savedData)
})

const fetchType = ref([])
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center bg-white"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-5 pa-lg-7"
      >
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
            <span
              class="text-capitalize"
              color="#652672"
            >{{
              themeConfig.app.title
            }}</span>
          </h4>
          <p class="mb-0">
            Silahkan buat akun menggunakan fitur web {{ themeConfig.app.title }}
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol
                cols="12"
                style="max-block-size: 45svh; overflow-y: auto;"
              >
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

                  <span
                    v-if="errors.name"
                    class="error-text"
                  >
                    <VIcon
                      icon="mdi-alert-circle"
                      color="error"
                      size="small"
                    />  {{ errors.name }}
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
                  <span
                    v-if="errors.email"
                    class="error-text"
                  >
                    <VIcon
                      icon="mdi-alert-circle"
                      color="error"
                      size="small"
                    />  {{ errors.email }}
                  </span>
                </VCol>

                <!-- :error-messages="errors.email" -->
                <!--
                  :rules="[
                  requiredValidator,
                  emailValidator,
                  requiredValidasiEmail,
                  ]"
                -->

                <!-- no Handphone -->
                <VCol cols="12">
                  <b> Nomor Handphone</b>
                  <VTextField
                    v-model="form.noHandphone"
                    type="tel"
                    maxlength="16"
                    placeholder="Masukan Nomor Handphone"
                    @input="validateNomorHandphone"
                  />
                  <span
                    v-if="errors.noHandphone"
                    class="error-text"
                  >
                    <VIcon
                      icon="mdi-alert-circle"
                      color="error"
                      size="small"
                    />  {{ errors.noHandphone }}
                  </span>
                </VCol>
                <!-- :rules="[requiredValidator, requiredValidasinoHP]" -->
                <!--
                  :error-messages="errors.noHandphone"
                  @input="onlyAcceptNumber"
                -->

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
                    @input="validatePassword"
                  />
                  <!-- :error-messages="errors.password" -->
                  <!-- :rules="[requiredValidator, requiredMinLength]" -->
                  <span
                    v-if="errors.password"
                    class="error-text"
                  >
                    <VIcon
                      icon="mdi-alert-circle"
                      color="error"
                      size="small"
                    />  {{ errors.password }}
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
                    @input="validateConfrimPassword"
                  />
                  <!-- :error-messages="errors.password" -->
                  <!--
                    :rules="[
                    requiredValidator,
                    requiredMinLength,
                    requiredSamePassword,
                    ]"
                  -->
                  <span
                    v-if="errors.passwordConfirm"
                    class="error-text"
                  >
                    <VIcon
                      icon="mdi-alert-circle"
                      color="error"
                      size="small"
                    />  {{ errors.passwordConfirm }}
                  </span>
                </VCol>
              </VCol>

              <VCol cols="12">
                <VBtn
                  block
                  :disabled="isDisabledSubmit"
                  type="submit"
                >
                  Buat Akun
                </VBtn>
              </VCol>
              <!-- disabled -->

              <!-- create account -->
              <VCol
                cols="12"
                class="text-body-1 text-center"
              >
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
          <VCol
            cols="12"
            class="text-body-1 text-center"
          >
            <span class="d-inline-block">Terhubung Ke</span>
          </VCol>
          <VRow
            align="center"
            justify="center"
          >
            <VCol
              cols="12"
              md="auto"
              class="d-flex align-center"
            >
              <VImg
                :src="ossImage"
                width="100"
                height="48"
              />
            </VCol>
            <VCol
              cols="12"
              md="auto"
              class="d-flex align-center"
            >
              <VImg
                :src="bseImage"
                width="100"
                height="48"
              />
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

.error-text {
  display: block;
  color: red;
  font-size: 0.875rem;
  margin-block-start: 4px;
}
</style>
