create database if not exists receitas_db;
use receitas_db;


#Cargos
insert into cargos (nome)
values ("cozinheiro"), ("editor"), ("degustador");

#Funcionarios
insert into funcionarios (dt_adm, nome, rg, salario, cargo_id)
values 
("2025-05-21","Gabriel",456534525,34343,1),
("2025-05-21","Pedro",36339205,34343,2),
("2025-05-21","Williams",459274952,34343,3),
("2025-05-21","Vitória",769774952,34343,3),
("2025-05-21","Vinicius",876344525,34343,1),
("2025-05-21","Marcos",14977493,34343,2);

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
("2025-02-07","Comece preparando a carne...","Strogonoff de Carne",1,1),
("2025-05-04","Corte em fatias levemente finas...","Filé à Parmegiana",1,1);

#Composição
insert into receitas_and_ingredientes (porcoes, ingrediente_id, medida_id, receita_id)
values 
(2, 1,3,1), (1, 7,3,1),(3,8,2,1),
(1, 2,1,2),(2, 8,3,2),
(2, 4,1,3),(4, 5,2,3);


