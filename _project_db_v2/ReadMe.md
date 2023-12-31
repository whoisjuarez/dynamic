# Intro
MAYBE LATER? v2 - A minimalist user-friendly list app for the things you have to do now, or maybe later.

Team members: André Cardoso, Andres Hamburger & Tiffany St-Surin | Joint evaluation

This simple note app helps you stay on top of your tasks, organizing your day-to-day life as it goes. If you need to jot down a quick note or just remind of something, MAYBE LATER? is here for you. Keep things simple: be more productive now, or why not do it later and enjoy the moment? You're in control here!

About v2: With this improved version of the classic, you will be able to signup and login with your personal username and password, so you can access your notes on all your devices, staying organized no matter where you are. Also, now you can check tasks as completed and view the list of pending tasks, completed tasks or all your tasks, so you can see your progress and know you're in control.

# Process
## Database:
### Users
- id
- name
- email
- password

### List
- id
- item
- user id
- status (0/1)
- timestamp

## php > db:
- connect
- signup
- login
- insert
- update
- select
- delete
- logout

## js:
### Login
- Login form
- Check php (app/todo_v2_db_login.php) session to check if users are logged in:
	+ Yes -> load items
	+ No -> load form to login (index.html)
 - If user don't exist, option to sign up

### Sign up 
- Load form to register (index.html)
- Insert user (app/todo_v2_db_signup.php):
	+ If successful, show message
 	+ Load login form

### Insert item (app/todo_db_insert.php):
- Type new item into form 
- Refresh display / select (app/todo_v2_db_select.php)

### Check item completed (app/todo_v2_db_completed.php):
- Button change from box to checked box
- Button change colour
- Item text showed with line-through effect

### Edit item (app/todo_db_edit.php)
- Hide form to add item
- Show form to edit item:
	+ Form same colour as the button
 	+ Refresh display / select (app/todo_v2_db_select.php)

### Delete item (app/todo_db_delete.php)
- Delete item from database
- Refresh display / select (app/todo_v2_db_select.php)

### Filter items
- Button to sort items ascending or descenging
- Button to show all items 
- Button to show completed items
- Button to show pending items

### Log out (app/todo_v2_db_logout.php)
- load form to sign in (index.html)

## File structure:
### _project_db_v2
- index.html
- todolist.html
#### app/
- _includes/
	+ todo_db_connect.php
- todo_db_delete.php
- todo_db_edit.php
- todo_db_insert.php
- todo_v2_db_completed.php
- todo_v2_db_login.php
- todo_v2_db_logout.php
- todo_v2_db_select.php
- todo_v2_db_signup.php
#### css/
- todo_db_btn_style.css
- todo_v2_db_style.css
#### js/
- todo_v2_db_signup.js
- todo_v2_db_login.js
- todo_v2_db_list.js
- todo_v2_db_logout.js

