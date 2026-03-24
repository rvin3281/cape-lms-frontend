export function capitalizeWords(value: string): string {
  if (!value) return "";

  return value
    .trim()
    .replace(/\s+/g, " ") // remove extra spaces
    .split(" ")
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}
