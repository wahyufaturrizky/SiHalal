/* eslint-disable camelcase */
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

  const { page, size, status, search } = (await getQuery(event)) as {
    page: string;
    size: string;
    status: string;
    search: string;
  };

  let params = {
    page: +page,
    size: +size,
    status,
    search: search,
  };

  console.log(params, "<<<<");

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pengajuan-pendamping/self-declare`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
