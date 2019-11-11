<?php
  function connect(){
    $connection = mysqli_connect("localhost", "cpw2", "cpw2");
    mysqli_select_db($connection, "cpw2");
    return $connection;
  }

  function disconnect($connection){
    mysqli_close($connection);
  }
?>