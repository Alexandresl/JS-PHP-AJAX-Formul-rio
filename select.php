<?php
include_once 'connection.php';

function generateJson($result){
        $json = "";
        while ($line = mysqli_fetch_array($result, MYSQLI_ASSOC))
            $json .= "{\"id\":\"".$line["id"]."\",\"nome\":\"".$line["nome"]."\", \"cpf\":\"".$line["cpf"]."\"},";
        $json = substr($json, 0, strlen($json) - 1);
        $json = "[" . $json. "]";
        echo $json;
    }

            // Abre a conexão com o banco de dados 
            $connection = connect();
            $query = "SELECT * FROM CLIENTE";
        
            $result = mysqli_query($connection, $query);
            $json = generateJson($result);

            mysqli_free_result($result);
            /* Fechando a conexão */
            disconnect($connection);
?>