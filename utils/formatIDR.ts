let toIDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
export const formatToIDR = (amount) => {
  return toIDR.format(amount);
};

export const idrToNumber = (amount) => {
  return Number(
    amount
      .replace(/[^\d,-]/g, "")
      .replace(",", ".")
  );
}