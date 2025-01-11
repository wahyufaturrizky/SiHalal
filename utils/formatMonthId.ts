export const formatMonthId = (date: any) => {
  if (date) {
    const tempDate = new Date(date);

    return tempDate.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return "";
}