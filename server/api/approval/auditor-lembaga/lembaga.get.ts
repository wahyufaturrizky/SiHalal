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
    const runtimeConfig = useRuntimeConfig();

    const { type } = (await getQuery(event)) as {
      type: string
    }

    const params = {
      type,
    }

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/list/lembaga-pelatihan/combobox`,
      {
        method: "get",
        headers: { Authorization: authHeader },
        params,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
