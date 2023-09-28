<?php

$host = "localhost:3306";
$db = "database";
$user = "user";
$pass = "password";

// connect to db
$link = mysqli_connect($host, $user, $pass, $db);

// check connection
$db_res = [];
$db_res['db connection'] = 'not set';

if(!$link){
    $db_res['db connection'] = false;
}else{
    $db_res['db connection'] = true;
}

// ECHO OUT WHEN LIVE:
// echo json_encode($db_res);

return $link;
