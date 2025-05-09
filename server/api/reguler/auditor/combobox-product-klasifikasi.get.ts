import type { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");

  const runtimeConfig = useRuntimeConfig();

  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  let { idLayanan } = (await getQuery(event)) as {
    idLayanan: string;
  };

  idLayanan = idLayanan?.trim() || "-";
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/klasifikasi-product-regular/${idLayanan}/combobox`,
    {
      method: "GET",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
