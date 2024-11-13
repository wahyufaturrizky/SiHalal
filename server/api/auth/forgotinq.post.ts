const runtimeConfig = useRuntimeConfig();

import { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log("req body = ", body);

  const { data } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/auth/forgot-password`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  ).catch((err: NuxtError) => {
    // console.error("error forgot passwd => ", err);
    throw createError({
      statusCode: 400,
      statusMessage: "Email is wrong",
    });
  });

  return data || null;
});
