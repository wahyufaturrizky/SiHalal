import { install } from "vue3-recaptcha-v2";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  console.log(config.public.recaptcha.siteKey);
  nuxtApp.vueApp.use(install, {
    sitekey: config.public.recaptcha.siteKey,
    cndomain: false,
  });
});
