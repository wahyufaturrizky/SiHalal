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
    ref_unik, page, limit
  } = (await getQuery(event)) as {
    ref_unik: string;
    page: string;
    limit: string;
  };

  try {
    const runtimeConfig = useRuntimeConfig();

    const params = {
      ref_unik,
      page,
      limit
    }

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/tagihan-bpjph`,
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
