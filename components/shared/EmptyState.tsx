import { FileX, Search } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "file" | "search";
}

export function EmptyState({
  title,
  description,
  icon = "file",
}: EmptyStateProps) {
  const Icon = icon === "search" ? Search : FileX;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
}
