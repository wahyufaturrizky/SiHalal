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
    const { page, size, status } = await readBody(event);

    const params = {};
    params["page"] = page ? page : 1;
    params["size"] = size ? size : 10;

    if (status) {
      params["status"] = status;
    }

    const response: any = await $fetch(
      `${runtimeConfig.coreBaseUrl}/api/v1/fasilitator/invoice/list/download-excel`,
      {
        method: "get",
        headers: { Authorization: authHeader },
        params,
      } as any
    );

    console.log("response = ", response);

    if (!response) {
      throw createError({
        statusCode: response.status,
        statusMessage: "Failed to fetch file",
      });
    }

    // Ensure response headers exist
    // if (!response.headers) {
    //   throw createError({
    //     statusCode: 500,
    //     statusMessage: "No headers received from API",
    //   });
    // }

    const contentType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const contentDisposition = 'attachment; filename="export.xlsx"';

    // Convert response to ArrayBuffer (binary data)
    const buffer: any = await response.arrayBuffer();

    // Set headers and return response
    setResponseHeaders(event, {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
      "Content-Length": buffer.byteLength.toString(),
    });

    return send(event, Buffer.from(buffer));
  } catch (error) {
    const err = error as NuxtError;
    console.error("error = ", err);
    setResponseStatus(event, 400);
    return err.data;
  }
});
