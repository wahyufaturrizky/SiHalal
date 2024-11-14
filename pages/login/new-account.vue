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
          style="max-width: 90dvw"
        >
          <VWindowItem :value="1">
            <v-card-text>
              <VCol>
                <p class="text-h5 font-weight-bold">Pilih Asal Pelaku Usaha</p>
                <RadioButtonGroup v-model="radioGroup">
                  <RadioButtonCustom
                    label="Luar Negeri / Overseas"
                    :value="1"
                  />
                  <RadioButtonCustom
                    label="Dalam Negeri / Domestic"
                    :value="2"
                  />
                  <RadioButtonCustom label="Instansi Pemerintah" :value="3" />
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

definePageMeta({
  layout: "blank",
});

const stepStore = useMyNewAccountStepStore();
const radioGroup = ref(1);
</script>

<style lang="css" scoped>
.auth-logo {
  div {
    svg {
      height: 60px;
      width: 33px;
    }
  }
}
/* .new-account-window {

} */
/* .auth-new-account {
  height: 100dvh;
} */
</style>
