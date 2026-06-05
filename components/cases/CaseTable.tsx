"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { CaseListItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface CaseTableProps {
  cases: CaseListItem[];
}

export function CaseTable({ cases }: CaseTableProps) {
  const router = useRouter();

  if (cases.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="No cases found"
        description="No cases match your current filters. Try adjusting your search criteria."
      />
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Client</TableHead>
            <TableHead className="font-semibold">Case Type</TableHead>
            <TableHead className="font-semibold">Priority</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Submitted</TableHead>
            <TableHead className="w-8" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((c) => (
            <TableRow
              key={c.id}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => router.push(`/dashboard/cases/${c.id}`)}
            >
              <TableCell>
                <div>
                  <p className="font-medium text-slate-900">{c.clientName}</p>
                  <p className="text-xs text-gray-500">{c.email}</p>
                </div>
              </TableCell>
              <TableCell>
                {c.aiAnalysis ? (
                  <span className="text-sm text-slate-700">
                    {c.aiAnalysis.caseType}
                  </span>
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    Pending analysis
                  </span>
                )}
              </TableCell>
              <TableCell>
                {c.aiAnalysis ? (
                  <PriorityBadge priority={c.aiAnalysis.priority} />
                ) : (
                  <span className="text-sm text-gray-400">—</span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={c.status} />
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {formatDate(c.createdAt)}
              </TableCell>
              <TableCell>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
