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
    const query: any = await getQuery(event);
    const params = {
      page: isNaN(Number.parseInt(query.page, 10))
        ? 1
        : Number.parseInt(query.page, 10),
      size: isNaN(Number.parseInt(query.size, 10))
        ? 1
        : Number.parseInt(query.size, 10),
      keyword: query.keyword,
      status: query.status,
    };

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/submission/self-declare`,
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
