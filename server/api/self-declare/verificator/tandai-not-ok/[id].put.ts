import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  const id = getRouterParam(event, "id");

  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/verificator/halal-certificate-reguler/self-declare/${id}/not-ok`,
    {
      method: "put",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});
