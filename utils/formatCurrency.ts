export function formatCurrency(amount: number = 0): string {
  return "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
