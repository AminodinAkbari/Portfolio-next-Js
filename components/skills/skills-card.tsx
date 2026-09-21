"use client";

import { SkillGroup } from "@/config/skills";
import { AnimatedSection } from "@/components/common/animated-section";
import SkillItem from "@/components/skills/skill-item";

interface SkillsCardProps {
  groups: SkillGroup[];
}

export default function SkillsCard({ groups }: SkillsCardProps) {
  // chunk sections into pairs so we can render 2 per row
  const rows: SkillGroup[][] = [];
  for (let i = 0; i < groups.length; i += 2) {
    rows.push(groups.slice(i, i + 2));
  }

  return (
    <div className="space-y-12">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-10 lg:grid-cols-2 lg:gap-12"
        >
          {row.map((group, colIndex) => (
            <AnimatedSection
              key={group.title}
              direction="up"
              delay={0.05 * (rowIndex * 2 + colIndex)}
              className={
                colIndex === 1
                  ? "lg:border-l lg:border-border lg:pl-12"
                  : ""
              }
            >
              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                  {group.title}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {group.skills.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      ))}
    </div>
  );
}