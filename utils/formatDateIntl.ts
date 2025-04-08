export const formatDateIntl = (date: any) => {
  const regex = /^(1989|199[0-9]|2[0-9]{3})-/; // tanggal berdiri lppom mui
  const tmp: string = date.toISOString() as string;
  if (regex.test(tmp)) {
    return new Intl.DateTimeFormat("en-GB").format(new Date(date));
  }
};
