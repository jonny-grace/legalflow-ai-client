import { AuditLog } from "@/types";
import { FileText, RefreshCw, Brain, ArrowRight, Circle } from "lucide-react";
import { formatDateTime, getAuditActionLabel } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuditTimelineProps {
  auditLogs: AuditLog[];
}

function getActionIcon(action: string) {
  switch (action) {
    case "CASE_CREATED":
      return FileText;
    case "STATUS_CHANGED":
      return ArrowRight;
    case "ANALYSIS_GENERATED":
      return Brain;
    case "ANALYSIS_REGENERATED":
      return RefreshCw;
    default:
      return Circle;
  }
}

function getActionColor(action: string) {
  switch (action) {
    case "CASE_CREATED":
      return "bg-blue-100 text-blue-600";
    case "STATUS_CHANGED":
      return "bg-purple-100 text-purple-600";
    case "ANALYSIS_GENERATED":
      return "bg-green-100 text-green-600";
    case "ANALYSIS_REGENERATED":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getMetadataDescription(
  action: string,
  metadata: Record<string, unknown> | null,
): string | null {
  if (!metadata) return null;

  if (action === "STATUS_CHANGED") {
    return `${metadata.previousStatus} → ${metadata.newStatus}`;
  }

  if (action === "ANALYSIS_GENERATED" || action === "ANALYSIS_REGENERATED") {
    return `${metadata.caseType} · ${metadata.priority} priority`;
  }

  return null;
}

export function AuditTimeline({ auditLogs }: AuditTimelineProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Case Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {auditLogs.map((log, index) => {
            const Icon = getActionIcon(log.action);
            const colorClass = getActionColor(log.action);
            const isLast = index === auditLogs.length - 1;
            const metaDescription = getMetadataDescription(
              log.action,
              log.metadata,
            );

            return (
              <div key={log.id} className="flex gap-3">
                {/* Timeline line and icon */}
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-1.5 ${colorClass}`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-gray-200 my-1" />}
                </div>

                {/* Content */}
                <div className={`pb-4 ${isLast ? "" : ""}`}>
                  <p className="text-sm font-medium text-slate-900">
                    {getAuditActionLabel(log.action)}
                  </p>
                  {metaDescription && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {metaDescription}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-xs text-gray-400">
                      {formatDateTime(log.createdAt)}
                    </p>
                    {log.user && (
                      <>
                        <span className="text-gray-300">·</span>
                        <p className="text-xs text-gray-400">{log.user.name}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
