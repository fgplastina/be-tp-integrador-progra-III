CREATE DATABASE IF NOT EXISTS tp_integrador;

USE tp_integrador;

-- Limpio las tablas existentes
DROP TABLE IF EXISTS sale_items;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Tabla de categorías para tener más de un tipo de producto
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Productos
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  category_id TINYINT,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Usuarios (solo para backoffice y posibles compras futuras)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ventas
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--  user_id INT, por ahora no lo vamos a usar
--  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Sale items (detalle de productos vendidos en cada venta)
CREATE TABLE sale_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insertar categorías
INSERT INTO categories (name, description) VALUES
  ('Videojuegos', 'Videojuegos digitales para diversas plataformas'),
  ('Discos físicos', 'Ediciones físicas en caja de videojuegos'),
  ('Giftcards', 'Tarjetas prepagas para tiendas o juegos');

-- Insertar productos
INSERT INTO products (name, description, price, image_url, category_id) VALUES
  ('The Last of Us Parte II', 'Juego de acción y aventura para PS4', 59.99, 'https://example.com/lastofus.jpg', 1),
  ('Cyberpunk 2077', 'RPG de mundo abierto para PC/Consola', 49.99, 'https://example.com/cyberpunk.jpg', 1),
  ('Elden Ring - Edición Física', 'Versión en caja con mapa y póster', 69.99, 'https://example.com/eldenring_disc.jpg', 2),
  ('Giftcard Xbox $25', 'Canjeable en la tienda Xbox', 25.00, 'https://example.com/xbox_card.jpg', 3),
  ('Giftcard PlayStation $50', 'Para usar en la tienda PlayStation', 50.00, 'https://example.com/ps_card.jpg', 3);

-- Insertar usuario admin para backoffice
INSERT INTO users (name, email, password, role) VALUES
  ('Admin User', 'admin@example.com', 'admin_hashed_password', 'admin');

-- Insertar venta de prueba
INSERT INTO sales (total) VALUES
  (134.99);

-- Detalle de la venta
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price) VALUES
  (1, 1, 1, 59.99),
  (1, 5, 1, 50.00),
  (1, 4, 1, 25.00);
