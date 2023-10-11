-- migrate:up
CREATE TABLE `health_infos` (
  `id` int PRIMARY KEY NOT NULL,
  `weight` int NULL,
  `skeletal_muscle_mass` int NULL,
  `bmi` int NULL,
  `body_fat` int NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `health_infos` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- migrate:down
DROP TABLE health_infos;