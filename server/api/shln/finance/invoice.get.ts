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
  onst { page, size, search, status, start_date, end_date } = (await getQuery(
    event
  )) as {
    page: string;
    size: string;
    search: string;
    status: string;
    start_date: string;
    end_date: string;
  };

  const params = {
    page: isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
    size: isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
  };
  
  if (search !== "") {
    params["search"] = search;
  }

  if (status !== "" && status !== "Semua") {
    params["status"] = status;
  }

  if (start_date !== "") {
    params["start_date"] = start_date;
  }

  if (end_date !== "") {
    params["end_date"] = end_date;
  }

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/finance/invoice`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });
  console.log(params,'ini')
  return data || null;
});
