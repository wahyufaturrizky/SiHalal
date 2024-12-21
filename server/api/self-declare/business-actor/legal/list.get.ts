import { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const query: any = await getQuery(event);
  const params = {
    id_reg: query.id_reg,
    page: isNaN(Number.parseInt(query.page, 10))
      ? 1
      : Number.parseInt(query.page, 10),
    size: isNaN(Number.parseInt(query.size, 10))
      ? 1
      : Number.parseInt(query.size, 10),
  };

  try {
    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/list-legal`,
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
