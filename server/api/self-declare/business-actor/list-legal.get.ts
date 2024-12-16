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

  const baseUrl = `${runtimeConfig.coreBaseUrl}/api/v1`;
  const legalListUrl = `${baseUrl}/pelaku-usaha/list-legal`;
  const response = await $fetch<any>(legalListUrl, {
    method: "get",
    headers: { Authorization: authHeader },
    params,
  }).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });

  return response || null;
});
