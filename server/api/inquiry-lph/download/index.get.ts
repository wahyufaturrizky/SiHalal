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
    no_daftar,
    no_sertifikat,
    nama_pu,
    merek_dagang,
    jenis_permohonan,
    status,
    jenis_pendaftaran,
    nama_fasilitator,
    jenis_layanan,
  } = (await getQuery(event)) as {
    no_daftar?: string;
    no_sertifikat?: string;
    nama_pu?: string;
    merek_dagang?: string;
    jenis_permohonan?: string;
    status?: string;
    jenis_pendaftaran?: string;
    nama_fasilitator?: string;
    jenis_layanan?: string;
  };

  const params: Record<string, string> = {};

  if (no_daftar != "") params["no_daftar"] = no_daftar;
  if (no_sertifikat != "") params["no_sertifikat"] = no_sertifikat;
  if (nama_pu != "") params["nama_pu"] = nama_pu;
  if (merek_dagang != "") params["merek_dagang"] = merek_dagang;
  if (jenis_permohonan != "") params["jenis_permohonan"] = jenis_permohonan;
  if (status != "") params["status"] = status;
  if (jenis_pendaftaran != "") params["jenis_pendaftaran"] = jenis_pendaftaran;
  if (nama_fasilitator != "") params["nama_fasilitator"] = nama_fasilitator;
  if (jenis_layanan != "") params["jenis_layanan"] = jenis_layanan;

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/inquiry/download-excel-lph`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    return err.data || { error: "Gagal mengambil data dari server." };
  });

  return data || null;
});
