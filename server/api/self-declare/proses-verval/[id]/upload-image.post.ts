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
  if (files == undefined) {
    throw createError({
      statusCode: 403,
      statusMessage: "Need to pass file and id",
    });
  }
  if (files.length != 2) {
    throw createError({
      statusCode: 403,
      statusMessage: "Need to pass file and id",
    });
  }
  const { id } = event.context.params;
  const formData = new FormData();
  files.forEach((field) => {
    if (field.filename) {
      // Step 3: If the field contains a file, append it as a Blob
      formData.append(
        field.name,
        new Blob([field.data], { type: "text/plain" }),
        field.filename
      ); // `field.value` is a Blob or Buffer
    } else {
      // Regular field (not a file)
      formData.append(field.name, field.data);
    }
  });
  // return files;
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/pendamping/upload-foto/${id}`,
    {
      method: "post",
      headers: { Authorization: authorizationHeader },
      body: formData,
    }
  ).catch((err: NuxtError) => {
    return err.data;
  });

  return data || null;
});
