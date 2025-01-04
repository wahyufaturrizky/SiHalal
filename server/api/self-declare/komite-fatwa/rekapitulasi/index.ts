import type { NuxtError } from "nuxt/app";
import { formatToISOString } from "~/utils/formatToISOString";

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

  const { page, size, startDate, endDate, searchQuery } = (await getQuery(
    event
  )) as {
    page: string;
    size: string;
    startDate: string;
    endDate: string;
    searchQuery: string;
  };

  const params: any = {
    page: Number.isNaN(Number.parseInt(page, 10))
      ? 1
      : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10))
      ? 10
      : Number.parseInt(size, 10),
    start_date: formatToISOString(new Date()),
    end_date: formatToISOString(new Date()),
    keywords: "",
  };

  if (startDate !== "" && startDate !== undefined)
    params["start_date"] = startDate;
  if (endDate !== "" && endDate !== undefined) params["end_date"] = endDate;
  if (searchQuery !== "" && searchQuery !== undefined)
    params["keywords"] = searchQuery;

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/self-declare/rekapitulasi`,
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
