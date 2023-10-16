-- migrate:up
ALTER TABLE orders DROP FOREIGN KEY orders_ibfk_2;
ALTER TABLE payments CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE `orders` ADD FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`);

-- migrate:down
ALTER TABLE payments CHANGE id id int NOT NULL;
