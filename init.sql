CREATE DATABASE IF NOT EXISTS taskdb;
USE taskdb;
CREATE TABLE IF NOT EXISTS tasks (
   id INT AUTO_INCREMENT PRIMARY KEY,
   description VARCHAR(255) NOT NULL
);
INSERT INTO tasks (description) VALUES ('Initial task 1'), ('Initial task 2');
