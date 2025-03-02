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
  // console.log(runtimeConfig);
  console.log(runtimeConfig.public.captcha.active == true)
  if (runtimeConfig.public.captcha.active) {
    const recaptcha = await $fetch<any>(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        params: {
          secret: runtimeConfig.recaptcha.secretKey,
          response: token,
        },
      }
    ).catch((err: NuxtError) => {
      console.log(err);
      throw createError({
        statusCode: 401,
        statusMessage: "captcha-failed",
        data: err.data,
      });
    });
    if (!recaptcha.success) {
      throw createError({
        statusCode: 401,
        statusMessage: "captcha-failed",
        data: {
          success: false,
        },
      });
    }
  }

  const { data } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/authenticate`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  ).catch((err: NuxtError) => {
    console.log("ini err", err);
    throw createError({
      statusCode: 401,
      statusMessage: "username or password wrong",
      data: err.data,
    });
  });
  if (!data.user.is_verified) {
    throw createError({
      statusCode: 400,
      message: "username or password wrong",
      data: data,
    });
  }

  return data || null;
});
