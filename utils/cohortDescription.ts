import { slugToTitle } from "./slugToTitle";

type Options = {
  action?: "view" | "manage";
};

export function cohortDescriptionFromSlug(slug: string, opts: Options = {}) {
  const title = slugToTitle(slug);
  const action = opts.action ?? "view";

  if (!title)
    return "View cohort details, learner progress, and performance insights.";

  if (action === "manage") {
    return `Manage "${title}" — update cohort info, monitor learner progress, and review performance insights.`;
  }

  // default: view
  return `View "${title}" cohort details — learners, progress, completion, and key performance insights.`;
}
