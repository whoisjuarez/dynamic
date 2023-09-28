# Database:
## Users
	• id
	• name
	• email
	• password

## List
	• id
	• item
	• user id
	• status (0/1)
	• timestamp

# Php-database:
	• connect
	• insert
	• update
	• select
	• delete

# Js:
## Login
	• Login form
	• Check php (app/todo_db_login.php) session to check 
	  if users are logged in:
		• Yes -> load items
		• No -> load form to login (index.html)
	• If user don't exist, sign up

## Sign up 
	• Load form to register (index.html)
	• Insert user (app/todo_db_signup)
		• If successful, show message
		• Load login form

## Insert item (app/todo_db_insert.php):
	• Type new item into form 
	• Refresh display / select (app/todo_db_select.php)

## Check item completed (app/todo_db_completed.php):
	• Button change from box to checked box
	• Button change colour
	• Item text showed with line-through effect

## Edit item (app/todo_db_edit.php)
	• Hide form to add item
	• Show form to edit item
		• Form same colour as the button
		• Refresh display / select (app/todo_db_select.php)

## Delete item (app/todo_db_delete.php)
	• Delete item from database
	• Refresh display / select (app/todo_db_select.php)

## Filter items
• Button to show all items 
• Button to show completed items
• Button to show pending items

## Log out (app/todo_db_logout.php)
	• load form to sign in (index.html)

# File structure:
## _project_db_v2
	• index.html
	• todolist.html
## app/
	• _includes/
		• todo_db_connect.php
	• todo_db_completed.php
	• todo_db_delete.php
	• todo_db_edit.php
	• todo_db_insert.php
	• todo_db_login.php
	• todo_db_logout.php
	• todo_db_select.php
	• todo_db_signup.php
### css/
	• todo_db_btn_style.css
	• todo_v2_db_style.css
### js/
	• todo_db_login-logout.js
	• todo_v2_db.js
	• todo_db_signup.js
