SHOW DATABASES;
USE b1wdpoaxypzrnn4gdoul;
SHOW TABLES;

CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    identification VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100),
    phone VARCHAR (50)
);

CREATE TABLE facture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periodo DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2)
);

CREATE TABLE state (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state VARCHAR(20) NOT NULL
);

CREATE TABLE transaction_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE platform (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(100) NOT NULL
);


CREATE TABLE transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT,
    id_facture INT,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    transaction_amount DECIMAL(10,2) NOT NULL,
    id_state INT,
    id_type INT,
    id_platform INT,
    FOREIGN KEY (id_customer) REFERENCES customer(id) ON DELETE SET NULL,
    FOREIGN KEY (id_facture) REFERENCES facture(id) ON DELETE SET NULL,
    FOREIGN KEY (id_state) REFERENCES state(id) ON DELETE SET NULL,
    FOREIGN KEY (id_type) REFERENCES transaction_type(id) ON DELETE SET NULL,
    FOREIGN KEY (id_platform) REFERENCES platform(id) ON DELETE SET NULL
);
CREATE TABLE usuarios(id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nombre_usuario VARCHAR(100)UNIQUE NOT NUll,
correo_usuario VARCHAR(100)UNIQUE NOT NUll,
pasword VARCHAR (100)
);
INSERT INTO usuarios(nombrpruebaDBe_usuario,correo_usuario,pasword) VALUES ('Adrian Arboleda','adrian@gmail.com','adrian123') 


-- querys
SELECT c.id AS id_cliente,
c.name,
SUM(t.transaction_amount) AS total_pagado
FROM customer c
JOIN transaction t ON c.id = t.id_customer
GROUP BY c.id, c.name

SELECT 
t.id AS id_transaccion,
p.platform AS plataforma,
c.name AS cliente,
f.id AS id_factura,
t.transaction_amount,
t.date,
t.hour
FROM transaction t
JOIN platform p ON t.id_platform = p.id
JOIN customer c ON t.id_customer = c.id
JOIN facture f ON t.id_facture = f.id
WHERE p.platform = "nequi"
            
SELECT 
f.id AS id_factura,
f.periodo,
f.amount,
f.amount_paid,
c.name AS cliente,
t.id AS id_transaccion,
t.transaction_amount,
t.date,
t.hour
FROM facture f
JOIN customer c ON c.id = (
SELECT id_customer 
FROM transaction 
WHERE id_facture = f.id 
LIMIT 1)
LEFT JOIN transaction t ON t.id_facture = f.id
WHERE f.amount_paid < f.amount OR f.amount_paid IS NULL;


SELECT * FROM transaction;
describe transaction