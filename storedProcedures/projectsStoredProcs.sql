CREATE DATABASE ProjectDatabase;
GO

CREATE TABLE projects
(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    project_name VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL
);
GO

CREATE PROCEDURE uspInsertInToProjects
    @project_name VARCHAR(50),
    @duration VARCHAR(50)
AS
BEGIN
    SET NONCOUNT ON
    INSERT INTO projects
        (
        [project_name],
        [duration]
        )
    VALUES
        (
            @project_name,
            @duration
    )
END;
GO

CREATE PROCEDURE uspUpdateProjects
    @id INT,
    @project_name VARCHAR(50),
    @duration VARCHAR(50)
AS
BEGIN
    SET NONCOUNT ON
    UPDATE projects SET
           project_name = @project_name,
           duration = @duration
    WHERE id = @id
END
GO
