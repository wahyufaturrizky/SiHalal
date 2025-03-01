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
    console.log("error = ", error.data);
    if (error.statusCode === 404) {
      useSnackbar().sendSnackbar(error.statusMessage, "error");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  }
};
