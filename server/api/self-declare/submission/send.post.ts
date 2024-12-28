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
  const payload = await readBody(event);
  const response = await $fetch(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/business-actor/submit`,
    {
      method: "post",
      headers: { Authorization: authHeader },
      body: payload,
    }
  ).catch((err: NuxtError) => {
    console.log(err);
    return err.data;
  });

  return response || null;
});
