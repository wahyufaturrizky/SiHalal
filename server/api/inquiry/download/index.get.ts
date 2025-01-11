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

  const { no_daftar, merek_dagang, kode_fac, status } = (await getQuery(
    event
  )) as {
    no_daftar: string;
    merek_dagang: string;
    status: string;
    kode_fac: string;
  };

  let params = {};

  if (no_daftar != "") {
    params["no_daftar"] = no_daftar;
  }

  if (merek_dagang != "") {
    params["merek_dagang"] = merek_dagang;
  }

  if (status != "") {
    params["status"] = status;
  }

  if (kode_fac != "") {
    params["kode_fac"] = kode_fac;
  }
  console.log("@params", params);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/inquiry/download-excel`,
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
