import { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  try {
    const runtimeConfig = useRuntimeConfig()
    const body: DraftBody = await readBody(event)

    const response = await $fetch(
      `${runtimeConfig.authBaseUrl}/api/v1/admin/announcement/add`,
      {
        method: 'post',
        headers: { Authorization: authHeader },
        body,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
