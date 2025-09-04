-- Create Database (if not exists)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'EMSProDB')
BEGIN
    CREATE DATABASE EMSProDB;
END
GO

USE EMSProDB;
GO

-- Create Users Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        UserId INT IDENTITY(1,1) PRIMARY KEY,
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        Email NVARCHAR(100) UNIQUE NOT NULL,
        PasswordHash NVARCHAR(255) NOT NULL,
        Company NVARCHAR(100) NOT NULL,
        Role NVARCHAR(20) DEFAULT 'User',
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 DEFAULT GETDATE(),
        LastLoginAt DATETIME2 NULL
    );
END
GO

-- Create RefreshTokens Table for JWT
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'RefreshTokens')
BEGIN
    CREATE TABLE RefreshTokens (
        TokenId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        Token NVARCHAR(500) NOT NULL,
        ExpiresAt DATETIME2 NOT NULL,
        IsRevoked BIT DEFAULT 0,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
    );
END
GO

-- Create Departments Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Departments')
BEGIN
    CREATE TABLE Departments (
        DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        ManagerId INT NULL,
        Budget DECIMAL(15,2) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (ManagerId) REFERENCES Users(UserId)
    );
END
GO

-- Create Employees Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Employees')
BEGIN
    CREATE TABLE Employees (
        EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        DepartmentId INT NULL,
        Position NVARCHAR(100) NOT NULL,
        HireDate DATE NOT NULL,
        Salary DECIMAL(10,2) NULL,
        Phone NVARCHAR(20) NULL,
        Address NVARCHAR(255) NULL,
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (UserId) REFERENCES Users(UserId),
        FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
    );
END
GO

-- Create indexes for better performance
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Users_IsActive ON Users(IsActive);
CREATE INDEX IX_RefreshTokens_UserId ON RefreshTokens(UserId);
CREATE INDEX IX_RefreshTokens_Token ON RefreshTokens(Token);
CREATE INDEX IX_Employees_DepartmentId ON Employees(DepartmentId);
CREATE INDEX IX_Employees_IsActive ON Employees(IsActive);

-- Insert sample data
IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'admin@emspro.com')
BEGIN
    INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Company, Role)
    VALUES ('Admin', 'User', 'admin@emspro.com', 
            -- This is a hashed version of 'admin123' using BCrypt
            '$2a$11$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
            'EMS Pro', 'Admin');
END

-- Insert sample departments
IF NOT EXISTS (SELECT * FROM Departments WHERE Name = 'Engineering')
BEGIN
    INSERT INTO Departments (Name, Description, Budget)
    VALUES 
        ('Engineering', 'Software development and technical operations', 1200000.00),
        ('Marketing', 'Marketing and communications', 450000.00),
        ('HR', 'Human resources and recruitment', 320000.00),
        ('Sales', 'Sales and business development', 800000.00);
END

-- Create stored procedure for user registration
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_RegisterUser')
    DROP PROCEDURE sp_RegisterUser
GO

CREATE PROCEDURE sp_RegisterUser
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Email NVARCHAR(100),
    @PasswordHash NVARCHAR(255),
    @Company NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Check if email already exists
        IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
        BEGIN
            RAISERROR ('Email already exists', 16, 1);
            RETURN;
        END
        
        -- Insert new user
        INSERT INTO Users (FirstName, LastName, Email, PasswordHash, Company)
        VALUES (@FirstName, @LastName, @Email, @PasswordHash, @Company);
        
        -- Return the new user ID
        SELECT SCOPE_IDENTITY() AS UserId;
        
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO

-- Create stored procedure for user login
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_ValidateUser')
    DROP PROCEDURE sp_ValidateUser
GO

CREATE PROCEDURE sp_ValidateUser
    @Email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        UserId,
        FirstName,
        LastName,
        Email,
        PasswordHash,
        Company,
        Role,
        IsActive
    FROM Users 
    WHERE Email = @Email AND IsActive = 1;
END
GO

-- Create stored procedure to update last login
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_UpdateLastLogin')
    DROP PROCEDURE sp_UpdateLastLogin
GO

CREATE PROCEDURE sp_UpdateLastLogin
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Users 
    SET LastLoginAt = GETDATE()
    WHERE UserId = @UserId;
END
GO

-- Create stored procedure to save refresh token
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_SaveRefreshToken')
    DROP PROCEDURE sp_SaveRefreshToken
GO

CREATE PROCEDURE sp_SaveRefreshToken
    @UserId INT,
    @Token NVARCHAR(500),
    @ExpiresAt DATETIME2
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Revoke existing tokens for this user
    UPDATE RefreshTokens 
    SET IsRevoked = 1 
    WHERE UserId = @UserId AND IsRevoked = 0;
    
    -- Insert new token
    INSERT INTO RefreshTokens (UserId, Token, ExpiresAt)
    VALUES (@UserId, @Token, @ExpiresAt);
END
GO

-- Create stored procedure to validate refresh token
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_ValidateRefreshToken')
    DROP PROCEDURE sp_ValidateRefreshToken
GO

CREATE PROCEDURE sp_ValidateRefreshToken
    @Token NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        rt.TokenId,
        rt.UserId,
        rt.Token,
        rt.ExpiresAt,
        rt.IsRevoked,
        u.Email,
        u.FirstName,
        u.LastName,
        u.Company,
        u.Role
    FROM RefreshTokens rt
    INNER JOIN Users u ON rt.UserId = u.UserId
    WHERE rt.Token = @Token 
        AND rt.ExpiresAt > GETDATE() 
        AND rt.IsRevoked = 0
        AND u.IsActive = 1;
END
GO

-- Create stored procedure to revoke refresh token
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'sp_RevokeRefreshToken')
    DROP PROCEDURE sp_RevokeRefreshToken
GO

CREATE PROCEDURE sp_RevokeRefreshToken
    @Token NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE RefreshTokens 
    SET IsRevoked = 1 
    WHERE Token = @Token;
END
GO

PRINT 'Database setup completed successfully!';
PRINT 'Sample admin user created: admin@emspro.com / admin123';
