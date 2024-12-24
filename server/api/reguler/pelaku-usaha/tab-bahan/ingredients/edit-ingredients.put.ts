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
    const query: any = await getQuery(event);
    const payload = await readBody(event);
    console.log(payload, 'payload nya<<<', query);
    

    const response = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/self-declare/${query.id_reg}/ingredients/${query.product_id}`,
      {
        method: "put",
        headers: { Authorization: authHeader },
        body: payload,
      } as any
    );

    return response || null;
  } catch (error) {
    setResponseStatus(event, 400);
    return (error as NuxtError).data;
  }
});
