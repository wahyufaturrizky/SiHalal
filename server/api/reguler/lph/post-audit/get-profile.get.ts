import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event: any) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const data = await $fetch<any>(`${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/lph/profile`, {
    method: "get",
    headers: { Authorization: authorizationHeader },
  }).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});
