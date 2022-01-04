import './styles/main.scss'

const todos = []
//Todo Model
// {
//   id: String,
//   content: String,
//   done: Boolean
// }

function generateID(){
  return String(Date.now()) + String(Math.ceil(Math.random()*Math.pow(10,5)))
}

function addTodo(content){
  const todo = {
    id: generateID(),
    content: content,
    done: false
  }
  console.log(todo.id);
  todos.push(todo)
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

function renderTodo(todo){
  const todoList = document.querySelector(".todo-list")
  const li = document.createElement("li")
  li.classList.add("todo-item")
  li.innerHTML = todoTemplate(todo)

  li.addEventListener("click", () => {
    todo.done = !todo.done
    li.classList.toggle("done")
  })

  li.querySelector(".edit").addEventListener("click", () => {})
  li.querySelector(".delete").addEventListener("click", () => {
    const index = todos.findIndex(t => t.id == todo.id)
    todos.splice(index, 1)
    li.remove()
  })


  todoList.append(li)

}

function addTodoController(){
  const todoInput = document.querySelector(".todo-input")
  const todo = addTodo(todoInput.value)
  renderTodo(todo)
  console.log(todos)
}

function main(){
  renderTodo(addTodo("Köp mjölk"))
  renderTodo(addTodo("Köp choklad"))
  const addBtn = document.querySelector(".add-todo-btn")
  addBtn.addEventListener("click", addTodoController)
}
main()