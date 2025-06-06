import { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  try {
    const runtimeConfig = useRuntimeConfig();
    const apiEndpoint = "/pelaku-usaha/layanan-sertifikasi-halal-mandiri";
    const payload = await readBody(event);

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1${apiEndpoint}`,
      {
        method: "post",
        headers: { Authorization: authorizationHeader },
        body: payload,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
