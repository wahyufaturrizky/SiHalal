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
  // const { id, page, size } = event.context.params;
  const { id, page, size } = (await getQuery(event)) as {
    id: string;
    page: number;
    size: number;
  };

  console.log("id = ", id);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/auditor/${id}/produk`,
    {
      method: "GET",
      headers: { Authorization: authorizationHeader },
      params: {
        page,
        size,
      },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
