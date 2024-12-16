import { NuxtError } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event: any) => {
  const authHeader = getRequestHeader(event, "Authorization");
  if (typeof authHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const query: any = await getQuery(event);
  console.log(query, "< query here");
  const params = {
    page: isNaN(Number.parseInt(query.page, 10))
      ? 1
      : Number.parseInt(query.page, 10),
    size: isNaN(Number.parseInt(query.size, 10))
      ? 1
      : Number.parseInt(query.size, 10),
    keyword: query.keyword,
  };

  const baseUrl = `${runtimeConfig.coreBaseUrl}/api/v1`;
  const selfDeclareListUrl = `${baseUrl}/halal-certificate-reguler/submission/self-declare`;
  const response = await $fetch<any>(selfDeclareListUrl, {
    method: "get",
    headers: { Authorization: authHeader },
    params,
  }).catch((err: NuxtError) => {
    console.log(err, "< err here");
    setResponseStatus(event, 400);
    return err.data;
  });
  console.log(response, "< res here");

  return response || null;
});
