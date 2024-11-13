import { fileURLToPath } from "node:url";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s",
      title: "SiHalal",

      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `/favicon.ico`,
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  css: [
    "@core/scss/template/index.scss",
    "@styles/styles.scss",
    "@/plugins/iconify/icons.css",
  ],

  /*
    ❗ Please read the docs before updating runtimeConfig
    https://nuxt.com/docs/guide/going-further/runtime-config
  */
  runtimeConfig: {
    // Private keys are only available on the server
    authSecret: process.env.NUXT_AUTH_SECRET || "",
    authBaseUrl: process.env.NUXT_AUTH_BASE_URL || "",
    coreBaseUrl: process.env.NUXT_CORE_BASE_URL || "",

    // Public keys that are exposed to the client.
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "",
      appBaseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL || "",
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || "",
    },
  },
  components: {
    dirs: [
      {
        path: "@/@core/components",
        pathPrefix: false,
      },
      ,
      {
        path: "~/components/global",
        global: true,
      },
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },

  auth: {
    baseURL: "/api/auth",
    globalAppMiddleware: false,

    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        getSession: { path: "/session", method: "get" },
        signUp: false,
      },
      token: {
        signInResponseTokenPointer: "/token",
        type: "bearer",
        cookieName: "accessToken",
        headerName: "Authorization",
        maxAgeInSeconds: 3600,
        sameSiteAttribute: "lax",
        secureCookieAttribute: false,
      },
      session: {
        dataType: {
          email: "string",
          id: "string",
          new_user: "boolean",
          otp: "string",
          roles:
            "{ name: string, permissions: { group: string, name: string, url: string }[] }[]",
          username: "string",
        },
        dataResponsePointer: "/user",
      },
    },
  },

  plugins: [
    "@/plugins/casl/index.ts",
    "@/plugins/vuetify/index.ts",
    "@/plugins/iconify/index.ts",
  ],

  imports: {
    dirs: ["./@core/utils", "./@core/composable/", "./plugins/*/composables/*"],
  },

  hooks: {},

  experimental: {
    typedPages: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          "@/*": ["../*"],
          "@themeConfig": ["../themeConfig.ts"],
          "@layouts/*": ["../@layouts/*"],
          "@layouts": ["../@layouts"],
          "@core/*": ["../@core/*"],
          "@core": ["../@core"],
          "@images/*": ["../assets/images/*"],
          "@styles/*": ["../assets/styles/*"],
          "@validators": ["../@core/utils/validators"],
          "@db/*": ["../server/fake-db/*"],
          "@api-utils/*": ["../server/utils/*"],
        },
      },
    },
  },

  // ℹ️ Disable source maps until this is resolved: https://github.com/vuetifyjs/vuetify-loader/issues/290
  sourcemap: {
    server: false,
    client: false,
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        tag === "swiper-container" || tag === "swiper-slide",
    },
  },

  vite: {
    define: { "process.env": {} },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
        "@themeConfig": fileURLToPath(
          new URL("./themeConfig.ts", import.meta.url)
        ),
        "@core": fileURLToPath(new URL("./@core", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./@layouts", import.meta.url)),
        "@images": fileURLToPath(new URL("./assets/images/", import.meta.url)),
        "@styles": fileURLToPath(new URL("./assets/styles/", import.meta.url)),
        "@configured-variables": fileURLToPath(
          new URL("./assets/styles/variables/_template.scss", import.meta.url)
        ),
        "@db": fileURLToPath(new URL("./server/fake-db/", import.meta.url)),
        "@api-utils": fileURLToPath(
          new URL("./server/utils/", import.meta.url)
        ),
      },
    },

    build: {
      chunkSizeWarningLimit: 5000,
    },

    optimizeDeps: {
      // exclude: ["vuetify"],
      entries: ["./**/*.vue"],
    },

    plugins: [
      svgLoader(),
      vuetify({
        styles: {
          configFile: "assets/styles/variables/_vuetify.scss",
        },
      }),
    ],
    vue: {
      template: { transformAssetUrls },
    },
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  build: {
    transpile: ["vuetify"],
  },

  i18n: {
    vueI18n: "i18n.config.ts",
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/device",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@nuxtjs/turnstile",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  turnstile: {
    siteKey: "1x00000000000000000000AA",
  },
});
