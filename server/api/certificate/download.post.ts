import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }
  const { cert_id } = await readBody(event);
  const data = await $fetch<any>(
    `${runtimeConfig.certificateBaseUrl}${cert_id}`,
    {
      method: "get",
    }
  ).catch((err: NuxtError) => {
    console.log(err);
    // setResponseStatus(event, 400);

    return err.data;
  });
  console.log(data);

  return data || null;
});
