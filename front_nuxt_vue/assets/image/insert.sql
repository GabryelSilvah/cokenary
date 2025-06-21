create database if not exists receitas_db;
use receitas_db;


#Cargos
insert into cargos (nome)
values ("cozinheiro"), ("editor"), ("degustador"),("administrador");

#Funcionarios
insert into funcionarios (dt_adm, nome, rg, salario, cargo_id)
values 
("2025-05-21","Gabriel",456534525,34343,1),
("2025-05-21","Pedro",36339205,34343,2),
("2025-05-21","Williams",459274952,34343,3),
("2025-05-21","Vitória",769774952,34343,3),
("2025-05-21","Vinicius",876344525,34343,1),
("2025-05-21","Marcos",14977493,34343,2);


#Usuarios
insert into usuarios (email, senha, fk_funcionario, role)
values 
("Gabryel08","",1,1),
("Pedro04","",2,2),
("Williams03","",3,3),
("Vitória02","",4,3),
("Vinicius05","",5,1),
("Marcos01","",6,2);



#Categorias
insert into categorias(nome_categoria)
values ("carnes"),("sobremesas/doces"),("salgados"),("massas"),("caldos");

#Ingredientes
insert into ingredientes (nome) values ("Açúcar"),("Sal"),("Pimenta"),("Pimentão"),("Orégano"),("Chocolate"),("Limão"),("Creme de Leite");

#Medidas
insert into medidas (nome_med) values ("ml"),("colher"), ("xícara de chá"), ("copo"),("tijela"),("garrafa");

#Receitas
insert into receitas(data_criacao, modo_preparo, nome_receita, categoria_id, cozinheiro_id)
values 
("2025-01-28","Adicione a farinha...","Bolo de Limão",2,1),
("2025-02-07","Comece preparando a carne...","Strogonoff de Carne",1,5),
("2025-05-04","Corte em fatias levemente finas...","Filé à Parmegiana",1,5);


#Avaliações

insert into avaliacoes(data_alteracao, data_avaliada, nota_avaliacao, fk_degustador, fk_receita)
values 
(null,"2025-06-19",7,3,1), (null,"2025-06-19",8,4,1),
(null,"2025-06-19",8,3,2), (null,"2025-06-19",9,4,2),
(null,"2025-06-19",9,3,3), (null,"2025-06-19",10,4,3);


#Métricas
insert into metricas (media_avaliacoes, quantidade_livros, quantidade_receitas, fk_funcionario)
values (0,0,1,1),(0,0,2,2);



#Composição
insert into receitas_and_ingredientes (porcoes, ingrediente_id, medida_id, receita_id)
values 
(2, 1,3,1), (1, 7,3,1),(3,8,2,1),
(1, 2,1,2),(2, 8,3,2),
(2, 4,1,3),(4, 5,2,3);


#Livros
insert into livros(isbn, titulo_livro, fk_editor)
values 
(23232,"Receitas Premium",2),
(34342,"Doce Sabor",2),
(34342,"Sabor Esplêndido ",2),
(63445,"Master Chef",2);


#Publicações de livros
insert into publicacoes_livros (fk_livro, fk_receita)
values
(1,2),(1,3),(1,1),
(2,1),(2,2),
(3,1),(3,2),(3,3),
(4,1),(4,2),(4,3);


