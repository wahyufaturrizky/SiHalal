import type { NuxtError } from "nuxt/app";

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
    const payload = await readFormData(event);

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/komisi-fatwa`,
      {
        method: "put",
        headers: { Authorization: authHeader },
        body: payload,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);

    return (error as NuxtError).data;
  }
});
