-- migrate:up
CREATE TABLE `badges` (
  `id` int PRIMARY KEY NOT NULL,
  `level` int NOT NULL,
  `image_url` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE badges;