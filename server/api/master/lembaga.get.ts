import { NuxtError } from "nuxt/app";
const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }
  const query: any = await getQuery(event);
  const { data } = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/verificator/self-declare/filter/lembaga`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params: {
        // hanya tambahkan id_lp kalau idLp !== undefined
        ...(query.id_lp ? { id_lp: query.id_lp } : {}),
      },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  return data || null;
});
