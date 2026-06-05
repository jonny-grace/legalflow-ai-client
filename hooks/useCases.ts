import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api";
import { CaseFilters, PaginatedResponse, CaseListItem, Case } from "@/types";

// ── Fetch cases list ───────────────────────────────────────

export function useCases(filters: CaseFilters = {}) {
  return useQuery({
    queryKey: ["cases", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.caseType) params.append("caseType", filters.caseType);
      if (filters.search) params.append("search", filters.search);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));

      const response = await api.get<{
        success: boolean;
        data: PaginatedResponse<CaseListItem>;
      }>(`/cases?${params.toString()}`);

      return response.data.data;
    },
  });
}

// ── Fetch single case ──────────────────────────────────────

export function useCase(id: string) {
  return useQuery({
    queryKey: ["cases", id],
    queryFn: async () => {
      const response = await api.get<{
        success: boolean;
        data: Case;
      }>(`/cases/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}

// ── Update case status ─────────────────────────────────────

export function useUpdateCaseStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await api.patch(`/cases/${id}/status`, { status });
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["cases", variables.id] });
      toast.success("Case status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update case status. Please try again.");
    },
  });
}

// ── Re-analyze case ────────────────────────────────────────

export function useReAnalyzeCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (caseId: string) => {
      const response = await api.post(`/ai/analyze/${caseId}`);
      return response.data.data;
    },
    onSuccess: (_, caseId) => {
      queryClient.invalidateQueries({ queryKey: ["cases", caseId] });
      toast.success("AI analysis regenerated successfully");
    },
    onError: () => {
      toast.error("Failed to regenerate analysis. Please try again.");
    },
  });
}
