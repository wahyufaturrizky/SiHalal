import { NuxtError } from "nuxt/app";
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
  const { data } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/check-token`,
    {
      method: "POST",
      body: JSON.stringify({
        token: authorizationHeader.split("bearer ")[1],
        access: "/v1/users",
      }),
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode || 403,
      statusMessage: JSON.stringify(err.data),
    });
  });

  return data || null;
});
