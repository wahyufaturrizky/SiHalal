import { install } from "vue3-recaptcha-v2";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(install, {
    sitekey: "6Le9apEqAAAAAFTXiEHUShNXcmZCNmsawJ1Ia1xE",
    cndomain: false,
  });
});
