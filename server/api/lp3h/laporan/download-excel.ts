import type { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const {
    status_reg,tgl_daftar,fac_id, search,page, size
  } = (await getQuery(event)) as {
    status_reg: string;
    tgl_daftar: string;
    fac_id: string;
    search: string;
    page: number;
    size: number;

  };

  try {
    const runtimeConfig = useRuntimeConfig();

    const params = {
      status_reg,
      tgl_daftar,
      fac_id,
      search,
      page,
      size
    }

    console.log("PARAMS : ", params)

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/pendamping/halal-certificate-reguler/filter/pengajuan/download-excel`,
      {
        method: "get",
        headers: { Authorization: authHeader },
        params,
        responseType: "blob"
      } as any
    )

    setResponseHeaders(event, {
      "Content-Disposition": 'attachment; filename="data.xlsx"',
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return response;
  } catch (error) {
    console.log(error.message);
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
