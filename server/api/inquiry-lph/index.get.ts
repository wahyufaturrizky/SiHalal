import type { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");

  if (!authorizationHeader) {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const query = getQuery(event);

  const params = {
    page: Number.parseInt(query.page as string, 10) || 1,
    size: Number.parseInt(query.size as string, 10) || 10,
    no_daftar: query.no_daftar || "",
    no_sertifikat: query.no_sertifikat || "",
    nama_pu: query.nama_pu || "",
    merek_dagang: query.merek_dagang || "",
    jenis_permohonan: query.jenis_permohonan || "",
    status: query.status || "",
    jenis_pendaftaran: query.jenis_pendaftaran || "",
    nama_fasilitator: query.nama_fasilitator || "",
    jenis_layanan: query.jenis_layanan || "",
  };

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/inquiry-lph`,
    {
      method: "get",
      headers: {
        Authorization: authorizationHeader,
      },
      params,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });

  return data || null;
});
