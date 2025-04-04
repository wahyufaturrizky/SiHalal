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
  // const files = await readMultipartFormData(event);
  // if (files == undefined) {
  //   throw createError({
  //     statusCode: 403,
  //     statusMessage: "Need to pass file",
  //   });
  // }
  //   if (files.length != 3) {
  //     throw createError({
  //       statusCode: 403,
  //       statusMessage: "Need to pass file",
  //     });
  //   }

  const { id } = event.context.params;
  const body: any = await readBody(event);

  // return files;
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/business-actor/foreign/${id}/supervisor`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body,
    }
  ).catch((err: NuxtError) => {
    console.log(err.data);
    if (err.data?.code == "4001") {
      throw createError({
        statusCode: err.data?.code,
        statusMessage: err.data?.errors?.list_error[0],
        data: err.data,
      });
    } else {
      setResponseStatus(event, 400);
    }
    return err.data;
  });

  return data || null;
});
