import { deepMerge } from "@antfu/utils";

import "@mdi/font/css/materialdesignicons.min.css";
import { themeConfig } from "@themeConfig";
import { createVuetify } from "vuetify";
import { VBtn } from "vuetify/components/VBtn";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import defaults from "./defaults";
import { staticPrimaryColor, staticPrimaryDarkenColor, themes } from "./theme";

// Styles
import { cookieRef } from "@/@layouts/stores/config";
import "@core/scss/template/libs/vuetify/index.scss";
import "vuetify/styles";

export default defineNuxtPlugin((nuxtApp) => {
  const { $i18n } = useNuxtApp();
  const i18n = { global: $i18n };

  const cookieThemeValues = {
    defaultTheme: resolveVuetifyTheme(themeConfig.app.theme),
    themes: {
      light: {
        colors: {
          primary: cookieRef("lightThemePrimaryColor", staticPrimaryColor)
            .value,
          "primary-darken-1": cookieRef(
            "lightThemePrimaryDarkenColor",
            staticPrimaryDarkenColor
          ).value,
        },
      },
      dark: {
        colors: {
          primary: cookieRef("darkThemePrimaryColor", staticPrimaryColor).value,
          "primary-darken-1": cookieRef(
            "darkThemePrimaryDarkenColor",
            staticPrimaryDarkenColor
          ).value,
        },
      },
    },
  };

  const optionTheme = deepMerge({ themes }, cookieThemeValues);

  const vuetify = createVuetify({
    ssr: true,
    aliases: {
      IconBtn: VBtn,
    },
    defaults,

    icons: {
      defaultSet: "mdi", // This is already the default value - only for display purposes
    },
    theme: optionTheme,
    locale: { adapter: createVueI18nAdapter({ i18n, useI18n }) },
  });

  nuxtApp.vueApp.use(vuetify);
});
