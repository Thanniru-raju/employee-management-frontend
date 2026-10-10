// Centralized API Service for Spring Boot REST endpoints
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/employees';

/**
 * Helper to handle HTTP responses and extract detailed error messages
 */
async function handleResponse(response) {
  if (response.status === 204) {
    return { success: true };
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(
      (data && data.message) ||
      (typeof data === 'string' && data) ||
      `HTTP error ${response.status}: ${response.statusText}`
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const employeeService = {
  // 1. Fetch all employees (or search by keyword)
  async getAllEmployees(search = '') {
    const url = search ? `${API_BASE_URL}?search=${encodeURIComponent(search)}` : API_BASE_URL;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // 2. Fetch single employee by ID
  async getEmployeeById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // 3. Create a new employee
  async createEmployee(employeeData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    return handleResponse(response);
  },

  // 4. Update an existing employee
  async updateEmployee(id, employeeData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    return handleResponse(response);
  },

  // 5. Delete an employee
  async deleteEmployee(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  // 6. Get total count
  async getEmployeeCount() {
    const response = await fetch(`${API_BASE_URL}/count`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

export default employeeService;
