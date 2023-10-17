-- migrate:up
CREATE TABLE `subscription` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `month` varchar(4) NOT NULL,
  `price` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE subscription;