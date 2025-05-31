create database receitas_db;
use receitas_db;

#Deletar banco
drop database receitas_db;
delete from funcionarios;

#Selecionar
select * from funcionarios;
select * from cargos;
select * from categorias;
select * from receitas;


#Cargo
insert into cargos
(data_fim, data_inicio, descricao, ind_ativo, nome) values ("2025-05-21","2025-05-21","",true,"Editor");

#Funcionário
insert into funcionarios(id_func, dt_adm, nome, rg, salario, cargo_id) values (1,"2025-05-21","Gabriel",1111,34343,1);
insert into funcionarios(id_func, dt_adm, nome, rg, salario, cargo_id) values (2,"2025-05-21","Pedro",113411,34343,1);

#categoria
insert into categorias(id_cat, nome_categoria) values (1,"Salgados");

#receitas
insert into receitas(id_receita, data_criacao, modo_preparo, nome_receita, categoria_id, cozinheiro_id) values (1,"2025-05-28","geladeira","Sorvete de limão",1,1);