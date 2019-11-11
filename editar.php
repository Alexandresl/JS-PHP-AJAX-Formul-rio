<?php

include "connection.php";

$novoNome = $_GET['nome'];
$cpf = $_GET['cpf'];
$id = $_GET["id"];
$result = false;

if ($id != "") {
$connection = connect();
$sql = "UPDATE cliente SET nome = '$novoNome', cpf = '$cpf' WHERE id=$id";
$result = mysqli_query($connection, $sql);
disconnect($connection);
}

// ternary if
echo ($result == true) ? "{\"result\": \"true\", \"id\": \"".$id."\"}" : "{\"result\": \"false\"}";

?>