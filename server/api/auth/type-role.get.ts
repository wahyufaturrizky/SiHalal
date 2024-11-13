import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async () => {
  const { data } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/list/user-type`,
    {
      method: "get",
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });

  return data || null;
});
