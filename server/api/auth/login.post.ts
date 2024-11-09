import { TurnstileValidationResponse } from "@nuxtjs/turnstile/runtime/types.js";
import { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const { email, password, token } = await readBody(event);
  if (!email || !password) {
    throw createError({
      statusCode: 403,
      statusMessage: "Email and Password is required to login",
      data: {
        email: ["Email and Password is required to login"],
      },
    });
  }
  const turnstile = await $fetch<TurnstileValidationResponse>(
    `${runtimeConfig.public.apiBaseUrl}/validateTurnstile`,
    { method: "POST", body: { token: token } }
  );
  if (!turnstile.success) {
    throw createError({
      statusCode: 401,
      statusMessage: "captcha-failed",
    });
  }
  const { data } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/authenticate`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: 401,
      statusMessage: "username or password wrong",
    });
  });
  setCookie(
    event,
    "roles",
    JSON.stringify(data.user.roles.map((role: any) => role.name))
  );

  return data || null;
});
