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

  const { id, page, size } = (await getQuery(event)) as {
    id: string;
    page: string;
    size: string;
  };
  const params = {
    page: 1,
    size: 10,
  };
  if (page != "" || page != null || page != undefined) {
    params.page = Number.parseInt(page, 10);
  }
  if (size != "" || size != null || size != undefined) {
    params.size = Number.parseInt(size, 10);
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/lph/proses/bahan-penyimpanan/${id}`,
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
