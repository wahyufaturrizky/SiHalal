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
    keyword,
    fasilitas,
    jenis_produk,
    provinsi,
    lembaga,
    pendamping,
    kabupaten,
  } = (await getQuery(event)) as {
    page: string;
    size: string;
    keyword: string;
    fasilitas: string;
    jenis_produk: string;
    provinsi: string;
    lembaga: string;
    pendamping: string;
    kabupaten: string;
  };

  const params: any = {
    page: isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
  };

  if (keyword != "") {
    params["keyword"] = keyword;
  }

  if (fasilitas != "") {
    params["fasilitas"] = fasilitas;
  }

  if (jenis_produk != "") {
    params["jenis_produk"] = jenis_produk;
  }

  if (provinsi != "") {
    params["provinsi"] = provinsi;
  }

  if (lembaga != "") {
    params["lembaga"] = lembaga;
  }

  if (pendamping != "") {
    params["pendamping"] = pendamping;
  }

  if (kabupaten != "") {
    params["kabupaten"] = kabupaten;
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/verificator/self-declare/search`,
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
