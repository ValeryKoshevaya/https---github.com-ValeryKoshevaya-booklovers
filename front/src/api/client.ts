// Використовуємо proxy в розробці, або прямий URL
const API_URL = import.meta.env.VITE_API_URL || '';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid/expired: clear stored auth and bubble a clear error
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Недійсний або прострочений токен. Увійдіть знову.');
      }
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(email: string, password: string, name: string) {
    return this.request<{ token: string; user: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // User endpoints
  async getMe() {
    return this.request<any>('/api/users/me');
  }

  async updateMe(data: { 
    name?: string; 
    username?: string; 
    bio?: string;
    favoriteGenres?: string[];
    readingGoal?: number;
  }) {
    return this.request<any>('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    const token = this.getToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/users/me/avatar`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Books endpoints
  async getBooks() {
    return this.request<any[]>('/api/books');
  }

  async getReadingStats() {
    return this.request<any>('/api/books/stats');
  }

  async createBook(data: { title: string; author?: string; description?: string; totalPages?: number }) {
    return this.request<any>('/api/books', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBook(bookId: number, data: { pagesRead?: number; totalPages?: number; isRead?: boolean }) {
    return this.request<any>(`/api/books/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(API_URL);

