CREATE DATABASE UserDatabase;
GO

CREATE TABLE users
(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    [password] CHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
);

GO

ALTER PROCEDURE uspInsertInToUsers
    @username VARCHAR(50),
    @password CHAR(100),
    @email VARCHAR(100)
AS
BEGIN
    SET NONCOUNT ON
    INSERT INTO users
        (
        [username],
        [password],
        [email]
        )
    VALUES
        (
            @username,
            @password,
            @email
    )
END;
GO


ALTER PROCEDURE uspUpdateInToUsers
    @id INT,
    @username VARCHAR(50),
    @email VARCHAR(100)
AS
BEGIN
    SET NONCOUNT ON
    UPDATE users SET
             username = @username,
             email = @email
    WHERE id = @id
END   
GO      