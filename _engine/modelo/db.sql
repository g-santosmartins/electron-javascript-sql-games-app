drop database rentGames;
create database rentGames;
use rentGames;

CREATE TABLE `produto` (
  `codigo` int(11) NOT NULL auto_increment primary key,
  `nome` varchar(30),
  `descricao` varchar(500) DEFAULT NULL,
  `preco` float DEFAULT NULL,
  `qtde` int(11) NOT NULL,
  `categoria` varchar(30),
  `produtora` varchar(30),
  `previewurl` varchar(500)
);

insert into produto(nome,descricao,preco,qtde,categoria,produtora,previewurl)values('The Last of Us',
' Na história, os jogadores controlam Joel, um homem encarregado de escoltar uma adolescente chamada Ellie através de um Estados Unidos pós-apocalíptico. The Last of Us é jogado a partir de uma perspectiva em terceira pessoa, com os jogadores usando armas de fogo, armas improvisadas e furtividade a fim de defenderem-se de humanos hostis e criaturas canibalísticas infectadas por uma mutação do fungo Cordyceps.'
,10.00,
2,
'aventura',
'Naughty Dog',
'https://images.igdb.com/igdb/image/upload/t_original/ar4s8.png'),
('Dragon Ball Z Budokai Tenkaichi 3',
'O jogo foi baseado no mangá e no anime Dragon Ball, e é o primeiro jogo da série a ter conexão Wi-Fi na versão do Nintendo Wii.[5]Budokai Tenkaichi 3 também possui mais de 150 personagens jogáveis e mais de 30 estágios; elementos recorrentes em relação a seu antecessor, Budokai Tenkaichi 2',
10.00,
2,
'luta',
'Namco Bandai',
'https://images.launchbox-app.com/e898a707-66a7-4d8f-8ca6-54c3fb23e978.jpg'),
('Final Fantasy XV',
'É o décimo quinto título principal da série Final Fantasy e faz parte da subsérie Fabula Nova Crystallis, formada por jogos que compartilham uma mesma mitologia. Originalmente desenvolvido como um título derivado chamado de Final Fantasy Versus XIII',
10.00,
2,
'rpg',
'Square Enix',
'https://m.media-amazon.com/images/M/MV5BYmVkYzhmNDktYmMxZi00M2VhLWEyMjMtMmI1Mjc0NDQyNzBhXkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_UY1200_CR250,0,630,1200_AL_.jpg');


