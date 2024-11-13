<script setup lang="ts">
import { useDisplay } from 'vuetify'
import type { VForm } from 'vuetify/components/VForm'
import { themeConfig } from '@themeConfig'

import NoImage from '@images/no-image.png'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'

const { signIn, data: sessionData } = useAuth()
const { mdAndUp } = useDisplay()

const authThemeImg = useGenerateImageVariant(
  NoImage,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true,
)

// const authThemeMask = useGenerateImageVariant(
//   authV2LoginMaskLight,
//   authV2LoginMaskDark,
// )

definePageMeta({
  layout: 'blank',
  unauthenticatedOnly: true,
})

const isPasswordVisible = ref(false)

const route = useRoute()

const ability = useAbility()

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  noHandphone: undefined,
})

// const turnstile = ref();
const refVForm = ref<VForm>()

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
})

// validasi

const isDisabledEmail = ref(false)
const isDisabledNoHp = ref(false)

const requiredValidatorEmail = (value: string) => {
  isDisabledNoHp.value = false

  return !!value || 'Wajib diisi Email'
}

const requiredValidatorNoHandphone = (value: string) => {
  isDisabledEmail.value = false

  return !!value || 'Wajib diisi Nomor Handphone'
}

const currentTab = ref(0)

const emailValidator = (value: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  isDisabledNoHp.value = true

  return isValid || 'Masukkan format email benar'
}

const phoneValidator = (value: string) => {
  const isValid = /^08\d{8,11}$/.test(value)

  isDisabledEmail.value = true

  return (
    isValid
    || 'Nomor Handphone harus dimulai dengan "08" dan berjumlah 10-13 digit angka'
  )
}

function onlyNumber(event) {
  // Hanya angka yang diperbolehkan
  form.value.noHandphone = event.target.value.replace(/\D/g, '')
}

const isDisabledSubmitEmail = computed(() => {
  return !form.value.email || emailValidator(form.value.email) !== true
})

const isDisabledSubmitNoHandphone = computed(() => {
  return (
    !form.value.noHandphone || phoneValidator(form.value.noHandphone) !== true
  )
})

const isOtpEmail = ref(false)
const isOtpNoHandphone = ref(false)

const isSucess = ref (false)

const onSubmitEmail = () => {
  // try {
  // }
  // catch (error) {
  //   console.log(error, 'ini error')
  // }
  isOtpEmail.value = true
}

const kodeOtpEmail = ref('')
const kodeOtpNoHandphone = ref('')

const onSumbitKodeEmail = () => {
  console.log(kodeOtpEmail, 'otp email')
  isSucess.value = true
}

const isDisabledKodeEmail = computed(() => {
  return !kodeOtpEmail.value || kodeOtpEmail.value.length !== 6
})

const isDisabledKodeNomorHandphone = computed(() => {
  return !kodeOtpNoHandphone.value || kodeOtpNoHandphone.value.length !== 6
})

const cooldown = ref(60)

const startCooldown = () => {
  cooldown.value = 60

  const interval = setInterval(() => {
    if (cooldown.value > 0)
      cooldown.value--
    else clearInterval(interval)
  }, 1000)
}

const { sendSnackbar } = useSnackbar()

const resendCode = () => {
  sendSnackbar('Kode Verifikasi Berhasil Dikirim Ulang', 'success')

  // notif();
  startCooldown()

  // Tambahkan logic pengiriman ulang kode di sini
}

onMounted(() => {
  startCooldown()
})

const onSubmitNomerHandphone = () => {
  isOtpNoHandphone.value = true
}

const onSubmitKodeNomerHandphone = () => {
  isSucess.value = true

  // sendSnackbar('Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali', 'error')
}
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
          <h3 class="text-h4 mb-1">
            Akun Kamu Berhasil Terdaftar!
          </h3>
          <p class="mb-0">
            Terima kasih telah membuat akun di website
            {{ themeConfig.app.title }}, untuk proses selanjutnya verfikasi
            menggunakan email atua nomor handphone yang telah terdaftar
          </p>
        </VCardText>

        <VCardText>
          <VTabs
            v-model="currentTab"
            grow
          >
            <VTab :disabled="isDisabledEmail">
              Email
            </VTab>
            <VTab :disabled="isDisabledNoHp">
              NomorHandphone
            </VTab>
          </VTabs>

          <VWindow
            v-model="currentTab"
            class="mt-5"
          >
            <VWindowItem key="1">
              <VCol cols="12">
                <!-- Verifikasi Email  -->
                <p
                  v-if="!isSucess"
                  class="verifikasi-title text-email"
                >
                  Verifikasi dengan Email
                </p>
                <div v-if="!isOtpEmail && !isSucess">
                  <p>klik button untuk mengirim kode verifikasi</p>
                  <VTextField
                    v-model="form.email"
                    class="mb-5"
                    :rules="[requiredValidatorEmail, emailValidator]"
                    type="text"
                    :error-messages="errors.email"
                    placeholder="Masukan Email"
                  />

                  <VBtn
                    block
                    :disabled="isDisabledSubmitEmail"
                    type="submit"
                    @click="onSubmitEmail"
                  >
                    Kirim Kode Verifikasi
                  </VBtn>
                  <div class="back-link">
                    <a
                      href="/register"
                      class="back-icon"
                    >
                      ← Kembali ke Halaman Buat Akun
                    </a>
                  </div>
                </div>
                <!-- verifikasi end email -->

                <!-- Verfikasi kode  Email -->
                <div v-if="isOtpEmail && !isSucess">
                  <p>Kami telah mengirimkan kode verifikasi ke email</p>
                  <b>"{{ form.email }}"</b>
                  <VOtpInput
                    v-model="kodeOtpEmail"
                    class="mb-2"
                    variant="solo-filled"
                  />
                  <p>
                    Belum terima kode?
                    <span v-if="cooldown > 0">Kirim Ulang dalam ({{ cooldown }}) detik</span>
                    <span v-else>
                      <a @click="resendCode">Kirim Ulang</a>
                    </span>
                  </p>
                  <!-- <OtpVerification /> -->
                  <VBtn
                    block
                    type="submit"
                    :disabled="isDisabledKodeEmail"
                    @click="onSumbitKodeEmail"
                  >
                    Verifikasi Kode
                  </VBtn>
                  <div class="back-link">
                    <a
                      href="/register"
                      class="back-icon"
                    >
                      ← Kembali ke Halaman Buat Akun
                    </a>
                  </div>
                </div>
                <!-- end verifikasi   email -->

                <!-- Verfikasi  Sucess kode  Email -->
                <div v-if="isSucess">
                  <VRow>
                    <VCol>
                      <h2 class="text-success">
                        <VIcon
                          color="green"
                          size="30"
                        >
                          mdi-check-circle
                        </VIcon>
                        Sukses!
                      </h2>
                      <p>Verifikasi dengan email telah berhasil dilakukan</p>
                    </VCol>
                  </VRow>
                  <VRow class="mt-4">
                    <VCol>
                      <VBtn
                        outlined
                        style="inline-size: 100%;"
                        class="text-none text-body-1 font-weight-medium custom-btn"
                        href="/register"
                      >
                        Pergi ke Halaman Login
                        <VIcon end>
                          mdi-arrow-right
                        </VIcon>
                      </VBtn>
                    </VCol>
                  </VRow>
                </div>
                <!-- Verfikasi end  Sucess kode  Email -->
              </VCol>
            </VWindowItem>
            <VWindowItem key="2">
              <p class="verifikasi-title text-nomor-handphone">
                Verifikasi dengan Nomor Handphone
              </p>
              <!-- verifikasi  nomer Handphone  -->
              <div v-if="!isOtpNoHandphone && !isSucess">
                <p>klik button untuk mengirim kode verifikasi</p>
                <VTextField
                  v-model="form.noHandphone"
                  class="mb-5"
                  :rules="[requiredValidatorNoHandphone, phoneValidator]"
                  type="text"
                  maxlength="13"
                  :error-messages="errors.noHandphone"
                  placeholder="Masukan Nomor Handphone"
                  @input="onlyNumber"
                />

                <VBtn
                  v-model="kodeOtpNoHandphone"
                  block
                  :disabled="isDisabledSubmitNoHandphone"
                  type="submit"
                  @click="onSubmitNomerHandphone"
                >
                  Kirim Kode Verifikasi
                </VBtn>
                <div class="back-link">
                  <a
                    href="/register"
                    class="back-icon"
                  >
                    ← Kembali ke Halaman Buat Akun
                  </a>
                </div>
              </div>
              <!-- end verfikasi noHandphoen -->

              <!-- OTP noHandphone -->
              <div v-if="isOtpNoHandphone && !isSucess">
                <p>Kami telah mengirimkan kode verifikasi ke nomor handphone</p>
                <b>"{{ form.noHandphone }}"</b>
                <VOtpInput
                  v-model="kodeOtpNoHandphone"
                  class="mb-2"
                  variant="solo-filled"
                />
                <p>
                  Belum terima kode?
                  <span v-if="cooldown > 0">Kirim Ulang dalam ({{ cooldown }}) detik</span>
                  <span v-else>
                    <a @click="resendCode">Kirim Ulang</a>
                  </span>
                </p>
                <VBtn
                  block
                  type="submit"
                  :disabled="isDisabledKodeNomorHandphone"
                  @click="onSubmitKodeNomerHandphone"
                >
                  Verifikasi Kode
                </VBtn>
                <div class="back-link">
                  <a
                    href="/register"
                    class="back-icon"
                  >
                    ← Kembali ke Halaman Buat Akun
                  </a>
                </div>
              </div>
              <!-- OTP end nomerHandphone  -->

              <!-- Verfikasi  Sucess kode  Email -->
              <div v-if="isSucess">
                <VRow>
                  <VCol>
                    <h2 class="text-success">
                      <VIcon
                        color="green"
                        size="30"
                      >
                        mdi-check-circle
                      </VIcon>
                      Sukses!
                    </h2>
                    <p>Verifikasi dengan Nomor Handphone telah berhasil dilakukan</p>
                  </VCol>
                </VRow>
                <VRow class="mt-4">
                  <VCol>
                    <VBtn
                      outlined
                      style="inline-size: 100%;"
                      class="text-none text-body-1 font-weight-medium custom-btn"
                      href="/register"
                    >
                      Pergi ke Halaman Login
                      <VIcon end>
                        mdi-arrow-right
                      </VIcon>
                    </VBtn>
                  </VCol>
                </VRow>
              </div>
              <!-- Verfikasi end  Sucess kode  Email -->
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

.text-email {
  size: 18;
}

.text-text-nomor-handphone {
  size: 18;
}

.bg-white {
  background-color: white;
}

.back-icon {
  align-items: center;
  justify-content: center;
  margin-block-start: 24px;
  margin-inline-end: 5px;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7c4d9e; /* Warna teks */
  font-size: 14px;
  text-decoration: none;
}

.text-success {
  color: #4caf50;
}

.custom-btn {
  border: 2px solid #6b2b77 !important;
  border-radius: 8px;
  background-color: #fff !important;
  block-size: 44px;
  color: #6b2b77 !important;
}

.custom-btn:hover {
  border: 2px solid #fff !important;
  background-color: #fff !important;
  color: #fff !important;
  opacity: 0.9;
}

.v-btn {
  text-transform: none !important;
}
</style>
