-- migrate:up
CREATE TABLE `foods` (
  `id` int PRIMARY KEY NOT NULL,
  `name` varchar(10) NOT NULL,
  `gram` int NOT NULL,
  `image_url` int NOT NULL,
  `nutrition_id` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `foods` ADD FOREIGN KEY (`nutrition_id`) REFERENCES `nutrition` (`id`);

-- migrate:down
DROP TABLE foods;