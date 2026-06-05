// ============================================================
// LegalFlow AI — TypeScript Type Definitions
// ============================================================

// ── Enums ──────────────────────────────────────────────────

export type UserRole = "ADMIN" | "REVIEWER";

export type CaseStatus = "NEW" | "REVIEWING" | "CONTACTED" | "CLOSED";

export type CasePriority = "LOW" | "MEDIUM" | "HIGH";

// ── User ───────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// ── Auth ───────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

// ── AI Analysis ────────────────────────────────────────────

export interface AiAnalysis {
  id: string;
  caseId: string;
  caseType: string;
  priority: CasePriority;
  summary: string;
  missingInformation: string[];
  recommendedAction: string;
  confidenceScore: number | null;
  createdAt: string;
}

// ── Audit Log ──────────────────────────────────────────────

export interface AuditLog {
  id: string;
  caseId: string;
  userId: string | null;
  action: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

// ── Case ───────────────────────────────────────────────────

export interface Case {
  id: string;
  clientName: string;
  email: string;
  phone: string | null;
  description: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  aiAnalysis: AiAnalysis | null;
  auditLogs?: AuditLog[];
}

export interface CaseListItem {
  id: string;
  clientName: string;
  email: string;
  phone: string | null;
  status: CaseStatus;
  createdAt: string;
  aiAnalysis: {
    caseType: string;
    priority: CasePriority;
    summary: string;
    confidenceScore: number | null;
  } | null;
}

// ── Pagination ─────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ── Case Filters ───────────────────────────────────────────

export interface CaseFilters {
  status?: CaseStatus | "";
  priority?: CasePriority | "";
  caseType?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// ── Dashboard Metrics ──────────────────────────────────────

export interface DashboardMetrics {
  totalCases: number;
  newCases: number;
  highPriorityCases: number;
  closedCases: number;
  byStatus: Record<CaseStatus, number>;
  byCaseType: Record<string, number>;
}

// ── Intake Form ────────────────────────────────────────────

export interface IntakeFormData {
  clientName: string;
  email: string;
  phone?: string;
  description: string;
}

// ── API Response wrapper ───────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp: string;
  path: string;
}
