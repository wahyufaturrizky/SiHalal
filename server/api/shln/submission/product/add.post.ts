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
  const { shln_id, manufactur_id, name, hs_code_id } = await readBody(event);
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/certificate-halal-foreign/add/product`,
    {
      method: "POST",
      headers: { Authorization: authorizationHeader },
      body: {
        shln_id: shln_id,
        manufactur_id: manufactur_id,
        name: name,
        hs_code_id: hs_code_id,
      },
    }
  ).catch((err) => {
    setResponseStatus(event, 400);
    return err.data;
  });
  return data || null;
});
