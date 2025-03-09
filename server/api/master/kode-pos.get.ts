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
  const { provinsi, kabupaten } = (await getQuery(event)) as {
    provinsi: string;
    kabupaten: string;
  };
  const params = {};
  if (provinsi != "" || provinsi != null || provinsi != undefined) {
    params["provinsi"] = provinsi;
  }
  if (kabupaten != "" || kabupaten != null || kabupaten != undefined) {
    params["kabupaten"] = kabupaten;
  }
  const { data } = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/list/kodepos`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  return data || [];
});
