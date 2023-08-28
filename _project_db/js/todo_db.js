const fetchItems = async (url) => {
   const res = await fetch(url);
   const data = await res.json();
   displayItems(data);
}

// call function to fetch data
fetchItems('app/todo_db_select.php');

const displayItems = (data) => {
   // select element from html where we'll list the items
   const list = document.querySelector('.list');
   // clear the list to show it again with the new item added
   list.innerHTML = '';

   // create a div where the items will be shown
   let div = document.createElement('div');
   div.classList.add('container');

   data.forEach((listToDo) => {
      // create article tag to show the items
      let article = document.createElement('article');
      article.innerHTML = `<i class="fa-solid fa-caret-right arrow"></i>
      <p id="item_desc">${listToDo.item}</p>
      <a href="" class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></i></a>
      <a href="" class="btn-delete"><i class="fa-regular fa-trash-can"></i></a>`;
      div.appendChild(article);
   })
   list.appendChild(div);
}

// make the button add items to the list
const addButton = document.querySelector('#add_btn');
addButton.addEventListener('click', getFormData);

function getFormData(e){
   e.preventDefault();

   // get the data from the form & call async function
   const addFormData = new FormData(document.querySelector('#add_form'));
   // the url could be declared inside the async function too
   let url = 'app/todo_db_insert.php';
   addingItem(addFormData, url);
}

const addingItem = async (data, url) => {
   // create an js object with the data, to pass some headers
   const res = await fetch(url, {
      method: 'POST',
      // the data we got from the form (FormData) with the addFormData and will be send (even using 'fetch'), passing through the 'data', to the form ('body')
      body: data
   });

   const confirmation = await res.json(); // get the confirmation
   console.log(confirmation);

   // call function again to refresh the page
   fetchItems('app/todo_db_select.php');
}

// Random article-list bg color function
// function random_article_color() {
//    let x = Math.floor(Math.random() * 256);
//    let y = Math.floor(Math.random() * 256);
//    let z = Math.floor(Math.random() * 256);
//    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
//    console.log(bgColor);
//    const articles = document.querySelectorAll('article');
//    articles.forEach((article) => {
//       article.style.background = bgColor;
//    });
// }
