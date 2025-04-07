export const formatDateId = (date: any) => {
  if (!date) return "";

  const tempDate = new Date(date);

  return tempDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
