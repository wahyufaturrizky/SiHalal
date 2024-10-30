<script setup lang="ts">
const isVerified = ref(false);
const inputDisabled = ref(false);
const submitDisabled = ref(false);
const sendAgainDisabled = ref(true);
const countdownMount = ref(false);

const handleCountdownDone = () => {
  console.log("countdown done");
  sendAgainDisabled.value = false;
  inputDisabled.value = false;
  countdownMount.value = false;
};

const onClickEmailSubmit = () => {
  inputDisabled.value = true;
  submitDisabled.value = true;
  sendAgainDisabled.value = true;
  countdownMount.value = true;
};

const onClickSendAgain = () => {
  countdownMount.value = true;
  inputDisabled.value = true;
  sendAgainDisabled.value = true;
};
</script>
<template>
  <VForm>
    <VRow>
      <VCol>
        <VItemGroup>
          <VLabel style="color: #2c222e" text="Email"></VLabel>
          <VTextField
            class="placeholder-color label-color"
            type="email"
            placeholder="Masukkan email"
            base-color="#746D76"
            :disabled="inputDisabled"
          ></VTextField>
        </VItemGroup>
      </VCol>
    </VRow>
    <br />
    <VRow>
      <VCol>
        <CountdownTimer
          v-on:countdown-done="handleCountdownDone"
          v-if="countdownMount"
          :timer-start-in-second="153"
        ></CountdownTimer>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          @click="onClickEmailSubmit"
          :disabled="submitDisabled"
          v-if="!submitDisabled"
          width="500"
          >Kirim Verifikasi Lewat Email</VBtn
        >
        <VBtn
          @click="onClickSendAgain"
          v-if="submitDisabled"
          :disabled="sendAgainDisabled"
          width="500"
          >Kirim Ulang</VBtn
        >
      </VCol>
    </VRow>
    <VRow>
      <VCol style="display: grid">
        <VBtn variant="text" prepend-icon="mdi-arrow-left"
          ><NuxtLink to="/login">Kembali ke Halaman Login</NuxtLink></VBtn
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
