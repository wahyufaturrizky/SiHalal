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
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/fasilitator`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });

  return data || null;
});

export interface FacilitatorProfile {
  nama: string;
  alamat: string;
  jenis_fasilitator: string;
  provinsi_code: string;
  kota_code: string;
  kecamatan_code: string;
  kode_pos: string;
  email: string;
  kontak_person: string;
  no_hp: string;
}
