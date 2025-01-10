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
    startDate,
    endDate,
    ketetapan,
    searchQuery,
    workingDays,
  } = (await getQuery(event)) as {
    page: string;
    size: string;
    startDate: string;
    endDate: string;
    ketetapan: string;
    searchQuery: string;
    workingDays: String;
  };

  const params: any = {
    page: Number.isNaN(Number.parseInt(page, 10))
      ? 1
      : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10))
      ? 10
      : Number.parseInt(size, 10),
  };

  if (startDate !== "") {
    const dateStart = new Date(startDate);
    const isoStringStartDate = dateStart.toISOString();

    params["start_date"] = isoStringStartDate.split(".")[0] + "Z";
  }
  if (endDate !== "" && endDate) {
    const dateEnd = new Date(endDate);
    const isoStringEndDate = dateEnd.toISOString();

    params["end_date"] = isoStringEndDate.split(".")[0] + "Z";
  }
  if (ketetapan !== "") params["status"] = ketetapan;
  if (searchQuery !== "") params["keywords"] = searchQuery;
  if (workingDays !== 0)
    params["jumlah_hari_kerja"] = Number.parseInt(workingDays, 10);
  // if (status !== "" && status !== "Semua") {
  //   params["status"] = status;
  // }
  console.log(params, "ini params");
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/self-declare/penetapan`,
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
