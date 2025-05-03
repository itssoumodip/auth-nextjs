export interface CustomError extends Error {
  code?: string;
  path?: string;
  statusCode?: number;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, unknown>;
}