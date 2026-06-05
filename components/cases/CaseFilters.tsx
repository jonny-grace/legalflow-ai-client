"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaseFilters as CaseFiltersType } from "@/types";

interface CaseFiltersProps {
  filters: CaseFiltersType;
  onChange: (filters: CaseFiltersType) => void;
}

export function CaseFilters({ filters, onChange }: CaseFiltersProps) {
  const hasActiveFilters = filters.status || filters.priority || filters.search;

  const clearFilters = () => {
    onChange({ page: 1 });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          value={filters.search ?? ""}
          onChange={(e) =>
            onChange({ ...filters, search: e.target.value, page: 1 })
          }
          className="pl-9"
        />
      </div>

      {/* Status filter */}
      <Select
        value={filters.status ?? "all"}
        onValueChange={(value) =>
          onChange({
            ...filters,
            status:
              value === "all"
                ? undefined
                : (value as CaseFiltersType["status"]),
            page: 1,
          })
        }
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="NEW">New</SelectItem>
          <SelectItem value="REVIEWING">Reviewing</SelectItem>
          <SelectItem value="CONTACTED">Contacted</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>

      {/* Priority filter */}
      <Select
        value={filters.priority ?? "all"}
        onValueChange={(value) =>
          onChange({
            ...filters,
            priority:
              value === "all"
                ? undefined
                : (value as CaseFiltersType["priority"]),
            page: 1,
          })
        }
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="All priorities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-1 text-gray-500"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
