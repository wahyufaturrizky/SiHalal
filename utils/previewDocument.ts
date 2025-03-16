export const previewDocument = async (filename: string, param?: string) => {
  try {
    const minio = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
        param: param && `dirName=${param}`,
      },
    });
    const response = await fetch(minio.url);
    const type = getMimeType(minio.url.split("?")[0].split(".").at(-1));
    const blob = await response.blob();

    // Force the correct content type
    const pdfBlob = new Blob([blob], { type: type });
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(blobUrl, "_blank");

    // window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.log("error = ", error.data);
    if (error.statusCode === 404) {
      useSnackbar().sendSnackbar(error.statusMessage, "error");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  }
};

export const previewAsModal = async (filename: string, param?: string) => {
  try {
    const minio = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
        param: param && `dirName=${param}`,
      },
    });
    const response = await fetch(minio.url);
    const type = getMimeType(minio.url.split("?")[0].split(".").at(-1));
    const blob = await response.blob();

    // Force the correct content type
    const pdfBlob = new Blob([blob], { type: type });
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    return {
      uri: blobUrl,
      status: response.status,
    };

    // window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.log("error = ", error.data);
    if (error.statusCode === 404) {
      useSnackbar().sendSnackbar(error.statusMessage, "error");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  }
};

const mimeTypes = {
  // PDF
  pdf: "application/pdf",

  // Images
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",
  svg: "image/svg+xml",
  tiff: "image/tiff",
  ico: "image/vnd.microsoft.icon",
};

// Function to get MIME type from file extension
function getMimeType(fileName) {
  const ext = fileName.split(".").pop().toLowerCase(); // Extract extension
  return mimeTypes[ext] || "application/octet-stream"; // Default if unknown
}
