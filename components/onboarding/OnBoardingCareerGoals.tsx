"use client";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import OnBoardingAddSkills from "./OnBoardingAddSkills";

const STORAGE_KEY = "onboarding.careerGoals.skills";

function OnBoardingCareerGoals() {
  const [skills, setSkills] = useLocalStorageState<string[]>(STORAGE_KEY, []);

  const addSkill = (skill: string) => {
    setSkills((prev) => [...prev, skill]);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const clearSkills = () => {
    setSkills([]);
  };

  return (
    <div>
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldGroup className="gap-3">
              <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                <Field>
                  <FieldLabel htmlFor="">Current Role</FieldLabel>
                  <Input placeholder="" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="">Target Role</FieldLabel>
                  <Input placeholder="" />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="">Industry</FieldLabel>
                <Input placeholder="" />
              </Field>
              <Field>
                <FieldLabel htmlFor="">Career Goals</FieldLabel>
                <Textarea rows={5} placeholder="" />
              </Field>

              <Field>
                <FieldLabel>Skills You Want to Build</FieldLabel>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(item)}
                          className="ml-2 inline-flex items-center opacity-70 hover:opacity-100"
                          aria-label={`Remove ${item}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2">
                  <OnBoardingAddSkills skills={skills} onAdd={addSkill} />

                  {skills.length > 0 && (
                    <Button type="button" variant="ghost" onClick={clearSkills}>
                      Clear
                    </Button>
                  )}
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
        <div className="flex mt-4 items-end justify-end gap-3">
          <Button>Back</Button>
          <Button>Complete</Button>
        </div>
      </form>
    </div>
  );
}
export default OnBoardingCareerGoals;
