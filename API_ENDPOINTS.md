# EMS Pro API Documentation

This document provides comprehensive information about all available API endpoints for the Employee Management System.

## 🔐 Authentication

All endpoints (except authentication endpoints) require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📋 API Endpoints Overview

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout and revoke tokens
- `GET /api/auth/me` - Get current user info

### User Management Endpoints
- `GET /api/user` - Get all users
- `GET /api/user/{id}` - Get user by ID
- `PUT /api/user/{id}` - Update user
- `DELETE /api/user/{id}` - Delete user
- `POST /api/user/{id}/change-password` - Change user password
- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/profile` - Update current user profile

### Department Management Endpoints
- `GET /api/department` - Get all departments
- `GET /api/department/{id}` - Get department by ID
- `POST /api/department` - Create department
- `PUT /api/department/{id}` - Update department
- `DELETE /api/department/{id}` - Delete department
- `GET /api/department/{id}/employees` - Get department employees
- `GET /api/department/stats` - Get department statistics

### Employee Management Endpoints
- `GET /api/employee` - Get all employees (with pagination and filters)
- `GET /api/employee/{id}` - Get employee by ID
- `POST /api/employee` - Create employee
- `PUT /api/employee/{id}` - Update employee
- `DELETE /api/employee/{id}` - Delete employee
- `GET /api/employee/search` - Search employees
- `GET /api/employee/positions` - Get all positions
- `GET /api/employee/stats` - Get employee statistics

### Dashboard Endpoints
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/employees-by-department` - Get employees by department
- `GET /api/dashboard/salary-distribution` - Get salary distribution
- `GET /api/dashboard/hiring-trends` - Get hiring trends
- `GET /api/dashboard/top-departments` - Get top departments
- `GET /api/dashboard/employee-growth` - Get employee growth data

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "company": "Example Corp"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "refresh_token_here",
  "user": {
    "userId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "Example Corp",
    "role": "User",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "expiresAt": "2024-01-01T00:15:00Z"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as registration response

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token_here"
}
```

**Response:** Same as registration response

### Logout
```http
POST /api/auth/logout
Content-Type: application/json

{
  "refreshToken": "your_refresh_token_here"
}
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "userId": "1",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "User",
  "company": "Example Corp"
}
```

---

## 👥 User Management Endpoints

### Get All Users
```http
GET /api/user
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
[
  {
    "userId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "Example Corp",
    "role": "User",
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-01T12:00:00Z"
  }
]
```

### Get User by ID
```http
GET /api/user/1
Authorization: Bearer <your-jwt-token>
```

### Update User
```http
PUT /api/user/1
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "company": "Example Corp",
  "role": "Admin"
}
```

### Change Password
```http
POST /api/user/1/change-password
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Get Current User Profile
```http
GET /api/user/profile
Authorization: Bearer <your-jwt-token>
```

### Update Current User Profile
```http
PUT /api/user/profile
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "company": "Example Corp"
}
```

---

## 🏢 Department Management Endpoints

### Get All Departments
```http
GET /api/department
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
[
  {
    "departmentId": 1,
    "name": "Engineering",
    "description": "Software development team",
    "managerId": 2,
    "managerName": "Jane Smith",
    "budget": 1200000.00,
    "employeeCount": 15,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get Department by ID
```http
GET /api/department/1
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "departmentId": 1,
  "name": "Engineering",
  "description": "Software development team",
  "managerId": 2,
  "managerName": "Jane Smith",
  "budget": 1200000.00,
  "employeeCount": 15,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "employees": [
    {
      "employeeId": 1,
      "fullName": "John Doe",
      "email": "john@example.com",
      "position": "Software Engineer",
      "departmentName": "Engineering",
      "isActive": true
    }
  ]
}
```

### Create Department
```http
POST /api/department
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Marketing",
  "description": "Marketing and communications",
  "managerId": 3,
  "budget": 500000.00
}
```

### Update Department
```http
PUT /api/department/1
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Engineering",
  "description": "Software development and technical operations",
  "managerId": 2,
  "budget": 1500000.00
}
```

### Get Department Employees
```http
GET /api/department/1/employees
Authorization: Bearer <your-jwt-token>
```

### Get Department Statistics
```http
GET /api/department/stats
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
[
  {
    "departmentId": 1,
    "departmentName": "Engineering",
    "employeeCount": 15,
    "totalSalary": 1200000.00,
    "budget": 1500000.00,
    "budgetUtilization": 80.0
  }
]
```

---

## 👨‍💼 Employee Management Endpoints

### Get All Employees (with pagination and filters)
```http
GET /api/employee?page=1&pageSize=10&searchTerm=john&departmentId=1&isActive=true&position=Engineer
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "items": [
    {
      "employeeId": 1,
      "userId": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "company": "Example Corp",
      "position": "Software Engineer",
      "hireDate": "2024-01-01T00:00:00Z",
      "salary": 80000.00,
      "phone": "+1234567890",
      "address": "123 Main St, City, State",
      "isActive": true,
      "departmentId": 1,
      "departmentName": "Engineering",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalCount": 50,
  "page": 1,
  "pageSize": 10,
  "totalPages": 5,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

### Get Employee by ID
```http
GET /api/employee/1
Authorization: Bearer <your-jwt-token>
```

### Create Employee
```http
POST /api/employee
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "company": "Example Corp",
  "position": "Marketing Manager",
  "hireDate": "2024-01-15T00:00:00Z",
  "salary": 75000.00,
  "phone": "+1234567891",
  "address": "456 Oak Ave, City, State",
  "departmentId": 2
}
```

### Update Employee
```http
PUT /api/employee/1
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "position": "Senior Software Engineer",
  "salary": 90000.00,
  "phone": "+1234567890",
  "address": "123 Main St, City, State",
  "departmentId": 1,
  "isActive": true
}
```

### Search Employees
```http
GET /api/employee/search?term=john
Authorization: Bearer <your-jwt-token>
```

### Get All Positions
```http
GET /api/employee/positions
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
[
  "Software Engineer",
  "Marketing Manager",
  "HR Specialist",
  "Sales Representative"
]
```

### Get Employee Statistics
```http
GET /api/employee/stats
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "totalEmployees": 50,
  "totalSalary": 3500000.00,
  "averageSalary": 70000.00,
  "newHiresThisMonth": 5
}
```

---

## 📊 Dashboard Endpoints

### Get Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "totalEmployees": 50,
  "activeEmployees": 48,
  "totalDepartments": 5,
  "totalSalaryBudget": 3500000.00,
  "newHiresThisMonth": 5,
  "departmentStats": [
    {
      "departmentId": 1,
      "departmentName": "Engineering",
      "employeeCount": 15,
      "totalSalary": 1200000.00,
      "budget": 1500000.00,
      "budgetUtilization": 80.0
    }
  ],
  "recentActivities": [
    {
      "id": 1,
      "type": "hire",
      "description": "New employee John Doe hired as Software Engineer",
      "employeeName": "John Doe",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Employees by Department
```http
GET /api/dashboard/employees-by-department
Authorization: Bearer <your-jwt-token>
```

### Get Salary Distribution
```http
GET /api/dashboard/salary-distribution
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "minSalary": 40000.00,
  "maxSalary": 150000.00,
  "averageSalary": 70000.00,
  "medianSalary": 65000.00,
  "salaryRanges": [
    {
      "range": "$40,000 - $62,000",
      "count": 15,
      "percentage": 30.0
    }
  ]
}
```

### Get Hiring Trends
```http
GET /api/dashboard/hiring-trends
Authorization: Bearer <your-jwt-token>
```

### Get Top Departments
```http
GET /api/dashboard/top-departments
Authorization: Bearer <your-jwt-token>
```

### Get Employee Growth
```http
GET /api/dashboard/employee-growth
Authorization: Bearer <your-jwt-token>
```

---

## 🔧 Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "An error occurred while processing your request"
}
```

---

## 📝 Usage Examples

### Complete Employee Creation Flow
1. **Create Department**
```http
POST /api/department
{
  "name": "Engineering",
  "description": "Software development team",
  "budget": 1200000.00
}
```

2. **Create Employee**
```http
POST /api/employee
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "company": "Example Corp",
  "position": "Software Engineer",
  "hireDate": "2024-01-01T00:00:00Z",
  "salary": 80000.00,
  "departmentId": 1
}
```

3. **Assign Department Manager**
```http
PUT /api/department/1
{
  "name": "Engineering",
  "description": "Software development team",
  "managerId": 1,
  "budget": 1200000.00
}
```

### Dashboard Analytics Flow
1. **Get Overall Stats**
```http
GET /api/dashboard/stats
```

2. **Get Department Breakdown**
```http
GET /api/dashboard/employees-by-department
```

3. **Get Salary Analysis**
```http
GET /api/dashboard/salary-distribution
```

---

## 🚀 Testing with Swagger

The API includes Swagger documentation available at:
```
https://localhost:7001/swagger
```

You can:
- View all available endpoints
- Test endpoints directly from the browser
- See request/response schemas
- Authenticate using the JWT token

---

## 📋 Rate Limiting

Currently, the API doesn't implement rate limiting. For production use, consider implementing:
- Request rate limiting per IP
- API key-based rate limiting
- User-based rate limiting

---

## 🔒 Security Considerations

1. **JWT Tokens**: Store securely, never expose in client-side code
2. **HTTPS**: Always use HTTPS in production
3. **Input Validation**: All inputs are validated server-side
4. **SQL Injection**: Protected by Entity Framework
5. **XSS**: Input sanitization implemented
6. **CORS**: Configured for specific origins

---

## 📞 Support

For API support or questions:
- Check the Swagger documentation
- Review error messages for troubleshooting
- Ensure all required fields are provided
- Verify JWT token is valid and not expired
