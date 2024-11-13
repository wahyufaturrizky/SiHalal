const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  return await $fetch(
    `${runtimeConfig.authBaseUrl}/api/v1/users/verification-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: 500,
      statusMessage: "register gagal otp",
    });
  });
});
