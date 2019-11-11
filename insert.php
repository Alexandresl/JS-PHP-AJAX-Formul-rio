<?php

    include "connection.php";
        $connection = connect();
        $novoNome = $_GET['nome'];
        $cpf = $_GET['cpf'];
        $query = "insert into cliente (nome, cpf) value ('$novoNome', '$cpf')";
        echo mysqli_query($connection, $query);
        disconect($connection);
    ?>