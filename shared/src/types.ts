// Search Types
export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  relevanceScore: number;
}

export interface SearchHistoryEntry {
  id: string;
  query: string;
  resultsCount: number;
  createdAt: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'bot';
  content: string;
  createdAt: string;
}

export interface UserSession {
  id: string;
  userId?: string;
  createdAt: string;
  lastActivity: string;
}

// API Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// Request/Response Types
export interface SearchRequest {
  query: string;
  limit?: number;
  offset?: number;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}

export interface ChatMessageRequest {
  sessionId: string;
  message: string;
  userId?: string;
}

export interface ChatMessageResponse {
  userMessage: ChatMessage;
  botResponse: ChatMessage;
  sessionId: string;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
  hasMore: boolean;
}

export interface CreateSessionRequest {
  userId?: string;
}

export interface CreateSessionResponse {
  sessionId: string;
  createdAt: string;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  database?: 'connected' | 'disconnected';
  timestamp: string;
}
