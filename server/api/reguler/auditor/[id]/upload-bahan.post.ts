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

  const files = await readMultipartFormData(event);

  // Ensure files is not empty
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files provided in the request",
    });
  }

  const formData = new FormData();
  const fileBuffer = files[0].data;
  const blob = new Blob([fileBuffer], { type: files[0].type });

  formData.append("file", blob, files[0].filename);

  const { id } = event.context.params;

  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/halal-certificate-reguler/lph/${id}/bahan/upload`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
      body: formData,
    }
  ).catch((err) => {
    return err.data || null;
  });


  return data || null;
});
