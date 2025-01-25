<template>
  <VRow no-gutters class="d-flex justify-center my-5">
    <NuxtLink to="/">
      <div class="auth-logo app-logo">
        <VNodeRenderer :nodes="themeConfig.app.logo" />
      </div>
    </NuxtLink>
  </VRow>
  <VRow no-gutters>
    <VCol class="d-flex align-center justify-center">
      <v-card class="mb-5">
        <VWindow
          :touch="false"
          v-model="stepStore.step"
          class="d-flex align-center justify-center"
          style="max-inline-size: 90dvw"
        >
          <VWindowItem :value="1">
            <v-card-text>
              <VCol>
                <p class="text-h5 font-weight-bold">
                  {{ t("new-account.asal-attr-1") }}
                </p>
                <RadioButtonGroup v-model="radioGroup">
                  <RadioButtonCustom
                    :label="t('new-account.asal-attr-2')"
                    :value="1"
                  />
                  <RadioButtonCustom
                    :label="t('new-account.asal-attr-3')"
                    :value="2"
                  />
                  <RadioButtonCustom
                    :label="t('new-account.asal-attr-4')"
                    :value="3"
                  />
                </RadioButtonGroup>
              </VCol>
              <VCol class="d-flex justify-end">
                <VBtn @click="stepStore.goToStep(radioGroup + 1)"
                  >Selanjutnya</VBtn
                >
              </VCol>
            </v-card-text>
          </VWindowItem>
          <VWindowItem :value="2">
            <LuarNegeri />
          </VWindowItem>
          <VWindowItem :value="3">
            <DalamNegeri />
          </VWindowItem>
          <VWindowItem :value="4">
            <InstansiPemerintahan />
          </VWindowItem>
        </VWindow>
      </v-card>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { VNodeRenderer } from "@/@layouts/components/VNodeRenderer";
import { themeConfig } from "@/themeConfig";
import DalamNegeri from "@/views/pages/new-account/DalamNegeri.vue";
import InstansiPemerintahan from "@/views/pages/new-account/InstansiPemerintahan.vue";
import LuarNegeri from "@/views/pages/new-account/LuarNegeri.vue";
import { useI18n } from "vue-i18n";

definePageMeta({
  layout: "blank",
});

const stepStore = useMyNewAccountStepStore();
const radioGroup = ref(1);

const { t } = useI18n();
</script>

<style lang="css" scoped>
.auth-logo {
  div {
    svg {
      block-size: 60px;
      inline-size: 33px;
    }
  }
}

/* .new-account-window {

} */

/* .auth-new-account {
  height: 100dvh;
} */
</style>
