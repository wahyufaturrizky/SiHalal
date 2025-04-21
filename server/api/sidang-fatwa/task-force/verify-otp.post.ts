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
  const payload = await readBody(event);

  return await $fetch(
    `${runtimeConfig.coreBaseUrl}/api/v1/komisi-fatwa/verify-otp`,
    {
      method: "POST",
      headers: { Authorization: authorizationHeader },
      body: payload,
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: 500,
      statusMessage: "register gagal otp",
    });
  });
});
