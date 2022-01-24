export interface ValidationErrors {
  status?: "error" | "success" | "warning";
  message?: string;
  index?: number;
}
