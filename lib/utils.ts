import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { CaseStatus, CasePriority } from "@/types";

// shadcn utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Date formatting ────────────────────────────────────────

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy");
}

export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy h:mm a");
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

// ── Status helpers ─────────────────────────────────────────

export function getStatusConfig(status: CaseStatus) {
  const configs = {
    NEW: {
      label: "New",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    REVIEWING: {
      label: "Reviewing",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    CONTACTED: {
      label: "Contacted",
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
    CLOSED: {
      label: "Closed",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
  };
  return configs[status];
}

// ── Priority helpers ───────────────────────────────────────

export function getPriorityConfig(priority: CasePriority) {
  const configs = {
    HIGH: {
      label: "High",
      className: "bg-red-100 text-red-800 border-red-200",
    },
    MEDIUM: {
      label: "Medium",
      className: "bg-orange-100 text-orange-800 border-orange-200",
    },
    LOW: {
      label: "Low",
      className: "bg-green-100 text-green-800 border-green-200",
    },
  };
  return configs[priority];
}

// ── Audit action labels ────────────────────────────────────

export function getAuditActionLabel(action: string): string {
  const labels: Record<string, string> = {
    CASE_CREATED: "Case submitted",
    STATUS_CHANGED: "Status updated",
    ANALYSIS_GENERATED: "AI analysis completed",
    ANALYSIS_REGENERATED: "AI analysis regenerated",
  };
  return labels[action] ?? action;
}

// ── Confidence score display ───────────────────────────────

export function formatConfidenceScore(score: number | null): string {
  if (score === null) return "N/A";
  return `${Math.round(score * 100)}%`;
}

// ── Error message extraction ───────────────────────────────

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data?.errors?.length > 0) {
      return data.errors[0];
    }
    return data?.message ?? "Something went wrong";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong";
}

// Need to import axios for the type guard
import axios from "axios";
