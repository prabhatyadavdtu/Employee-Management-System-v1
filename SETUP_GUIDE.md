# Complete Setup Guide - EMS Pro with API & JWT Authentication

This guide will walk you through setting up the complete Employee Management System with SQL Server database, .NET Web API, and React frontend with JWT authentication.

## 🗄️ Database Setup

### 1. **SQL Server Setup**
1. Open SQL Server Management Studio (SSMS)
2. Connect to your SQL Server instance
3. Open the `database_setup.sql` file
4. Execute the entire script to create:
   - EMSProDB database
   - Users table
   - RefreshTokens table
   - Departments table
   - Employees table
   - Stored procedures for authentication
   - Sample data

### 2. **Database Configuration**
- The script creates a sample admin user: `admin@emspro.com` / `admin123`
- Default departments are created automatically
- All necessary indexes are created for performance

## 🔧 .NET Web API Setup

### 1. **Prerequisites**
- .NET 8.0 SDK
- Visual Studio 2022 or VS Code
- SQL Server (local or remote)

### 2. **API Configuration**
1. Navigate to the `API` folder
2. Update `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER;Database=EMSProDB;Trusted_Connection=true;TrustServerCertificate=true;"
     },
     "Jwt": {
       "SecretKey": "your-super-secret-key-with-at-least-32-characters-long-for-security",
       "Issuer": "EMSProAPI",
       "Audience": "EMSProClient"
     }
   }
   ```

### 3. **Install Dependencies**
```bash
cd API
dotnet restore
```

### 4. **Run the API**
```bash
dotnet run
```
- API will be available at: `https://localhost:7001`
- Swagger documentation: `https://localhost:7001/swagger`

## ⚛️ React Frontend Setup

### 1. **Update API Configuration**
1. Open `src/services/api.js`
2. Update the `API_BASE_URL` if your API runs on a different port:
   ```javascript
   const API_BASE_URL = 'https://localhost:7001/api';
   ```

### 2. **Install Dependencies**
```bash
cd Client
npm install
```

### 3. **Run the React App**
```bash
npm start
```
- Frontend will be available at: `http://localhost:3000`

## 🔐 Authentication Flow

### **Registration Process**
1. User fills out registration form
2. Frontend sends data to `/api/auth/register`
3. API validates data and checks for existing email
4. Password is hashed using BCrypt
5. User is created in database
6. JWT access token and refresh token are generated
7. Tokens are returned to frontend
8. User is automatically logged in

### **Login Process**
1. User enters email and password
2. Frontend sends credentials to `/api/auth/login`
3. API validates credentials against database
4. Password is verified using BCrypt
5. JWT tokens are generated
6. Last login time is updated
7. Tokens are returned to frontend

### **Token Management**
- **Access Token**: Valid for 15 minutes, used for API requests
- **Refresh Token**: Valid for 7 days, used to get new access tokens
- **Auto-refresh**: Frontend automatically refreshes expired access tokens
- **Secure Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)

## 🛡️ Security Features

### **Password Security**
- Passwords hashed using BCrypt with salt
- Minimum 6 characters required
- Password strength validation in frontend

### **JWT Security**
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Tokens include user claims (ID, email, role, company)
- Refresh tokens are stored in database and can be revoked

### **API Security**
- CORS configured for React app
- JWT Bearer token authentication
- Protected routes require valid tokens
- Token validation on every request

## 📋 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout and revoke tokens
- `GET /api/auth/me` - Get current user info

### **Request/Response Examples**

#### Registration
```json
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "company": "Example Corp"
}

Response:
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

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response: (Same as registration)
```

## 🧪 Testing the System

### **1. Database Test**
```sql
-- Check if tables were created
SELECT * FROM Users;
SELECT * FROM RefreshTokens;
SELECT * FROM Departments;
```

### **2. API Test**
1. Open Swagger UI: `https://localhost:7001/swagger`
2. Test registration endpoint
3. Test login endpoint
4. Test protected endpoints with JWT token

### **3. Frontend Test**
1. Open `http://localhost:3000`
2. Try registering a new user
3. Try logging in with existing user
4. Test navigation between pages
5. Test logout functionality

## 🔧 Troubleshooting

### **Common Issues**

#### Database Connection
- Ensure SQL Server is running
- Check connection string in `appsettings.json`
- Verify database name and server name

#### CORS Issues
- Check CORS configuration in `Program.cs`
- Ensure frontend URL matches CORS policy
- Check browser console for CORS errors

#### JWT Issues
- Verify JWT secret key is at least 32 characters
- Check token expiration times
- Ensure proper token format in requests

#### API Not Starting
- Check if port 7001 is available
- Verify all dependencies are installed
- Check console for error messages

### **Debug Mode**
```bash
# API with detailed logging
cd API
dotnet run --environment Development

# React with detailed logging
cd Client
npm start
```

## 🚀 Production Deployment

### **Security Considerations**
1. Use strong JWT secret key
2. Enable HTTPS
3. Use httpOnly cookies for tokens
4. Implement rate limiting
5. Add request validation
6. Use environment variables for secrets

### **Database**
1. Use production SQL Server instance
2. Configure proper backup strategy
3. Set up monitoring and logging
4. Optimize indexes for performance

### **API**
1. Deploy to Azure, AWS, or other cloud platform
2. Configure proper CORS for production domain
3. Set up SSL certificates
4. Implement logging and monitoring

### **Frontend**
1. Build for production: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Configure environment variables
4. Set up proper domain and SSL

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/)
- [BCrypt Documentation](https://github.com/BcryptNet/bcrypt.net)
- [Entity Framework Documentation](https://docs.microsoft.com/en-us/ef/)
- [React Router Documentation](https://reactrouter.com/)

---

**Happy Coding! 🎉**
