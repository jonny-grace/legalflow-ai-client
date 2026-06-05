import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { DashboardMetrics } from "@/types";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: async () => {
      const response = await api.get<{
        success: boolean;
        data: DashboardMetrics;
      }>("/dashboard/metrics");
      return response.data.data;
    },
  });
}
