export const formatFromIsoString = (date: any) => {
  if (date) {
    const tempDate = new Date(date);

    // Define an array of month names
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustust",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    // Extract the year, month, and day
    const year = tempDate.getUTCFullYear();
    const month = monthNames[tempDate.getUTCMonth()]; // Convert 0-based month to name
    const day = tempDate.getUTCDate(); // Get the day of the month

    // Format as YYYY MMM DD
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  }
  return "";
};
