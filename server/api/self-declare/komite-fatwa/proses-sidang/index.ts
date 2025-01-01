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

  const { page, size, lembaga, pendamping, fasilitasi, namaPengajuan } =
    (await getQuery(event)) as {
      page: string;
      size: string;
      lembaga: string;
      pendamping: string;
      fasilitasi: string;
      namaPengajuan: string;
    };

  const params: any = {
    page: Number.isNaN(Number.parseInt(page, 10))
      ? 1
      : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10))
      ? 10
      : Number.parseInt(size, 10),
  };

  if (lembaga !== "") params["lembaga_pendamping_id"] = lembaga;
  if (pendamping !== "") params["pendamping_id"] = pendamping;
  if (fasilitasi !== "") params["fac_id"] = fasilitasi;
  if (namaPengajuan !== "") params["nama_pengajuan"] = namaPengajuan;

  // if (status !== "" && status !== "Semua") {
  //   params["status"] = status;
  // }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/list`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});
