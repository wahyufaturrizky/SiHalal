<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { VForm, VTextField } from "vuetify/components";

const isVerified = ref(false);
const inputDisabled = ref(false);
const submitDisabled = ref(true);
const sendAgainDisabled = ref(true);
const countdownMount = ref(false);
const emailSubmittedBtn = ref(false);
const emailRef = ref<VTextField>();
const emailError = ref(null);
const disableButtonCountDown = 60000;

const handleCountdownDone = () => {
  // console.log("countdown done");
  sendAgainDisabled.value = false;
  inputDisabled.value = false;
  countdownMount.value = false;
};

const onClickEmailSubmit = () => {
  inputDisabled.value = true;
  submitDisabled.value = true;
  sendAgainDisabled.value = true;
  // countdownMount.value = true;
  submitEmail();
  setTimeout(() => (sendAgainDisabled.value = false), disableButtonCountDown);
  // emailSubmittedBtn.value = true;
};

const onClickSendAgain = () => {
  countdownMount.value = true;
  inputDisabled.value = true;
  sendAgainDisabled.value = true;
  submitEmail();
  setTimeout(() => (sendAgainDisabled.value = false), disableButtonCountDown);
};

const emit = defineEmits([
  "emailSentSuccess",
  "emailSentFailed",
  "emailAddrSent",
]);

const emailRule = [
  (val: string): boolean | string => {
    const regexEmail =
      /^(?!.*[._]{2})[a-z0-9._]+\@[a-z]+\.(com|co.id|go.id|id|net)$/;
    submitDisabled.value = true;
    if (regexEmail.test(val)) {
      submitDisabled.value = false;
      return true;
    }
    return "Format email tidak sesuai";
  },
  (v: string) => !!v || "This field is required",
];

const emailAddr = ref("");
const result = ref<string | null>(null);
const submitEmail = async () => {
  emailError.value = null;
  try {
    if (emailAddr.value !== "") {
      const { data, error } = await useFetch("/api/auth/forgotinq", {
        method: "POST",
        body: { email: emailAddr.value },
      });

      if (error.value) {
        emailError.value = "Email tidak ditemukan";
        throw error.value;
      }
      emit("emailSentSuccess", true);
      emit("emailSentFailed", false);
      emit("emailAddrSent", emailAddr.value);
      data.value = data.value ? "Request succeeded!" : "Request failed";
    }
  } catch (err) {
    result.value = "Request failed";
    emit("emailSentFailed", true);
    emit("emailSentSuccess", false);
    emailSubmittedBtn.value = true;
  }
};

const { t } = useI18n();
</script>
<template>
  <VForm>
    <VRow>
      <VCol>
        <VItemGroup>
          <VLabel
            style="color: #2c222e"
            :text="t(`fogot-password.emai`)"
          ></VLabel>
          <VTextField
            class="placeholder-color label-color"
            type="email"
            :placeholder="t(`fogot-password.enter-email`)"
            base-color="#746D76"
            :rules="emailRule"
            v-model="emailAddr"
            :error="!!emailError"
            :error-messages="emailError"
          ></VTextField>
        </VItemGroup>
      </VCol>
    </VRow>
    <br />
    <!--    <VRow>-->
    <!--      <VCol>-->
    <!--        <CountdownTimer-->
    <!--          v-on:countdown-done="handleCountdownDone"-->
    <!--          v-if="countdownMount"-->
    <!--          :timer-start-in-second="60"-->
    <!--        ></CountdownTimer>-->
    <!--      </VCol>-->
    <!--    </VRow>-->
    <VRow>
      <VCol>
        <VBtn
          @click="onClickEmailSubmit"
          :disabled="submitDisabled"
          v-if="!emailSubmittedBtn"
          width="500"
          >{{ t(`fogot-password.send-verif`) }}</VBtn
        >
        <VBtn
          @click="onClickSendAgain"
          v-if="emailSubmittedBtn"
          :disabled="sendAgainDisabled"
          width="500"
          >{{ t(`fogot-password.resend`) }}</VBtn
        >
      </VCol>
    </VRow>
    <VRow>
      <VCol style="display: grid">
        <VBtn variant="text" prepend-icon="mdi-arrow-left"
          ><NuxtLink to="/login">{{
            t(`fogot-password.back-login`)
          }}</NuxtLink></VBtn
        >
      </VCol>
    </VRow>
  </VForm>
</template>
<style lang="css">
.label-color .v-label {
  color: #2c222e;
  opacity: 1;
}

.placeholer-color input,
.label-color input {
  color: #2c222e !important;
}
</style>
