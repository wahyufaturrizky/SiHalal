export const downloadDocument = async (filename: string, param?: string) => {
  try {
    const response = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
        param: param && `dirName=${param}`,
      },
    });

    window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("error.data = ", error.data);
    if (error.data?.statusCode === 404 || error.statusCode === 404) {
      useSnackbar().sendSnackbar(
        error.data?.statusMessage || error.statusMessage,
        "error"
      );
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  }
};
