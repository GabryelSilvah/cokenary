CREATE TABLE IF NOT EXISTS restaurantes (
    id_restaurante BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    contato VARCHAR(45),
    telefone VARCHAR(15),
    UNIQUE KEY unique_nome (nome)
    );

-- Criação da tabela referencias
CREATE TABLE IF NOT EXISTS referencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    funcionario_id BIGINT NOT NULL,
    restaurante_id BIGINT NOT NULL,
    data_inicio DATE,
    data_fim DATE,
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id_func) ON DELETE CASCADE,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id_restaurante) ON DELETE CASCADE
    );

-- Inserção de dados de exemplo para restaurantes
INSERT INTO restaurantes (nome, contato, telefone) VALUES
   ('Restaurante Bella Vista', 'Maria Silva', '(11) 99999-1234'),
   ('Cantina do Nono', 'Giuseppe Romano', '(11) 98888-5678'),
   ('Bistrô Francês', 'Pierre Dubois', '(11) 97777-9012');