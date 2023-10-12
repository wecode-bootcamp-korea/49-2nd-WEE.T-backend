-- migrate:up
CREATE TABLE `exercises` (
  `id` int PRIMARY KEY NOT NULL,
  `name` varchar(10) NOT NULL,
  `youtube_url` varchar(300) NOT NULL,
  `part_id` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `exercises` ADD FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`);

-- migrate:down
DROP TABLE exercises;