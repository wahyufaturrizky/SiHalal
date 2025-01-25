export const downloadCert = async (cert_id: string) => {
  try {
    const response = await $api("/certificate/download", {
      method: "post",
      body: {
        cert_id,
      },
    });
    console.log(response);
    const url = URL.createObjectURL(response);
    const a = document.createElement("a");

    a.href = url;
    a.download = "certificate.zip"; // Specify the file name
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
