"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useCase,
  useUpdateCaseStatus,
  useReAnalyzeCase,
} from "@/hooks/useCases";
import { useAuth } from "@/providers/AuthProvider";
import { AnalysisCard } from "@/components/cases/AnalysisCard";
import { AuditTimeline } from "@/components/cases/AuditTimeline";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CaseDetailSkeleton } from "@/components/shared/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  RefreshCw,
  Loader2,
  Brain,
  User,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";
import { CaseStatus } from "@/types";

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const caseId = params.id as string;

  const { data: caseData, isLoading, error } = useCase(caseId);
  const updateStatus = useUpdateCaseStatus();
  const reAnalyze = useReAnalyzeCase();

  const [statusError, setStatusError] = useState<string | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    setStatusError(null);
    try {
      await updateStatus.mutateAsync({ id: caseId, status: newStatus });
    } catch {
      setStatusError("Failed to update status. Please try again.");
    }
  };

  const handleReAnalyze = async () => {
    setAnalyzeError(null);
    try {
      await reAnalyze.mutateAsync(caseId);
    } catch {
      setAnalyzeError("Failed to re-analyze. Please try again.");
    }
  };

  if (isLoading) {
    return <CaseDetailSkeleton />;
  }

  if (error || !caseData) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Case not found or failed to load.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1 text-gray-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {caseData.clientName}
            </h1>
            <p className="text-sm text-gray-500">
              Case #{caseData.id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        <StatusBadge status={caseData.status} />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-slate-900">{caseData.clientName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href={`mailto:${caseData.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {caseData.email}
                </a>
              </div>
              {caseData.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-slate-900">{caseData.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">
                  Submitted {formatDateTime(caseData.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Case description */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Original Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {caseData.description}
              </p>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          {caseData.aiAnalysis ? (
            <AnalysisCard analysis={caseData.aiAnalysis} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Brain className="h-8 w-8 text-gray-300 mb-3" />
                <p className="text-sm font-medium text-gray-500">
                  No AI analysis available
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Analysis may have failed or is still processing
                </p>
                {user?.role === "ADMIN" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={handleReAnalyze}
                    disabled={reAnalyze.isPending}
                  >
                    {reAnalyze.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Generate Analysis
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column - sidebar */}
        <div className="space-y-6">
          {/* Status management */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Case Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-2">Update Status</p>
                <Select
                  value={caseData.status}
                  onValueChange={handleStatusChange}
                  disabled={updateStatus.isPending}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="REVIEWING">Reviewing</SelectItem>
                    <SelectItem value="CONTACTED">Contacted</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
                {updateStatus.isPending && (
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Updating...
                  </p>
                )}
                {statusError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription className="text-xs">
                      {statusError}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Re-analyze button (admin only) */}
              {user?.role === "ADMIN" && caseData.aiAnalysis && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-gray-500 mb-2">AI Analysis</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleReAnalyze}
                      disabled={reAnalyze.isPending}
                    >
                      {reAnalyze.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Re-run Analysis
                        </>
                      )}
                    </Button>
                    {analyzeError && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertDescription className="text-xs">
                          {analyzeError}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Audit timeline */}
          {caseData.auditLogs && caseData.auditLogs.length > 0 && (
            <AuditTimeline auditLogs={caseData.auditLogs} />
          )}
        </div>
      </div>
    </div>
  );
}
