const API_BASE_URL = "https://localhost:44390/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  }

  // Authentication endpoints
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse(response);
  }

  async refreshToken(refreshToken) {
    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    return this.handleResponse(response);
  }

  async logout(refreshToken) {
    const response = await fetch(`${this.baseURL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Token management
  setTokens(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  // Check if token is expired
  isTokenExpired(token) {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Auto-refresh token method
  async refreshTokenIfNeeded() {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error("No tokens available");
    }

    if (this.isTokenExpired(accessToken)) {
      try {
        const response = await this.refreshToken(refreshToken);
        this.setTokens(response.accessToken, response.refreshToken);
        return response.accessToken;
      } catch (error) {
        this.clearTokens();
        throw new Error("Token refresh failed");
      }
    }

    return accessToken;
  }

  // Generic authenticated request method
  async authenticatedRequest(url, options = {}) {
    try {
      const token = await this.refreshTokenIfNeeded();

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return this.handleResponse(response);
    } catch (error) {
      if (error.message === "Token refresh failed") {
        // Redirect to login if token refresh fails
        window.location.href = "/login";
      }
      throw error;
    }
  }

  // Get all employees
//   async getAllEmployees() {
//     const response = await this.authenticatedRequest(
//       `${this.baseURL}/employee`,
//       {
//         method: "GET",
//       }
//     );
//     // Ensure we return an array
//     console.log("Response from getAllEmployees:", response);
//     return Array.isArray(response) ? response : [];
//   }

  async getAllEmployees(page = 1, pageSize = 10) {
    const response = await this.authenticatedRequest(
      `${this.baseURL}/employee?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
      }
    );
    console.log("Response from getAllEmployees:", response);
    return {
      items: Array.isArray(response.Items) ? response.Items : [],
      totalCount: response.TotalCount,
      page: response.Page,
      pageSize: response.PageSize,
      totalPages: response.TotalPages,
      hasNextPage: response.HasNextPage,
      hasPreviousPage: response.HasPreviousPage,
    };
  }

  // Get all departments
  async getAllDepartments() {
    return this.authenticatedRequest(`${this.baseURL}/department`, {
      method: "GET",
    });
  }

  // Add new employee
  async addEmployee(employee) {
    return this.authenticatedRequest(`${this.baseURL}/employee/AddEmployee`, {
      method: "POST",
      body: JSON.stringify(employee),
    });
  }

  // Update employee
  async updateEmployee(employee) {
    return this.authenticatedRequest(
      `${this.baseURL}/employee/UpdateEmployee`,
      {
        method: "PUT",
        body: JSON.stringify(employee),
      }
    );
  }

  // Delete employee
  async deleteEmployee(id) {
    return this.authenticatedRequest(
      `${this.baseURL}/employee/DeleteEmployee?id=${id}`,
      {
        method: "DELETE",
      }
    );
  }
}

export default new ApiService();
