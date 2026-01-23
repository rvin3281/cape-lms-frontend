export function formatUserName(input?: string | null): string {
  if (!input) return "";

  return (
    input
      .trim()
      // split by dot, underscore, dash, or space (1 or more)
      .split(/[._\-\s]+/)
      .filter(Boolean)
      .map((word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(" ")
  );
}
