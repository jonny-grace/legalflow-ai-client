"use client";

import { useState } from "react";
import Link from "next/link";
import { useDashboardMetrics } from "@/hooks/useDashboard";
import { useCases } from "@/hooks/useCases";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { CaseTable } from "@/components/cases/CaseTable";
import { CaseFilters } from "@/components/cases/CaseFilters";
import {
  MetricsSkeleton,
  TableSkeleton,
} from "@/components/shared/LoadingSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { CaseFilters as CaseFiltersType } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const [filters, setFilters] = useState<CaseFiltersType>({
    page: 1,
    limit: 20,
  });

  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: casesData, isLoading: casesLoading } = useCases(filters);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and triage incoming legal inquiries
        </p>
      </div>

      {/* Metrics */}
      {metricsLoading ? (
        <MetricsSkeleton />
      ) : metrics ? (
        <MetricsCards metrics={metrics} />
      ) : null}

      {/* Cases section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            All Cases
            {casesData && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({casesData.meta.total} total)
              </span>
            )}
          </h2>
          <Link href="/">
            <Button variant="outline" size="sm">
              View Intake Form
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <CaseFilters filters={filters} onChange={setFilters} />

        {/* Table */}
        {casesLoading ? (
          <TableSkeleton />
        ) : casesData ? (
          <>
            <CaseTable cases={casesData.data} />

            {/* Pagination */}
            {casesData.meta.totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Page {casesData.meta.page} of {casesData.meta.totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={casesData.meta.page <= 1}
                    onClick={() =>
                      setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={casesData.meta.page >= casesData.meta.totalPages}
                    onClick={() =>
                      setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))
                    }
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No cases yet"
            description="New client submissions will appear here."
          />
        )}
      </div>
    </div>
  );
}
