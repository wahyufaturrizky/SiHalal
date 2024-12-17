import { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const baseUrl = `${runtimeConfig.coreBaseUrl}/api/v1`;
  const selfDeclareCreateUrl = `${baseUrl}/pelaku-usaha/layanan-sertifikasi-halal`;
  const response = await $fetch<any>(selfDeclareCreateUrl, {
    method: "post",
    headers: { Authorization: authHeader },
  }).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });

  return response || null;
});
