export const formatToISOString = (date: any) => {
  const tempDate = new Date(date);

  return tempDate.toISOString().split("T")[0];
};
