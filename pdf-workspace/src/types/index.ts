// ─── User & Auth ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  plan: "free" | "pro" | "team";
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectStatus = "draft" | "active" | "archived";

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  thumbnail_url?: string;
  file_url?: string;
  file_size?: number;
  page_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  file?: File;
}

// ─── Editor ───────────────────────────────────────────────────────────────────

export type ToolType =
  | "select"
  | "text"
  | "image"
  | "rectangle"
  | "circle"
  | "line"
  | "arrow"
  | "signature"
  | "highlight"
  | "draw";

export interface EditorPage {
  id: string;
  project_id: string;
  page_number: number;
  width: number;
  height: number;
  canvas_data?: string;
  thumbnail_url?: string;
}

export interface EditorState {
  activeTool: ToolType;
  activePageIndex: number;
  zoom: number;
  canUndo: boolean;
  canRedo: boolean;
  isLoading: boolean;
  isSaving: boolean;
}

export interface TextProperties {
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
  textAlign: "left" | "center" | "right";
  color: string;
  underline: boolean;
}

export interface ShapeProperties {
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  borderRadius?: number;
}

export interface ElementProperties {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
}

// ─── Annotations ─────────────────────────────────────────────────────────────

export type AnnotationType =
  | "text"
  | "highlight"
  | "underline"
  | "strikethrough"
  | "rectangle"
  | "circle"
  | "freehand"
  | "image"
  | "signature";

export interface Annotation {
  id: string;
  project_id: string;
  page_number: number;
  type: AnnotationType;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  cta: string;
  highlighted: boolean;
}

// ─── UI ───────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
