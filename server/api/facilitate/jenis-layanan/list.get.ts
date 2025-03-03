import { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }
  const { data } = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/fasilitator/jenis-layanan/list`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      // params: {
      //   // query_by: "self_declare",
      // },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  return data || null;
});
