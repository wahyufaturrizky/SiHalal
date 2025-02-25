const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  return await $fetch(
    `${runtimeConfig.coreBaseUrl}/api/v1/komisi-fatwa/proses-sidang-submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: 500,
      statusMessage: "register gagal otp",
    });
  });
});
