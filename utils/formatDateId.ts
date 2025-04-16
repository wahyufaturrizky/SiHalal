export const formatDateId = (paramsDate: any) => {
  if (!paramsDate) return "";

  let isoString = "";

  // for handle format paramsDate if like this 21-03-2025 12:27
  if (paramsDate.length === 16) {
    const [date, time] = paramsDate.split(" ");
    const [day, month, year] = date.split("-");

    isoString = `${year}-${month}-${day}T${time}`;
  } else {
    isoString = paramsDate;
  }

  const result = new Date(isoString);

  return result.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
