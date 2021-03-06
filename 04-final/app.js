const todoList = document.querySelector(".todo__list");
const todoForm = document.querySelector(".todo__add");

// An initial list of dummy to-do items
let items = [
  { title: "Learn CSS Grid Layout",
    done: true
  },
  {
    title: "Feed the cat",
    done: false
  },
  {
    title: "Learn how to use Firefox Debugger",
    done: false
  }
];

// A function to add a new To-Do item
const addTodo = e => {
  e.preventDefault();
  const title = document.querySelector(".todo__input").value;
  const todo = {
    title,
    done: false
  };
  
  items.push(todo);
  saveList();
  document.querySelector(".todo__add").reset();
};

// A function to create the To-Do list from the items array
const createList = (list = [], listTarget) => {
  listTarget.innerHTML = list
    .map(
      (item, i) => `
        <li class="todo__item">
          <input type="checkbox" id="todo${i}" data-index="${i}" ${item.done
        ? "checked"
        : ""} />
          <label for="todo${i}">
            <img src="./img/check.svg" class="todo__done" data-index="${i}" />
            <div class="todo__text">${item.title}</div>
            <span class="todo__delete" data-index="${i}">Delete</span>
          </label>
        </li>
      `
    )
    .join("");
};

// a function to mark a single task as complete
const toggleDone = e => {
  const el = e.target;
  if (!el.classList.contains("todo__done")) return;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  saveList();
};

// a function to delete a single task
const removeSingle = e => {
  const el = e.target;
  if (!el.classList.contains("todo__delete")) return;
  const index = el.dataset.index;
  spliceItem(index);
};

// a fuction to remove a specific item from a list
const spliceItem = index => {
  const newItems = items.splice(index, 1);
  saveList();
};

// function to save list
const saveList = () => {
  createList(items, todoList);
};

// set up event listeners
todoList.addEventListener("click", toggleDone);
todoList.addEventListener("click", removeSingle);
todoForm.addEventListener("submit", addTodo);

// Init list
createList(items, todoList);
