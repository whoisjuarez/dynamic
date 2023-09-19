<?php

$host = "localhost:3306";
$db = "andre69_todo";
$user = "andre69";
$pass = "1Al0Cs236901234";

// connect to db
$link = mysqli_connect($host, $user, $pass, $db);

// check connection
$db_res = [];
$db_res['success'] = 'not set';

if(!$link){
    $db_res['success'] = false;
}else{
    $db_res['success'] = true;
}

// ECHO OUT WHEN LIVE:
// echo json_encode($db_res);