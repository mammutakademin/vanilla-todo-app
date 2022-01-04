import './styles/main.scss'

const todos = []
//Todo Model
// {
//   id: String,
//   content: String,
//   done: Boolean
// }

function persist(){
  localStorage.setItem("todos", JSON.stringify(todos))
}
function loadState(){
  const persistedTodos = localStorage.getItem("todos")
  if(persistedTodos){
    todos.push(...JSON.parse(persistedTodos))
  }
}

function todosLeft(){
  let sum = 0
  for(let todo of todos){
    sum += todo.done ? 0 : 1
  }
  return sum
  // return todos.reduce((acc, current) => 
  //   acc + todo.done ? 0 : 1, 0
  // )
}

function generateID(){
  return String(Date.now()) + String(Math.ceil(Math.random()*Math.pow(10,5)))
}

function addTodo(content){
  const todo = {
    id: generateID(),
    content: content,
    done: false
  }
  todos.push(todo)
  persist()
  return todo
}


function todoTemplate(todo){
  return `
  <p class="content">${todo.content}</p>
  <span class="controls">
    <button class="edit material-icons">
      edit
    </button>
    <button class="delete material-icons">
      delete
    </button>
  </span>
  `
}

function displayError(error){
  const todoInput = document.querySelector(".todo-input")
  const errorParagraph = document.querySelector("p.error")

  errorParagraph.innerText = error
  todoInput.classList.add("error")
  errorParagraph.classList.remove("hide")
}
function hideError(){
  const todoInput = document.querySelector(".todo-input")
  const errorParagraph = document.querySelector("p.error")
  
  todoInput.classList.remove("error")
  errorParagraph.classList.add("hide")
}


function renderTodo(todo){
  console.log(todos);
  const todoList = document.querySelector(".todo-list")
  const li = document.createElement("li")
  li.classList.add("todo-item")
  if(todo.done){
    li.classList.add("done")
  }
  li.innerHTML = todoTemplate(todo)

  li.addEventListener("click", () => {
    todo.done = !todo.done
    li.classList.toggle("done")
    renderTodosLeft()
    persist()
  })

  li.querySelector(".edit").addEventListener("click", () => {

  })

  li.querySelector(".delete").addEventListener("click", () => {
    const index = todos.findIndex(t => t.id === todo.id)
    todos.splice(index, 1)
    li.remove()
    persist()
  })

  todoList.append(li)
}

function renderTodosLeft(){
  const p = document.querySelector(".todos-left strong")
  p.innerText = todosLeft()
}

function addTodoController(){
  const todoInput = document.querySelector(".todo-input")
  if(todoInput.value.length < 3){
    displayError("At least 2 characters")
    return
  }
  hideError()
  const todo = addTodo(todoInput.value)
  renderTodo(todo)
  renderTodosLeft()
  todoInput.value = ""
}

function main(){
  loadState()
  todos.forEach(todo => renderTodo(todo))
  renderTodosLeft()

  const addBtn = document.querySelector(".add-todo-btn")
  addBtn.addEventListener("click", addTodoController)
}
main()