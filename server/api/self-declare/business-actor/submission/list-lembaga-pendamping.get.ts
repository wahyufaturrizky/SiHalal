import { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  try {
    const runtimeConfig = useRuntimeConfig();
    const query: any = await getQuery(event);

    const params = {};
    if (query.lokasi) {
      params["lokasi"] = query.lokasi;
    }

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/pelaku-usaha/halal-certificate-reguler/${query.id_reg}/pengajuan/lembaga`,
      {
        method: "get",
        headers: { Authorization: authHeader },
        query: params,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
