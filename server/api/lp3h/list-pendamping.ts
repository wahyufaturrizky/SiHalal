import type { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const {
    page, size
  } = (await getQuery(event)) as {
    page: string;
    limit: string;
  };

  try {
    const runtimeConfig = useRuntimeConfig();
    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/lp3h/list-pendamping`,
      {
        method: "get",
        headers: { Authorization: authHeader },
        const params = {
          page,
          size
        }

      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);

    return (error as NuxtError).data;
  }
});
