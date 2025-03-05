import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event: any) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const { url, page, size } = (await getQuery(event)) as {
    url: string;
    page: number;
    size: number;
  };

  const params = {
    page: +page,
    size: +size,
  }

  const data = await $fetch<any>(`${runtimeConfig.coreBaseUrl}/${url}`, {
    method: "get",
    headers: { Authorization: authorizationHeader },
    params,
  }).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});
