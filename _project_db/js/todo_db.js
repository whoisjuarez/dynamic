const fetchItems = async (url) => {
   const res = await fetch(url);
   const data = await res.json();
   displayItems(data);
}

fetchItems('app/todo_db_select.php');

const displayItems = (data) => {
   const list = document.querySelector('.list');
   list.innerHTML = '';

   let div = document.createElement('div');
   div.classList.add('container');

   data.forEach((listToDo) => {
      let article = document.createElement('article');
      article.setAttribute('id', `${listToDo.todoID}`);
      article.classList.add('item');
      article.innerHTML = 
      `<a href="" class="btn-check-no" data-id="${listToDo.todoID}"><i class="fa-regular fa-square-check"></i></a>

      <a href="" class="btn-check-yes" data-id="${listToDo.todoID}"><i class="fa-solid fa-square-check"></i></a>
      
      <p id="item_desc">${listToDo.item}</p>
      
      <a href="" class="btn-edit" data-id="${listToDo.todoID}"><i class="fa-solid fa-pen-to-square"></i></i></a>
      
      <a href="" class="btn-delete" data-id="${listToDo.todoID}"><i class="fa-regular fa-trash-can"></i></a>`;

      // <i class="fa-solid fa-caret-right arrow"></i>
      
      div.appendChild(article);
   })
   list.appendChild(div);

   // "Complete" event listener
   const btnCheckNo = document.querySelectorAll('.btn-check-no');
   btnCheckNo.forEach(checkBtnNo => {
      checkBtnNo.addEventListener('click', getCompletedFormData);
   });
   
   // Delete event listener
   const deleteBtn = document.querySelectorAll('.btn-delete');
   deleteBtn.forEach(btnDelete => {
      btnDelete.addEventListener('click', deleteFormData);
   });

   // Edit event listener
   const editBtn = document.querySelectorAll('.btn-edit');
   editBtn.forEach(btnEdit => {
      btnEdit.addEventListener('click', getEditFormData);
   });
}

// To start ADD items when add button clicked
const addBtn = document.querySelector('#add_btn');
addBtn.addEventListener('click', getFormData);

// To start ADD items when enter key pressed
const addForm = document.querySelector('#add_form');
addForm.addEventListener('submit', getFormData);

function getFormData(e) {
   e.preventDefault();
   const addFormData = new FormData(addForm);
   let addUrl = 'app/todo_db_insert.php';
   addItem(addFormData, addUrl);
}

const addItem = async (data, addUrl) => {
   const addRes = await fetch(addUrl, {
      method: 'POST',
      body: data
   });
   const confirmation = await addRes.json(); 
   console.log(confirmation);

   if (addRes.status === 200) {
      console.log("Successfully added!");
      addForm.reset();
      fetchItems("app/todo_db_select.php");
   } else {
       console.log("Failed to add.");
   }
}

/* ==================================================== */
// COMPLETE items from the list 
// function completedFormData(e) {
//    e.preventDefault();

//    let element = e.target.parentNode;
//    // console.log(element.dataset.id);
//    // const completedFormData = new FormData();
//    // completedFormData.append('todoID', element.dataset.id); 
//    const itemId = element.dataset.id;

//    let completedItems = document.querySelectorAll('.item');
//    completedItems.forEach(item => {
//       if (item.id === itemId) { // Compare the item's ID with the clicked button's ID
//          let itemDesc = item.querySelector('#item_desc'); // Find the item description
//          itemDesc.style.textDecoration = 'line-through';
//       }
//    });

//    // Change item color when editing
//    let notEditItems = document.querySelectorAll('.item');
//    notEditItems.forEach(item => {
//       if (item === element) {
//          item.style.background = '#f3ca00';
//       } else {
//          item.style.background = '';
//       }
//    });
// };

// const itemCompleted = document.querySelector('#item_desc');

function getCompletedFormData(e) {
   e.preventDefault();
   let element = e.target.parentNode;
   const itemId = element.dataset.id;

   let completedUrl = 'app/todo_db_completed.php';

   completedFormData(itemId, completedUrl);
}

const completedFormData = async (itemId, completedUrl) => {
   const completedItemData = new FormData();
   completedItemData.append('todoID', itemId);

   const completedDataRes = await fetch(completedUrl, {
      method: 'POST',
      body: completedItemData
   });

   const confirmation = await completedDataRes.json();
   console.log(confirmation);

   if (completedDataRes.status === 200) {
      console.log('Successfully completed!');
      // let itemDesc = element.querySelector("#item_desc");
      // itemDesc.classList.add("completed");
      fetchItems('app/todo_db_select.php');
   } else {
      console.log('Failed to complete.');
   }
}
   





/* ==================================================== */
// DELETE items from the list 
function deleteFormData(e){
   e.preventDefault();
   let element = e.target.parentNode;
   // console.log(element.dataset.id);
   const deleteFormData = new FormData();
   deleteFormData.append('todoID', element.dataset.id); 
   
   let deleteUrl = 'app/todo_db_delete.php';
   deleteItem(deleteFormData, deleteUrl);
}

const deleteItem = async (data, deleteUrl) => {
   const deleteRes = await fetch(deleteUrl, {
      method: 'POST',
      body: data
   });
   const confirmation = await deleteRes.json();
   console.log(confirmation);
   
   if (deleteRes.status === 200) {
      console.log("Successfully deleted!");
      fetchItems("app/todo_db_select.php");
   } else {
       console.log("Failed to delete.");
   }
}

/* ==================================================== */
// EDIT items from the list 
let editFormInput = document.querySelector('#edit_form_field');
let editBgColor = '';
function getEditFormData (e){
   e.preventDefault();
   addForm.style.display = 'none'; // HIDE
   editForm.style.display = 'grid'; // SHOW

   let element = e.target.parentNode.parentNode;
   editFormInput.value = element.querySelector('#item_desc').textContent;
   editFormInput.dataset.id = element.id;
   
   // Change item color when editing
   let editingColorItem = document.querySelectorAll('.item');
   editingColorItem.forEach(item => {
      if (item === element) {
         item.style.background = '#f3ca00';
      } else {
         item.style.background = '';
      }
   });
}

let saveBtn = document.querySelector('#save_btn');
saveBtn.addEventListener('click', editItem);

let editForm = document.querySelector('#edit_form');
editForm.addEventListener('submit', editItem);

function editItem(e) {
   e.preventDefault();
   let itemId = editFormInput.dataset.id;
   let editUrl = 'app/todo_db_edit.php';
   
   saveEditedItem(itemId, editUrl);
};

const saveEditedItem = async (itemId, editUrl) => {
   let newItemValue = editFormInput.value;

   const editedItemData = new FormData();
   editedItemData.append('todoID', itemId);
   editedItemData.append('item', newItemValue);

   const saveEditedRes = await fetch(editUrl, {
      method: 'POST',
      body: editedItemData
   });

   const confirmation = await saveEditedRes.json();
   console.log(confirmation);

   if (saveEditedRes.status === 200) {
      console.log('Successfully updated!');
      editForm.reset();

      addForm.style.display = 'grid'; // SHOW 
      editForm.style.display = 'none'; // HIDE 

      fetchItems('app/todo_db_select.php');
   } else {
      console.log('Failed to update.');
   }
}