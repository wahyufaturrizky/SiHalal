export const formatDateIntl = (date: any) => {
  return new Intl.DateTimeFormat("en-GB").format(date);
};
