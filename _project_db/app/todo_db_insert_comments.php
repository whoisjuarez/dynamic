<?php
    require_once '_includes/todo_db_connect.php';

    $results_array = []; //create an array to show the results
    $insertedRows = 0; // keep track of the number of rows inserted

    // Adding TRY, CATCH and FINALLY error checking
    try{
        // try and check if we got the info we need from the form
        if(!isset($_REQUEST['item'])){
            throw new Exception('COME ON, GIVE ME SOMETHING TO DO!');
        }

        $query = "INSERT INTO todo (item) VALUES (?)"; // we don't know what the item is so '?' is a placeholder for the item to be inserted - if there was more than one item to be inserted, we would use as much '?' as needed, with comma

        // prepare the statement
        if($stmt = mysqli_prepare($link, $query)){
            // bind the parameters - find the info '?' and pass in the $query
            mysqli_stmt_bind_param($stmt, 's', $_REQUEST['item']); // 's' means string - if there was more than one item to be inserted, we would use as much 's' as needed with no comma --- $_REQUEST can be used to both GET or POST data from the form

            // execute the statement/query from table
            mysqli_stmt_execute($stmt);
            // get the number of rows inserted
            $insertedRows = mysqli_stmt_affected_rows($stmt); 

            // check if we got any inserted
            if($insertedRows > 0){
                // build array to get info back
                $results_array[] = [
                    'insertedRows' => $insertedRows,
                    // get id automatically created when inserting the record using the connection + the method/property 'insert_id'
                    'id' => $link -> insert_id,
                    'item' => $_REQUEST['item']
                ];
            }else{
                throw new Exception('YOU FAILED UGLILY!');
            }
        }else{
            throw new Exception('TRY HARDER!');
        }
    }catch(Exception $error){ //catch Exception and pass in $error as an array
        $results_array[] = ['error' => $error->getMessage()];

    }finally{ //do stuff weather there is an error or not
        // echo json
        echo json_encode($results_array);
    }



    // SQL query copied from phpMyAdmin: INSERT INTO `todo` (`todoID`, `item`, `timestamp`) VALUES (NULL, 'Do Bruce AND Jorge at the same time', current_timestamp());

    // https://andre69.web582.com/dynamic/_project_db/app/todo_db_insert.php?item=Don't forget Jeevesh!