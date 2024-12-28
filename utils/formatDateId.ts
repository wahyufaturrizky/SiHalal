export const formatDateId = (date: any) => {
  if (date) {
    const tempDate = new Date(date);

    return tempDate.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return "";
}