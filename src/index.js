import './styles/main.scss'

const todos = []
//Todo Model
// {
//   content: String,
//   done: Boolean
// }

function addTodo(content){
  const todo = {
    content: content,
    done: false
  }
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