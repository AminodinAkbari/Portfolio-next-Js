interface ProficiencyLabelProps {
  rating: number;
}

export default function ProficiencyLabel({ rating }: ProficiencyLabelProps) {
  const label = rating >= 5 ? "Expert" : "Proficient";

  return (
    <span className="text-xs font-medium text-muted-foreground">
      {label}
    </span>
  );
}
