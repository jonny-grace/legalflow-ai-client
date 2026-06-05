import { FileText, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/types";

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: "Total Cases",
      value: metrics.totalCases,
      icon: FileText,
      description: "All time submissions",
      iconClassName: "text-slate-600",
      bgClassName: "bg-slate-100",
    },
    {
      title: "New Cases",
      value: metrics.newCases,
      icon: Clock,
      description: "Awaiting review",
      iconClassName: "text-blue-600",
      bgClassName: "bg-blue-100",
    },
    {
      title: "High Priority",
      value: metrics.highPriorityCases,
      icon: AlertCircle,
      description: "Require urgent attention",
      iconClassName: "text-red-600",
      bgClassName: "bg-red-100",
    },
    {
      title: "Closed Cases",
      value: metrics.closedCases,
      icon: CheckCircle,
      description: "Resolved or rejected",
      iconClassName: "text-green-600",
      bgClassName: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${card.bgClassName}`}>
                <Icon className={`h-4 w-4 ${card.iconClassName}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {card.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
