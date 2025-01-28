<script setup lang="ts">
import ForgotPassLayout from "@/layouts/forgotPassLayout.vue";
import HelpButton from "@/views/pages/HelpButton.vue";
import { useI18n } from "vue-i18n";
definePageMeta({
  layout: "blank",
  unauthenticatedOnly: true,
});

const newEmailSuccess = ref(false);
const newEmailFail = ref(false);
const newEmailAddr = ref("");

const emailSuccessEmitted = (val: boolean) => {
  newEmailSuccess.value = val;
};
const emailFailEmitted = (val: boolean) => {
  newEmailFail.value = val;
};
const emailAddrEmitted = (val: string) => {
  newEmailAddr.value = val;
};

const { t } = useI18n();
</script>

<template>
  <HelpButton />
  <ForgotPassLayout>
    <template #pageTitle>
      <VRow>
        <VCol cols="12">
          <VAlert
            v-if="newEmailSuccess"
            type="success"
            :text="'Verifikasi berhasil dikirim ke ' + newEmailAddr"
          ></VAlert>
          <!--          <VAlert-->
          <!--            v-if="newEmailFail"-->
          <!--            type="error"-->
          <!--            text="Email gagal dikirim"-->
          <!--          ></VAlert>-->
        </VCol>
      </VRow>
      <br />
      <h2 style="color: #2c222e">{{ t("fogot-password.forgot") }}</h2>
      <span style="color: #746d76">{{ t("fogot-password.verify") }}</span>
    </template>
    <template #formSlot>
      <EmailForm
        @emailAddrSent="emailAddrEmitted"
        @emailSentFailed="emailFailEmitted"
        @emailSentSuccess="emailSuccessEmitted"
      ></EmailForm>
    </template>
  </ForgotPassLayout>
</template>
