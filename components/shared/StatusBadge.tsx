import { Badge } from "@/components/ui/badge";
import { CaseStatus } from "@/types";
import { getStatusConfig } from "@/lib/utils";

interface StatusBadgeProps {
  status: CaseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
