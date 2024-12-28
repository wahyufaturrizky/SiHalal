import { NuxtError } from "nuxt/app";
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
  const { page, size, keyword, jenis_pengajuan, skala_usaha, propinsi } =
    (await getQuery(event)) as {
      page: string;
      size: string;
      keyword: string;
      jenis_pengajuan: string;
      skala_usaha: string;
      propinsi: string;
    };
  let params = {
    page: isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10),
    size: isNaN(parseInt(size, 10)) ? 10 : parseInt(size, 10),
  };
  if (keyword !== undefined) {
    params["keyword"] = keyword;
  }
  if (jenis_pengajuan != "" && jenis_pengajuan !== undefined) {
    params["jenis_pengajuan"] = jenis_pengajuan;
  }
  if (skala_usaha != "" && skala_usaha !== undefined) {
    params["skala_usaha"] = skala_usaha;
  }
  if (propinsi != "" && propinsi !== undefined) {
    params["propinsi"] = propinsi;
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/business-actor/submission`,
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
