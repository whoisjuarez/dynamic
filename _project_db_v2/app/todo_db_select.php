<?php
    //connect to db - $link
    require_once '_includes/todo_db_connect.php';

    // prepare statement passing the db $link and the sql
    $stmt = mysqli_prepare($link, 'SELECT * FROM todo ORDER BY timestamp DESC'); //'todo'is the table name, not the db --- 'ASC' from oldest to newest | 'DESC' from newest to oldest

    // execute the statement/query from table
    mysqli_stmt_execute($stmt);

    // get the results
    $result = mysqli_stmt_get_result($stmt);

    // loop through the results and create and array
    while($row = mysqli_fetch_assoc($result)){
        //create an array of the results and add each row to it
        $results_array[] = $row; 
    }

    // convert the array encoding to json
    echo json_encode($results_array);

    // close the connection to the db
    mysqli_close($link);
?>