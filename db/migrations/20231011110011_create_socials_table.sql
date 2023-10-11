-- migrate:up
CREATE TABLE `socials` (
  `id` int PRIMARY KEY NOT NULL,
  `name` varchar(10) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE socials;