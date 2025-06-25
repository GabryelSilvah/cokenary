create database if not exists receitas_db;
use receitas_db;


#Cargos
insert into cargos (id, nome)
values (1, "cozinheiro"), (2, "editor"), (3, "degustador"),(4, "administrador");


#Funcionarios
insert into funcionarios (dt_adm, nome, rg, salario, cargo_id, status_func)
values 
("2025-05-21","Gabriel",456534525,34343,1,true),
("2025-05-21","Pedro",36339205,34343, 2,true),
("2025-05-21","Williams",459274952,34343,3,true),
("2025-05-21","Vitória",769774952,34343,4,true),
("2025-05-21","Vinicius",876344525,34343,1,true),
("2025-05-21","Marcos",14977493,34343,2,true);


#Usuarios
select * from cargos;
insert into usuarios (email, senha, fk_funcionario, role)
values 
("Gabryel08","$2a$10$Z5x.JMp1E1KefeNUcJhf3.ttRNwvrX.7cVuCMq5cVC/doe4k/xrbG",1,1),
("Pedro04","$2a$10$Z5x.JMp1E1KefeNUcJhf3.ttRNwvrX.7cVuCMq5cVC/doe4k/xrbG",2,2),
("Williams03","$2a$10$Z5x.JMp1E1KefeNUcJhf3.ttRNwvrX.7cVuCMq5cVC/doe4k/xrbG",3,3),
("Vitoria02","$2a$10$Z5x.JMp1E1KefeNUcJhf3.ttRNwvrX.7cVuCMq5cVC/doe4k/xrbG",4,4),
("Vinicius05","$2a$10$Z5x.JMp1E1KefeNUcJhf3.ttRNwvrX.7cVuCMq5cVC/doe4k/xrbG",5,1),
("Marcos01","$2a$10$Z5x.JMp1E1KefeNUcJhf3.ttRNwvrX.7cVuCMq5cVC/doe4k/xrbG",6,2);



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
("2025-01-28","Preaqueça o forno a 180 ºC (temperatura média). Com um pedaço de papel toalha, unte com manteiga uma fôrma de bolo, com furo no meio, de 24 cm de diâmetro – tente fazer uma camada bem fina. Polvilhe com farinha e chacoalhe bem para espalhar. Bata sobre a pia para retirar o excesso.
Numa tigela, passe pela peneira a farinha, o fermento e o sal. Misture e reserve.
Na batedeira, bata a manteiga até formar um creme claro e fofo. Adicione o açúcar e bata apenas para misturar. Numa tigela pequena, quebre um ovo de cada vez e junte ao creme da batedeira, batendo bem entre cada adição para incorporar.
Diminua a velocidade da batedeira e adicione os ingredientes peneirados aos poucos, alternando com o leite. A cada adição, bata apenas para misturar.","Bolo de Limão",2,1),


("2025-02-07","Corte os bifes em tiras (de 5 cm x 2 cm), transfira para uma tigela e mantenha em temperatura ambiente – a carne não pode estar gelada na hora de dourar. Enquanto isso, prepare os outros ingredientes.
Numa tábua, corte os cogumelos-de-paris em 3 fatias e reserve (se preferir, você pode usar champignon em conserva, mas o resultado não será o mesmo). Descasque e pique fino a cebola e o alho.
Leve ao fogo médio uma panela média. Quando aquecer, regue com 1 colher (sopa) de azeite e doure as tiras de carne aos poucos – se colocar todas ao mesmo tempo, elas vão soltar o próprio líquido e cozinhar no vapor, em vez de dourar. Vire com a pinça para dourar por igual.
Transfira as tiras douradas para uma tigela. Doure o restante, sempre regando a panela com um pouco de azeite antes de cada leva.
Diminua o fogo da panela para baixo e regue com mais 1 colher (sopa) de azeite. Adicione a cebola e refogue até murchar por cerca de 3 minutos, raspando bem o fundo da panela – os queimadinhos da carne vão dar sabor ao preparo. Junte o alho e mexa por apenas 1 minuto para perfumar.","Strogonoff de Carne",1,5),


("2025-05-04","Preaqueça o forno a 220 ºC (temperatura alta). Coloque o molho numa tigela e leve para rodar no micro-ondas por 1 minuto apenas para aquecer.
Num prato fundo, quebre o ovo e bata com um garfo. Separe dois pratos rasos; coloque a farinha de trigo em um e a farinha de rosca no outro. Forre uma travessa com papel toalha.
Numa frigideira com borda alta, coloque o óleo e leve ao fogo médio para aquecer. Para saber a temperatura do óleo, mergulhe um palito de fósforo no óleo ainda frio - quando acender é sinal que está na temperatura certa para fritura.
Enquanto o óleo aquece, empane os bifes: tempere com sal e pimenta a gosto; passe os bifes primeiro pela farinha de trigo e bata com as mãos para retirar o excesso; em seguida passe pelo ovo batido e deixe escorrer bem; por último, passe pela farinha de rosca e pressione com a mão para cobrir bem toda a superfície.
Com cuidado, coloque um bife de cada vez no óleo quente e deixe cerca de 40 segundos até dourar um dos lados. Com a escumadeira, vire o bife para dourar o outro lado. Transfira para a travessa forrada com papel-toalha e frite o outro bife.","Filé à Parmegiana",1,5);


#Avaliações

insert into avaliacoes(data_alteracao, data_avaliada, nota_avaliacao, fk_degustador, fk_receita)
values 
(null,"2025-06-19",7,3,1), (null,"2025-06-19",8,4,1),
(null,"2025-06-19",8,3,2), (null,"2025-06-19",9,4,2),
(null,"2025-06-19",9,3,3), (null,"2025-06-19",10,4,3);


#Métricas
insert into metricas (media_avaliacoes, quantidade_livros, quantidade_receitas, fk_funcionario)
values 
(0,0,1,1),
(0,0,2,2),
(0,0,0,3),
(0,0,0,4),
(0,0,0,5),
(0,0,0,6);



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

#Restaurantes
insert into restaurantes(contato, nome, telefone) 
values 
("Araya","Carnes BSB",61986374879);


#Referência
insert into referencias(data_fim, data_inicio, funcionario_id, restaurante_id)
values
(null,"2025-05-21T00:00:00.000+00:00",1,1),
(null,"2025-05-21T00:00:00.000+00:00",2,1),
(null,"2025-05-21T00:00:00.000+00:00",3,1),
(null,"2025-05-21T00:00:00.000+00:00",4,1),
(null,"2025-05-21T00:00:00.000+00:00",5,1),
(null,"2025-05-21T00:00:00.000+00:00",6,1);


