<script setup lang="ts">
import { ref } from "vue";

const password = ref("");
const newPass = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const isDisable = ref(false);

function togglePasswordVisibility() {
  // console.log(showPassword.value);
  showPassword.value = !showPassword.value;
}

const result = ref<string | null>(null);
async function apiCallNewPasswd() {
  try {
    const route = useRoute();
    const routeQuery = route.query["_t"];
    const bodyReq = {
      token: routeQuery,
      new_password: newPass.value,
      confirm_new_password: password.value,
    };
    const encodedPayload = btoa(JSON.stringify(bodyReq));

    if (routeQuery == undefined || routeQuery == "") {
      navigateTo("/forgot-password");
    }
    isLoading.value = true;

    if (
      password.value !== "" &&
      newPass.value !== "" &&
      password.value === newPass.value
    ) {
      const { data, error } = await useFetch("/api/auth/forgot-new", {
        method: "POST",
        body: { body: encodedPayload }, // Payload for POST
      });

      // emailSubmittedBtn.value = true;
      if (error.value) {
        throw error.value;
      }
      isLoading.value = false;
      emit("submitNewPass", true);
      data.value = data.value ? "Request succeeded!" : "Request failed";
    } else {
      isLoading.value = false;
      result.value = "Password can't be reset";
      emit("newPassFailed", true);
    }
  } catch (err) {
    // console.log(err);
    isLoading.value = false;
    result.value = "Password can't be reset";
    emit("newPassFailed", true);
  }
}

const emit = defineEmits(["submitNewPass", "newPassFailed"]);

const submitNewPassword = (event: any) => {
  event.preventDefault();
  apiCallNewPasswd();
};

const confPassRules = [
  (val: string): boolean | string => {
    if (
      val === password.value &&
      password.value !== "" &&
      newPass.value !== ""
    ) {
      isDisable.value = false;
      return true;
    }
    isDisable.value = true;
    return "Konfirmasi Kata Sandi Baru tidak sama";
  },
];

const passRules = [
  (val: string): boolean | string => {
    if (password.value.length >= 8) {
      return true;
    }
    return "Pastikan kata sandi minimal 8 karakter!";
  },
];
</script>
<template>
  <VForm>
    <VRow>
      <VCol>
        <VItemGroup>
          <VLabel style="color: #2c222e" text="Kata Sandi Baru"></VLabel>
          <VTextField
            v-model="password"
            placeholder="Masukkan Kata Sandi"
            base-color="#746D76"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="
              showPassword ? 'mdi-eye' : 'mdi-eye-off-outline'
            "
            :rules="passRules"
            @click:append-inner="togglePasswordVisibility"
          ></VTextField>
        </VItemGroup>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VItemGroup>
          <VLabel
            style="color: #2c222e"
            text="Konfirmasi Kata Sandi Baru"
          ></VLabel>
          <VTextField
            v-model="newPass"
            placeholder="Masukkan Kata Sandi Baru"
            base-color="#746D76"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="
              showPassword ? 'mdi-eye' : 'mdi-eye-off-outline'
            "
            @click:append-inner="togglePasswordVisibility"
            :rules="confPassRules"
          ></VTextField>
        </VItemGroup>
      </VCol>
    </VRow>
    <br />
    <VRow>
      <VCol>
        <VBtn
          :loading="isLoading"
          :disabled="isDisable"
          @click="submitNewPassword"
          width="500"
          >Ubah Kata Sandi</VBtn
        >
      </VCol>
    </VRow>
  </VForm>
</template>
<style lang="css">
.v-field__input {
  color: #2c222e !important;
  opacity: 1;
}

.v-field__append-inner {
  color: #59515b;
}
</style>
