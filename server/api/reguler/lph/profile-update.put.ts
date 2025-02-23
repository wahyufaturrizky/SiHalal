import type { NuxtError } from "nuxt/app";

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

  const body: any = await readBody(event);

  const data = await $fetch(
    `${runtimeConfig.coreBaseUrl}/api/v1/lph/profile`,
    {
      method: "put",
      headers: { Authorization: authHeader },
      body,
    } as any
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
