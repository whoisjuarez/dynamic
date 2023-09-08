<?php
   require_once '_includes/todo_db_connect.php';

   $results_array = []; 
   $insertedRows = 0; 

   try{
         if(!isset($_REQUEST['item']) || trim($_REQUEST['item']) === ''){
            throw new Exception('COME ON, GIVE ME SOMETHING TO DO!');
         }else{
            $query = "INSERT INTO todo (item) VALUES (?)";

            if($stmt = mysqli_prepare($link, $query)){
               mysqli_stmt_bind_param($stmt, 's', $_REQUEST['item']);

               mysqli_stmt_execute($stmt);
               $insertedRows = mysqli_stmt_affected_rows($stmt); 

               if($insertedRows > 0){
                  $results_array[] = [
                     'insertedRows' => $insertedRows,
                     'id' => $link -> insert_id,
                     'item' => $_REQUEST['item']
                  ];
               }else{
                  throw new Exception('YOU FAILED UGLILY!');
               }
            }else{
               throw new Exception('TRY HARDER!');
            }
         }
   }catch(Exception $error){
      $results_array[] = ['Try again, please' => $error->getMessage()];

   }finally{
      echo json_encode($results_array);
   }
?>