CREATE DATABASE TasksDatabase;
GO

CREATE TABLE tasks
(
    task_id INT IDENTITY(1, 1) PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL,
    created_at TIME(0) NULL,
    [description] VARCHAR(250)
);
GO

CREATE PROCEDURE uspInsertInToTasks
    @task_name VARCHAR(50),
    @created_at TIME(0),
    @description VARCHAR(250)
AS
BEGIN
    SET NONCOUNT ON
    INSERT INTO tasks
        (
        [task_name],
        [created_at],
        [description]
        )
    VALUES
        (
            @task_name,
            @created_at,
            @description
    )
END
GO

CREATE PROCEDURE uspUpdateasks
    @task_id INT,
    @task_name VARCHAR(50),
    @created_at TIME(0),
    @description VARCHAR(250)
AS
BEGIN
    SET NONCOUNT ON
    UPDATE tasks SET 
           task_name = @task_name,
           created_at = @created_at,
           [description] = @description
        WHERE
        task_id = @task_id
END
GO