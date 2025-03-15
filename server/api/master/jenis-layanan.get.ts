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

  const { query } = (await getQuery(event)) as {
    query: string;
  };

  let params = {};

  if (query) {
    params["query_by"] = query;
  } else if (!query) {
    params["query_by"] = "self_declare";
  } else {
    params = {};
  }

  const { data } = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/list/ref/JNLAY`,
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
  return data || null;
});
