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

  const {
    page,
    size,
    no_daftar,
    nama_pu,
    merek_dagang,
    status,
    jenis,
    kode_fac,
  } = (await getQuery(event)) as {
    page: string;
    size: string;
    no_daftar: string;
    nama_pu: string;
    merek_dagang: string;
    status: string;
    jenis: string;
    kode_fac: string;
  };

  const params = {
    page: isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
    no_daftar,
    nama_pu,
    merek_dagang,
    status,
    jenis,
    kode_fac,
  };

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/inquiry`,
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
