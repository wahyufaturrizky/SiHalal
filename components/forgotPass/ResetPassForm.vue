<script setup>
import { ref } from "vue";

const password = ref("");
const newPass = ref("");
const showPassword = ref(false);

function togglePasswordVisibility() {
  console.log(showPassword.value);
  showPassword.value = !showPassword.value;
}

const emit = defineEmits(["submitNewPass"]);

const submitNewPassword = () => {
  emit("submitNewPass", true);
};
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
          ></VTextField>
        </VItemGroup>
      </VCol>
    </VRow>
    <br />
    <VRow>
      <VCol>
        <VBtn @click="submitNewPassword" width="500">Ubah Kata Sandi</VBtn>
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
