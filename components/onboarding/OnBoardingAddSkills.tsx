"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

type Props = {
  skills: string[];
  onAdd: (skill: string) => void;
};

export function OnBoardingAddSkills({ skills, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const normalizedExisting = useMemo(
    () => new Set(skills.map((s) => s.trim().toLowerCase())),
    [skills],
  );

  const canSave = (() => {
    const s = value.trim();
    if (!s) return false;
    if (normalizedExisting.has(s.toLowerCase())) return false;
    return true;
  })();

  const save = () => {
    if (!canSave) return;
    onAdd(value.trim());
    setValue("");
    setOpen(false);
  };

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Skills
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a skill</DialogTitle>
            <DialogDescription>
              Add skills you want to build. Example: “Leadership”, “SQL”,
              “Public Speaking”.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Input
              placeholder="Type a skill and press Save"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  save();
                }
              }}
              autoFocus
            />

            {/* tiny validation hint */}
            {!value.trim() ? null : normalizedExisting.has(
                value.trim().toLowerCase(),
              ) ? (
              <p className="text-sm text-red-600">
                This skill is already added.
              </p>
            ) : null}
          </div>

          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={save} disabled={!canSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default OnBoardingAddSkills;
