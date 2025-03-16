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

export const parseFlexibleDate = (date: string) => {
  if (!date || typeof date !== "string") return null;

  let parsedDate: Date | null = null;

  if (date.includes("/")) {
    const [day, month, year] = date.split("/").map(Number);
    parsedDate = new Date(year, month - 1, day);
  } else if (date.includes("-")) {
    const [year, month, day] = date.split("-").map(Number);
    parsedDate = new Date(year, month - 1, day);
  }

  return parsedDate instanceof Date && !isNaN(parsedDate.getTime()) ? parsedDate : null;
}

export const formatToDDMMYYYY = (input: Date | string): string => {
  let date: Date;

  if (typeof input === "string") {
    const match = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [_, year, month, day] = match;
      date = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      return "";
    }
  } else if (input instanceof Date) {
    date = input;
  } else {
    return "";
  }

  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};


export const formatToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
