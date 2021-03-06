let todoInput = document.querySelector(".todo-input");
let todoBtn = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterOptions = document.querySelector(".filter-todo");

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCompleteTodo);
filterOptions.addEventListener("click", selectOption);
document.addEventListener("DOMContentLoaded", getTodos)

function addTodo(event) {
    event.preventDefault();
    let todoDiv = document.createElement("div");
    let todoItem = document.createElement("li");
    let completeBtn = document.createElement("button");
    let trashBtn = document.createElement("button");

    todoItem.innerText = todoInput.value;
    completeBtn.innerHTML = `<i class= "fas fa-check"></i>`
    trashBtn.innerHTML = `<i class= "fas fa-trash"></i>`;

    todoDiv.classList.add("todo");
    todoItem.classList.add("todo-item");
    completeBtn.classList.add("complete-btn");
    trashBtn.classList.add("trash-btn")

    
    todoDiv.appendChild(todoItem);
    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);

    addToLocalStorage(todoInput.value);

    todoInput.value = "";

}


function deleteCompleteTodo (event) {
    event.preventDefault();
    let btn = event.target;
    if (btn.classList[0] == "complete-btn") {
        btn.parentElement.classList.toggle("completed")
    }
    if (btn.classList[0] == "trash-btn") {
        btn.parentElement.remove();
        removeFromLocal(btn.parentElement);
    }
}


function addToLocalStorage (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function removeFromLocal (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos () {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        let todoDiv = document.createElement("div");
        let todoItem = document.createElement("li");
        let completeBtn = document.createElement("button");
        let trashBtn = document.createElement("button");

        todoItem.innerText = todo;
        completeBtn.innerHTML = `<i class= "fas fa-check"></i>`;
        trashBtn.innerHTML = `<i class= "fas fa-trash"></i>`;

        todoDiv.classList.add("todo");
        todoItem.classList.add("todo-item");
        completeBtn.classList.add("complete-btn");
        trashBtn.classList.add("trash-btn");

        todoDiv.appendChild(todoItem);
        todoDiv.appendChild(completeBtn);
        todoDiv.appendChild(trashBtn);
        todoList.appendChild(todoDiv);
    })
    
}


function selectOption(event) {
    event.preventDefault();
    let todos = todoList.childNodes;
    let optionValue = event.target.value;
    todos.forEach(function (todo) {
       switch (optionValue) {
         case "all":
           todo.style.display = "flex";
           break;
         case "completed":
           if (todo.classList.contains("completed")) {
             todo.style.display = "flex";
           } else {
             todo.style.display = "none";
           }
           break;
         case "uncompleted":
           if (todo.classList.contains("completed")) {
             todo.style.display = "none";
           } else {
             todo.style.display = "flex";
           }
           break;
       }
    })
    
}