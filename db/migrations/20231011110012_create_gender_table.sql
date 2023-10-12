-- migrate:up
CREATE TABLE `gender` (
  `id` int PRIMARY KEY NOT NULL,
  `name` varchar(5) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE gender;