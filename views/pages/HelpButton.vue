<script lang="ts" setup>
import { themeConfig } from "@themeConfig";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

const config = useRuntimeConfig();

function initFreshChat() {
  window.fcWidget.init({
    token: config.public.freshChat.token,
    host: config.public.freshChat.host,
    widgetUuid: config.public.freshChat.widgetUuid,
  });
}
function initialize(i, t) {
  let e;
  i.getElementById(t)
    ? initFreshChat()
    : (((e = i.createElement("script")).id = t),
      (e.async = !0),
      (e.src = `${config.public.freshChat.host}/js/widget.js`),
      (e.onload = initFreshChat),
      i.head.appendChild(e));
}
function initiateCall() {
  initialize(document, "Freshchat-js-sdk");
}

onMounted(() => {
  initiateCall();
});
</script>

<template>
  <VRow class="px-2 py-1 bg-white">
    <VCol cols="12" class="d-flex justify-end">
      <VMenu>
        <template #activator="{ props }">
          <VBtn color="black" size="small" variant="outlined" v-bind="props">
            <VIcon start icon="fa-solid fa-question-circle" />
            {{ t("login.nav-1") }}
            <VIcon end icon="mdi-chevron-down" />
          </VBtn>
        </template>

        <VList>
          <!--
            <v-list-item
            value="whatsapp"
            color="primary"
            href="https://wa.me/6281180103146"
            target="-blank"
            >
            <template v-slot:prepend>
            <v-icon icon="fa-whatsapp" color="success"></v-icon>
            </template>
            <v-list-item-title class="text-success">Whatsapp</v-list-item-title>
            </v-list-item>
          -->
          <VListItem
            value="email"
            color="primary"
            href="mailto:layanan@halal.go.id"
            target="-blank"
          >
            <template #prepend>
              <VIcon icon="fa-envelope" />
            </template>
            <VListItemTitle>Email</VListItemTitle>
          </VListItem>
          <VListItem
            value="telepon"
            color="primary"
            href="tel:146"
            target="-blank"
          >
            <template #prepend>
              <VIcon icon="fa-phone" />
            </template>
            <VListItemTitle> {{ t("login.nav-1-phone") }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <VMenu>
        <template #activator="{ props }">
          <VBtn
            class="ml-3 text-overline"
            color="black"
            size="small"
            variant="outlined"
            v-bind="props"
          >
            <VIcon start icon="fa-solid fa-globe" />
            {{ locale }}
            <VIcon end icon="mdi-chevron-down" />
          </VBtn>
        </template>
        <VList :selected="[locale]" color="primary" mandatory>
          <!-- List item -->
          <VListItem
            v-for="lang in themeConfig.app.i18n.langConfig"
            :key="lang.i18nLang"
            class="px-4"
            :value="lang.i18nLang"
            @click="locale = lang.i18nLang"
          >
            <!-- Language label -->
            <VListItemTitle>
              {{ lang.label }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VCol>
  </VRow>
</template>

<style></style>
