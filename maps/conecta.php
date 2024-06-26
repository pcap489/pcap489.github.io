<?php

//ARQUIVO PARA CONEXÃO COM O BANCO DE DADOS: conecta.php

date_default_timezone_set('America/Sao_Paulo'); //Fuso horário do Brasil 

$pdo = new PDO("mysql:dbname=mapa;host=localhost;charset=utf8","root","");


?>