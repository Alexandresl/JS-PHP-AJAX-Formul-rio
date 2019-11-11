<?php


    /**
     * Disconnects from the MySql data base
     */
    include "connection.php";


  $id = $_GET["id"];
  $result = false;
  if ($id != "") {
    $connection = connect();
    $sql = "DELETE FROM cliente WHERE id='$id'";
    $result = mysqli_query($connection, $sql);
    disconnect($connection);
  }
  // ternary if
  echo ($result == true)
    ? "{\"result\": \"true\", \"id\": \"".$id."\"}"
    : "{\"result\": \"false\"}";
?>