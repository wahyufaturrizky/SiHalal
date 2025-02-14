<script setup lang="ts">
import NoImage from "@images/no-image.png";
import { themeConfig } from "@themeConfig";
import { useDisplay } from "vuetify";
import type { VForm } from "vuetify/components/VForm";

import HelpButton from "@/views/pages/HelpButton.vue";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";

const { sendSnackbar } = useSnackbar();

const userVerificationStore = useUserVerificationStore();

const { signIn, data: sessionData } = useAuth();
const { mdAndUp } = useDisplay();

const authThemeImg = useGenerateImageVariant(
  NoImage,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);

// const authThemeMask = useGenerateImageVariant(
//   authV2LoginMaskLight,
//   authV2LoginMaskDark,
// )

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
  email: userVerificationStore.email,
  noHandphone: userVerificationStore.phone_number,
});

// validasi

const isDisabledEmail = ref(false);
const isDisabledNoHp = ref(false);

const currentTab = ref(0);

// const isDisabledSubmitEmail = computed(() => {
//   return !form.value.email || emailValidator(form.value.email) !== true
// })

const phoneValidator = (value: string) => {
  const isValid = /^08\d{8,15}$/.test(value);

  return (
    isValid ||
    'Nomor Handphone harus dimulai dengan "08" dan berjumlah 10-13 digit angka'
  );
};

// const isDisabledSubmitNoHandphone = computed(() => {
//   return (
//     !form.value.noHandphone || phoneValidator(form.value.noHandphone) !== true
//   )
// })

const isOtpEmail = ref(false);
const isOtpNoHandphone = ref(false);

const isSucess = ref(false);

const onSubmitEmail = async () => {
  isDisabledNoHp.value = true;

  const payload = {
    channel: "email",
    destination: userVerificationStore.email,
  };

  console.log("ON SUBMIT EMAIL PAYLOAD : ", payload);

  // create
  try {
    const response = await $api("/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE SEND OTP EMAIL : ", response);

    if (response.code === 2000) {
      // Cek apakah response berhasil
      const data = response.data;

      isOtpEmail.value = true;

      console.log("Akun berhasil dibuat:", data);

      // router.push({ name: 'verifikasi-user', params: { id: id } })
    } else if (response.code === 4001) {
      sendSnackbar(`${response.errors.list_error}`, "error");
    } else if (response.code === 4000) {
      sendSnackbar(
        "Terdapat kesalahan memasukkan OTP, silahkan coba lagi kembali",
        "error"
      );
    } else {
      sendSnackbar(
        "Gagal melakukan pembuatan akun, mohon periksa kembali kelengkapan data!",
        "error"
      );
    }
  } catch (error) {
    sendSnackbar(
      "Gagal melakukan pembuatan akun, mohon periksa kembali kelengkapan data!",
      "error"
    );
  }

  // send otp
  // const payload = {
  //   channel: 'email',
  //   destination: form.value.email,
  // }

  // try {
  //   const response = await $api('/auth/send-otp', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(payload),
  //   })

  //   console.log('RESPONSE SEND OTP : ', response)
  //   if (response.code === 2000)
  //     isOtpEmail.value = true
  // }
  // catch (error) {
  //   console.log(error, 'ini error')
  // }
};

const kodeOtpEmail = ref("");
const kodeOtpNoHandphone = ref("");

const onSubmitKodeEmail = async () => {
  console.log("SUBMIT KODE EMAIL ");

  const payload = {
    user_id: userVerificationStore.id,
    otp: kodeOtpEmail.value,
  };

  console.log("PAYLOAD SUBMIT OTP ", payload);

  try {
    const response: any = await $api("/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE VERIFY OTP EMAIL : ", response);

    // console.log(kodeOtpEmail, "otp email");
    if (response?.code === 2000) {
      isSucess.value = true;
    } else if (response?.code === 4000) {
      // isSucess.value = true

      localStorage.removeItem("formData");
      sendSnackbar(
        "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali",
        "error"
      );
    } else if (response?.code === 500) {
      // isSucess.value = true

      localStorage.removeItem("formData");
      console.log("error 500");

      sendSnackbar(
        "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
        "error"
      );
    } else {
      sendSnackbar(
        "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
        "error"
      );
      isSucess.value = false;
    }
  } catch (error) {
    sendSnackbar(
      "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
      "error"
    );
    console.log("ADA ERROR NIH BANG ", error);
  }
};

const isDisabledKodeEmail = computed(() => {
  return !kodeOtpEmail.value || kodeOtpEmail.value.length !== 6;
});

const isDisabledKodeNomorHandphone = computed(() => {
  return !kodeOtpNoHandphone.value || kodeOtpNoHandphone.value.length !== 6;
});

const cooldown = ref(60);

const startCooldown = () => {
  cooldown.value = 60;

  const interval = setInterval(() => {
    if (cooldown.value > 0) cooldown.value--;
    else clearInterval(interval);
  }, 1000);
};

const resendCode = async () => {
  sendSnackbar("Kode Verifikasi Berhasil Dikirim Ulang", "success");

  const payload = {
    channel: currentTab.value === 0 ? "email" : "phone_number",
    destination:
      currentTab.value === 0 ? form.value.email : form.value.noHandphone,
  };

  console.log("RESEND CODE  PAYLOAD : ", payload);

  startCooldown();

  try {
    const response = await $api("/auth/send-otp", {
      method: "POST", // Mengatur metode menjadi POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE SEND OTP dari RESEND : ", response);
  } catch (error) {
    console.log(error, "ini error");
  }

  // notif();

  // Tambahkan logic pengiriman ulang kode di sini
};

onMounted(() => {
  startCooldown();
});

const onSubmitNomerHandphone = async () => {
  isOtpNoHandphone.value = true;
  isDisabledEmail.value = true;

  const payload = {
    channel: "phone_number",
    destination: userVerificationStore.phone_number,
  };

  console.log("ON SUBMIT NOMOR HP PAYLOAD : ", payload);

  try {
    const response = await $api("/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE SEND OTP PHONE NUMBER : ", response);

    if (response.code === 2000) {
      // Cek apakah response berhasil
      const data = response.data;

      isOtpNoHandphone.value = true;

      console.log("Akun berhasil dibuat:", data);

      // router.push({ name: 'verifikasi-user', params: { id: id } })
    } else if (response.code === 4001) {
      sendSnackbar(`${response.errors.list_error}`, "error");
    } else {
      sendSnackbar(
        "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
        "error"
      );
    }
  } catch (error) {
    sendSnackbar(
      "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
      "error"
    );
    console.error("Error saat membuat akun:", error);
  }

  // disini payload route
};

const onSubmitKodeNomerHandphone = async () => {
  console.log("VERIFY OTP PHONE NUMBER");

  // isSucess.value = true

  const payload = {
    user_id: userVerificationStore.id,
    otp: kodeOtpNoHandphone.value,
  };

  console.log("ON SUBMIT KODE NOMOR HP PAYLOAD : ", payload);

  try {
    const response: any = await $api("/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE VERIFY OTP PHONE NUMBER : ", response);

    // console.log(kodeOtpEmail, "otp email");
    if (response?.code === 2000) {
      localStorage.removeItem("formData");
      isSucess.value = true;
    } else if (response?.code === 4000) {
      localStorage.removeItem("formData");
      sendSnackbar(
        "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali",
        "error"
      );
    } else if (response?.code === 500) {
      localStorage.removeItem("formData");
      console.log("error 500");

      sendSnackbar(
        "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
        "error"
      );
    } else {
      sendSnackbar(
        "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
        "error"
      );
      isSucess.value = false;
    }
  } catch (error) {
    sendSnackbar(
      "Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali!",
      "error"
    );
    console.log("ADA ERROR NIH BANG ", error);
  }

  // sendSnackbar('Terdapat kesalahan memasukan OTP, silahkan coba lagi kembali', 'error')
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
//   const randomIndex = Math.floor(Math.random() * imageArray.length);

//   console.log(
//     currentDisplayFile,
//     "sini",
//     randomIndex,
//     "---",
//     imageArray[randomIndex]
//   );

//   return imageArray[randomIndex];
// };
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

onMounted(() => {
  handleLoadImageAuth();
});
</script>

<template>
  <HelpButton />
  <VRow
    no-gutters
    class="position-relative"
    style="min-height: calc(100vh - 48px)"
  >
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-center bg-white"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7">
        <VCardText>
          <h3 class="text-h4 mb-1">Akun Kamu Berhasil Terdaftar!</h3>
          <p class="mb-0">
            Terima kasih telah membuat akun di website
            {{ themeConfig.app.title }}, untuk proses selanjutnya verfikasi
            menggunakan email atua nomor handphone yang telah terdaftar
          </p>
        </VCardText>

        <VCardText>
          <VTabs v-model="currentTab" grow>
            <VTab :disabled="isDisabledEmail"> Email </VTab>
            <VTab :disabled="isDisabledNoHp"> NomorHandphone </VTab>
          </VTabs>

          <VWindow v-model="currentTab" class="mt-5">
            <VWindowItem key="1">
              <VCol cols="12">
                <!-- Verifikasi Email  -->
                <p v-if="!isSucess" class="verifikasi-title text-email">
                  Verifikasi dengan Email
                </p>
                <div v-if="!isOtpEmail && !isSucess">
                  <p>klik button untuk mengirim kode verifikasi</p>
                  <VTextField
                    v-model="form.email"
                    class="mb-5"
                    type="text"
                    disabled="true"
                    :error-messages="errors.email"
                    placeholder="Masukan Email"
                  />

                  <VBtn block type="submit" @click="onSubmitEmail">
                    Kirim Kode Verifikasi
                  </VBtn>
                  <div class="back-link">
                    <a href="/register" class="back-icon">
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
                    <span v-if="cooldown > 0"
                      >Kirim Ulang dalam ({{ cooldown }}) detik</span
                    >
                    <span v-else>
                      <a @click="resendCode">Kirim Ulang</a>
                    </span>
                  </p>
                  <!-- <OtpVerification /> -->
                  <VBtn
                    block
                    type="submit"
                    :disabled="isDisabledKodeEmail"
                    @click="onSubmitKodeEmail"
                  >
                    Verifikasi Kode
                  </VBtn>
                  <div class="back-link">
                    <a href="/register" class="back-icon">
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
                        <VIcon color="green" size="30">
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
                        style="inline-size: 100%"
                        class="text-none text-body-1 font-weight-medium custom-btn"
                        href="/"
                      >
                        Pergi ke Halaman Login
                        <VIcon end> mdi-arrow-right </VIcon>
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
                  type="text"
                  maxlength="13"
                  disabled="true"
                  :error-messages="errors.noHandphone"
                  placeholder="Masukan Nomor Handphone"
                />

                <VBtn
                  v-model="kodeOtpNoHandphone"
                  block
                  type="submit"
                  @click="onSubmitNomerHandphone"
                >
                  Kirim Kode Verifikasi
                </VBtn>
                <div class="back-link">
                  <a href="/register" class="back-icon">
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
                  <span v-if="cooldown > 0"
                    >Kirim Ulang dalam ({{ cooldown }}) detik</span
                  >
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
                  <a href="/" class="back-icon">
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
                      <VIcon color="green" size="30"> mdi-check-circle </VIcon>
                      Sukses!
                    </h2>
                    <p>
                      Verifikasi dengan Nomor Handphone telah berhasil dilakukan
                    </p>
                  </VCol>
                </VRow>
                <VRow class="mt-4">
                  <VCol>
                    <VBtn
                      outlined
                      style="inline-size: 100%"
                      class="text-none text-body-1 font-weight-medium custom-btn"
                      href="/register"
                    >
                      Pergi ke Halaman Login
                      <VIcon end> mdi-arrow-right </VIcon>
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
      md="6"
      class="py-1 pe-2 bg-white position-sticky"
      style="max-height: calc(100vh - 48px)"
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
