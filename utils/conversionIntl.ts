export const formatCurrencyIntl = (value) => {
  const trim = value.replace(/\$|,/g, "");
  // console.log("currency modal dasar = ", trim);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(parseInt(trim));
};
