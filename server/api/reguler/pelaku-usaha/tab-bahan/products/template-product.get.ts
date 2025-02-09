import { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  try {
    const runtimeConfig = useRuntimeConfig();

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/produk/5662f159-e5db-5b77-987e-156ff85820f0/download-template`,
      {
        method: "get",
        headers: { Authorization: authHeader },
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
