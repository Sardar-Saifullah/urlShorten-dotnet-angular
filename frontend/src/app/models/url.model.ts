// TypeScript models matching your C# backend models

export interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string; // ISO date string from API
  updatedAt: string | null; // ISO date string or null
  accessCount: number;
}

export interface CreateUrlRequest {
  url: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

