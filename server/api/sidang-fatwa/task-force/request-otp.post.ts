const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);  

  return await $fetch(
    `${runtimeConfig.authBaseUrl}/api/v1/users/verification-code-otp`,
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
