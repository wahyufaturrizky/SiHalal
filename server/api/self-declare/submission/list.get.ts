import { NuxtError } from "nuxt/app";

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  try {
    const runtimeConfig = useRuntimeConfig();

    const { page, size, keyword, status, channel_id } = (await getQuery(
      event
    )) as {
      page: string;
      size: string;
      keyword: string;
      status: string;
      channel_id: string;
    };

    const params: any = {
      page: isNaN(Number.parseInt(page, 10)) ? 1 : Number.parseInt(page, 10),
      size: isNaN(Number.parseInt(size, 10)) ? 10 : Number.parseInt(size, 10),
    };

    if (keyword !== "") {
      params["keyword"] = keyword;
    }

    if (channel_id !== "") {
      params["channel_id"] = channel_id;
    }

    if (status !== "") {
      params["status"] = status;
    }

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/submission/self-declare`,
      {
        method: "get",
        headers: { Authorization: authHeader },
        params,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
