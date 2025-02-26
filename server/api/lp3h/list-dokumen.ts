import type { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const {
    fac_id, tahun, search, page, limit
  } = (await getQuery(event)) as {
    fac_id: string;
    tahun: string;
    search: string;
    page: string;
    limit: string;
  };

  try {
    const runtimeConfig = useRuntimeConfig();

    const params = {
      fac_id,
      tahun,
      search,
      page,
      limit
    }

    // console.log("PARAMS : ", params)

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/tagihan-bpjph/list-document-fasilitasi`,
      {
        method: "get",
        headers: { Authorization: authHeader },
        params
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);

    return (error as NuxtError).data;
  }
});
