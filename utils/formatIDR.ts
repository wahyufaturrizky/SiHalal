let toIDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
export const formatToIDR = (amount) => {
  return toIDR.format(amount);
};
