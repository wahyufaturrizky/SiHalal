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

  const { pstatus, search,file_url } = (await getQuery(event)) as {
    status: string;
    search: string;
    file_url: boolean;
  };

  let params = {
    status,
    search: search,
    file_url: file_url
  };

  console.log(params, "<<<<");

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pengajuan-pendamping/self-declare/download`,
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
