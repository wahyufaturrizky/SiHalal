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
  // const { id, idLegal } = event.context.params;
  const body: any = await readBody(event);

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/business-actor/foreign/${body.id_profile}/legal/${body.legal_id}`,
    {
      method: "put",
      headers: { Authorization: authorizationHeader },
      body: {
        document_type: body.document_type,
        document_number: body.document_number,
        date: body.date,
        valid_date: body.valid_date,
        publish_agency: body.publish_agency,
      },
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
