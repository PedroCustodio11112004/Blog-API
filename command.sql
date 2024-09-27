CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
  PRIMARY KEY (`id`)
) ENGINE='InnoDB' COLLATE 'utf8mb4_unicode_ci';

INSERT INTO users (name, email, senha, role, active)
VALUES ('Pedro', 'Pedro@gmail.com', '1234', '1234', 1);