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

  const { parent } = await getQuery(event);

  const { data } = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/fasilitator/jenis-produk/list`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params: { parent },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  return data || null;
});
