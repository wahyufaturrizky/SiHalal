export const formatToISOString = (date: any) => {
  if (date) {
    const tempDate = new Date(date);

    return tempDate.toISOString().split("T")[0];
  }

  return "";
};
