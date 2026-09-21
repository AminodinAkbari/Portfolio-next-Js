import { SkillItemData } from "@/config/skills";
import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";

interface SkillItemProps {
  skill: SkillItemData;
}

export default function SkillItem({ skill }: SkillItemProps) {
  const Icon = skill.icon ? Icons[skill.icon] : null;

  return (
    <div className="group flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
        {Icon ? (
          <Icon className="h-5 w-5" />
        ) : (
          <span className="text-xs font-bold text-muted-foreground">
            {skill.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold leading-tight sm:text-base">
          {skill.name}
        </h3>
        <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
          {skill.description}
        </p>
      </div>
    </div>
  );
}