import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // console.log("req body = ", JSON.stringify(atob(body.body)));

  const { data } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/auth/reset-password`,
    {
      method: "POST",
      body: atob(body.body),
    }
  ).catch((err: NuxtError) => {
    console.error("error reset passwd => ", err.data);

    const response = JSON.parse(JSON.stringify(err.data));
    let msgDefault = "Password is wrong";
    if (err.statusCode == 400) {
      if (response?.code == 4005) msgDefault = response?.message;
    }

    throw createError({
      statusCode: 400,
      statusMessage: msgDefault,
    });
  });

  return data || null;
});
