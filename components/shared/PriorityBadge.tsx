import { Badge } from "@/components/ui/badge";
import { CasePriority } from "@/types";
import { getPriorityConfig } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: CasePriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = getPriorityConfig(priority);

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
