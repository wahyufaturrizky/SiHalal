import type { NuxtError } from "nuxt/app";

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

  const { page, size, keyword, query_by } = (await getQuery(event)) as {
    page: string;
    size: string;
    keyword: string;
    query_by: string;
  };

  const params: any = {
    page: isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
    query_by,
  };

  if (keyword !== "") {
    params["keyword"] = keyword;
  }

  if (query_by !== "") {
    params["query_by"] = query_by;
  }
  console.log("@params", params);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pendamping/halal-certificate-reguler/pengajuan`,
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
