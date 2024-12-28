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
  const id_route = getRouterParam(event, "id");
  const {
    id,
    jenis_bahan,
    nama_bahan,
    kelompok,
    merek,
    produsen,
    no_sertifikat,
  } = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/self-declare/${id_route}/ingredients/${id}`,
    {
      method: "put",
      headers: { Authorization: authorizationHeader },
      body: {
        jenis_bahan,
        nama_bahan,
        kelompok,
        merek,
        produsen,
        no_sertifikat,
      },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });

  return data || null;
});
