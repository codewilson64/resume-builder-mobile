export function formatDate(date: Date | string | null): string {
  if (!date) return "";

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatUpdatedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) return "Updated recently";
  if (diffInHours < 48) return "Updated yesterday";

  return `Updated ${date.toLocaleDateString()}`;
}