import './styles/main.scss'

const todos = []
let filtered = false
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

function displayError(selector, error){
  const formElement = document.querySelector(selector)
  const errorParagraph = document.querySelector(`${selector} + p.error`)

  errorParagraph.innerText = error
  formElement.classList.add("error")
  errorParagraph.classList.remove("hide")
}
function hideError(selector){
  const todoInput = document.querySelector(selector)
  const errorParagraph = document.querySelector(`${selector} + p.error`)
  
  todoInput.classList.remove("error")
  errorParagraph.classList.add("hide")
}

function showDialog(){
  const dialog = document.querySelector("dialog")
  const fadeLayer = document.querySelector(".fade-layer")
  const dialogInput = dialog.querySelector("input")
  dialogInput.focus()
  dialogInput.setSelectionRange(0, dialogInput.value.length)

  dialog.setAttribute("open", "")
  fadeLayer.classList.add("show")
}

function hideDialog(){
  const dialog = document.querySelector("dialog")
  const fadeLayer = document.querySelector(".fade-layer")
  
  hideError("dialog input")
  dialog.removeAttribute("open")
  fadeLayer.classList.remove("show")
}

function toggleTodo(todo, li){
  todo.done = !todo.done
  li.classList.toggle("done")    
  renderTodosLeft()
  persist()
}

function updateTodo(todo, li){
  const updateInput = document.querySelector("dialog input")
  if(updateInput.value.length < 3){
    displayError("dialog input", "At least 2 characters")
    return
  }
  todo.content = updateInput.value
  li.querySelector(".content").innerText = updateInput.value
  hideDialog()
  persist()
} 

function showEditDialog(todo, li){
  const updateInput = document.querySelector("dialog input")
  updateInput.value = todo.content  
  showDialog()
  const saveButton = document.querySelector("dialog button")
  saveButton.addEventListener("click", () => updateTodo(todo, li))
}

function deleteTodo(todo, li){
  const index = todos.findIndex(t => t.id === todo.id)
  todos.splice(index, 1)
  li.remove()
  persist()
}

function renderTodo(todo){
  const todoList = document.querySelector(".todo-list")
  const li = document.createElement("li")

  li.classList.add("todo-item")
  li.setAttribute("data-id", todo.id)

  if(todo.done){
    li.classList.add("done")
  }
  li.innerHTML = todoTemplate(todo)
  
  li.addEventListener("click", () => toggleTodo(todo, li))
  li.querySelector(".edit")
    .addEventListener("click", (event) => {
      event.stopPropagation()
      showEditDialog(todo, li)
    })
  li.querySelector(".delete")
    .addEventListener("click", () => deleteTodo(todo, li))

  todoList.append(li)
}

function renderTodosLeft(){
  const p = document.querySelector(".todos-left strong")
  p.innerText = todosLeft()
}

function filterTodos(){
  filtered = !filtered 

  todos
  .filter(todo => todo.done)
  .forEach(todo => {
      const li = document.querySelector(`[data-id="${todo.id}"]`)
      if(filtered){
        li.classList.add("hidden")
      }else{
        li.classList.remove("hidden")
      }
  })
}

function addTodoController(){
  const todoInput = document.querySelector(".todo-input")
  if(todoInput.value.length < 3){

    displayError(
      ".todo-input",
      "At least 2 characters"
    )
    return
  }
  hideError(".todo-input")
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

  const toggleDoneCheckbox = document.querySelector(".toggle-done")
  toggleDoneCheckbox.addEventListener("click", filterTodos)

  const fadeLayer = document.querySelector(".fade-layer")
  fadeLayer.addEventListener("click", hideDialog)
}
main()