CREATE TABLE receita (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    chef VARCHAR(100),
    difficulty VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL,
    rating DECIMAL(3,1),
    image VARCHAR(255)

);
