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
  const { submissionId } = event.context.params;
  // console.log(submissionId);

  const baseUrl = `${runtimeConfig.coreBaseUrl}/api/v1`;
  const selfDeclareDetailUrl = `${baseUrl}/halal-certificate-reguler/${submissionId}/detail`;
  const response = await $fetch<any>(selfDeclareDetailUrl, {
    method: "get",
    headers: { Authorization: authHeader },
  }).catch((err: NuxtError) => {
    setResponseStatus(event, 400);
    return err.data;
  });
  console.log(response, "< detail res");

  return response || null;
});
