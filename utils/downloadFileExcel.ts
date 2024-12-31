export const downloadFileExcel = async (response: any) => {
  try {
    if (response) {
      const blobData = response;

      // Convert Blob data to ArrayBuffer
      const arrayBuffer = await blobData.arrayBuffer();

      // Create a DataView from the ArrayBuffer
      const dataView = new DataView(arrayBuffer);

      // Create a new Blob from the DataView
      const excelBlob = new Blob([dataView], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(excelBlob);
      link.download = "data.xlsx";

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    }

    return;
  } catch (error) {
    console.log("@error downloadFileExcel", error);
  }
};
