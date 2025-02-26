const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const authorizationHeader = getRequestHeader(event, 'Authorization')
  if (typeof authorizationHeader === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid Bearer-authorization header to access this endpoint',
    })
  }

  return await $fetch(
    `${runtimeConfig.coreBaseUrl}/api/v1/komisi-fatwa/proses-sidang-submit`,
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
