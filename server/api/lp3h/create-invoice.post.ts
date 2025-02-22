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

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/tagihan-bpjph/create-invoice`,
    {
      method: "post",
      headers: { Authorization: authHeader },
      body,
    }
  ).catch((err: NuxtError) => {
    console.error("error = ", err);
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;

});
