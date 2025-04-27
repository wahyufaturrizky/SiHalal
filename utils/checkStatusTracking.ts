export const checkStatusTracking = (data: any[]) => {
  if (!data) return null;

  const sorted = data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const latest = sorted[0];

  if (latest && latest.status.toLowerCase().startsWith("verif"))
    return "verified";

  if (latest && latest.status.toLowerCase().startsWith("return"))
    return "returned";

  return null;
};
