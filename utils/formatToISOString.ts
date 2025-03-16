export const formatToISOString = (date: any) => {
  if (date) {
    const tempDate = new Date(date);

    return tempDate.toISOString().split("T")[0];
  }

  return "";
};


export const convertDDMMYYYYtoISO = (date: string) => {
  if (!date) return "";

  const [day, month, year] = date.split("-")
  const formattedDate = `${year}-${month}-${day}`
  const tempDate = new Date(formattedDate)

  if (isNaN(tempDate.getTime())) {
    return "";
  }

  return tempDate.toISOString().split("T")[0];
};


export const formatToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
