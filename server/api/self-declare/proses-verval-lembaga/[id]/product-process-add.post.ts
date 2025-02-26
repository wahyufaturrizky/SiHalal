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

  const body = await readBody(event);

  try {
    const runtimeConfig = useRuntimeConfig();
    const { id } = event.context.params;

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/pendamping/verval/${id}/product-process`,
      {
        method: "post",
        headers: { Authorization: authHeader },
        body,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);

    return (error as NuxtError).data;
  }
});
