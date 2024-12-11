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
  const { page, size, nama_pengajuan, tgl_tagihan, tgl_jatuh_tempo, status } =
    (await getQuery(event)) as {
      page: string;
      size: string;
      nama_pengajuan: string;
      tgl_tagihan: string;
      tgl_jatuh_tempo: string;
      status: string;
    };
  let params = {
    page: isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10),
    size: isNaN(parseInt(size, 10)) ? 10 : parseInt(size, 10),
  };
  if (nama_pengajuan != "") {
    params["nama_pengajuan"] = nama_pengajuan;
  }
  if (tgl_tagihan != "") {
    params["tgl_tagihan"] = tgl_tagihan;
  }
  if (tgl_jatuh_tempo != "") {
    params["tgl_jatuh_tempo"] = tgl_jatuh_tempo;
  }
  if (status != "") {
    params["status"] = status;
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/fasilitator/invoice/list`,
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
