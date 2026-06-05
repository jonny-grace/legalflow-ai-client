import {
  Brain,
  AlertCircle,
  ListChecks,
  ArrowRight,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { Separator } from "@/components/ui/separator";
import { AiAnalysis } from "@/types";
import { formatConfidenceScore, formatDateTime } from "@/lib/utils";

interface AnalysisCardProps {
  analysis: AiAnalysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-slate-900 p-1.5">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-base">AI Analysis</CardTitle>
          </div>
          {analysis.confidenceScore !== null && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Activity className="h-3 w-3" />
              <span>
                {formatConfidenceScore(analysis.confidenceScore)} confidence
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Case type and priority */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Type</p>
            <p className="font-semibold text-slate-900">{analysis.caseType}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Priority</p>
            <PriorityBadge priority={analysis.priority} />
          </div>
        </div>

        <Separator />

        {/* Summary */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Summary
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Missing information */}
        {analysis.missingInformation.length > 0 && (
          <>
            <Separator />
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <ListChecks className="h-3.5 w-3.5 text-orange-500" />
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Missing Information
                </p>
              </div>
              <ul className="space-y-1">
                {analysis.missingInformation.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <AlertCircle className="h-3.5 w-3.5 text-orange-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <Separator />

        {/* Recommended action */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <ArrowRight className="h-3.5 w-3.5 text-blue-500" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Recommended Action
            </p>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {analysis.recommendedAction}
          </p>
        </div>

        {/* Analysis timestamp */}
        <p className="text-xs text-gray-400 pt-1">
          Analyzed {formatDateTime(analysis.createdAt)}
        </p>
      </CardContent>
    </Card>
  );
}
