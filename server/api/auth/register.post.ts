const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  console.log("EVENT ", event)
  const response = await $fetch(`${runtimeConfig.authBaseUrl}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((err: NuxtError) => {
    throw createError({
      statusCode: 401,
      statusMessage: "register gagal",
    });
  })
  return response
})
