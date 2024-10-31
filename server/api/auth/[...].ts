import { NuxtAuthHandler } from "#auth";
import { TurnstileValidationResponse } from "@nuxtjs/turnstile/runtime/types.js";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NuxtError } from "nuxt/app";

// import GoogleProvider from 'next-auth/providers/google'

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.authSecret,
  providers: [
    // GoogleProvider.default({
    //   clientId: runtimeConfig.public.AUTH_PROVIDER_GOOGLE_CLIENT_ID,
    //   clientSecret: runtimeConfig.AUTH_PROVIDER_GOOGLE_CLIENT_SECRET,
    // }),

    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {}, // Object is required but can be left empty.
      async authorize(credentials: any) {
        console.log(credentials);
        const turnstile = await $fetch<TurnstileValidationResponse>(
          `${runtimeConfig.public.apiBaseUrl}/validateTurnstile`,
          { method: "POST", body: { token: credentials.token } }
        );
        if (!turnstile.success) {
          throw createError({
            statusCode: 403,
            statusMessage: "captcha-failed",
          });
        }
        const { user } = await $fetch<any>(
          `${runtimeConfig.public.apiBaseUrl}/login/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
          }
        ).catch((err: NuxtError) => {
          throw createError({
            statusCode: err.statusCode || 403,
            statusMessage: JSON.stringify(err.data),
          });
        });

        return user || null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      /*
       * For adding custom parameters to user in session, we first need to add those parameters
       * in token which then will be available in the `session()` callback
       */
      if (user) {
        token.username = user.username;
        token.fullName = user.fullName;
        token.avatar = user.avatar;
        token.abilityRules = user.abilityRules;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      // Add custom params to user in session which are added in `jwt()` callback via `token` parameter
      if (session.user) {
        session.user.username = token.username;
        session.user.fullName = token.fullName;
        session.user.avatar = token.avatar;
        session.user.abilityRules = token.abilityRules;
        session.user.role = token.role;
      }

      return session;
    },
  },
});
