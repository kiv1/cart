CREATE DATABASE cart_database;

-- create cart table
CREATE TABLE cart(
    userId VARCHAR(255),
    itemId INT NOT NULL,
    quantity INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, itemId)
);
