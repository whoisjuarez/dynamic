<?php


$is_invalid = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $link = require __DIR__ . "/database.php";

  $sql = sprintf(
    "SELECT * FROM todo_users 
                  WHERE email = '%s'",
    $link->real_escape_string($_POST["email"])
  );

  $result = $link->query($sql);

  $user = $result->fetch_assoc();

  if ($user) {

    if (password_verify($_POST["password"], $user["password_hash"])) {

      session_start();

      session_regenerate_id();

      $_SESSION["user_id"] = $user["id"];

      header("Location: index.php");

      exit;
    }
  }

  $is_invalid = true;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>

<body>

  <h1>login</h1>

  <?php if ($is_invalid) : ?>

    <p>Invalid login</p>

  <?php endif; ?>

  <form method="post">

    <label for="email">email</label>

    <input type="email" name="email" id="email" value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">


    <label for="password">password</label>

    <input type="password" name="password" id="password">

    <button>Log In</button>

  </form>

</body>

</html>