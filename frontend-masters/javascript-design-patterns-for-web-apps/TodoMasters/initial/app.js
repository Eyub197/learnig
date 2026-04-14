import { TodoItem, TodoList } from "./webapp/classes.js"
import { Command, CommandExecuter, Commands } from "./webapp/command.js"
import { LocalStorage } from "./webapp/storage.js"

globalThis.DOM = {}
const DOM = globalThis.DOM

function renderList() {
  const list = TodoList.getInstance()
  DOM.todoList.innerHTML = ""
  for (let todo of list.items) {
    const listItem = document.createElement("li")
    listItem.classList.add("todo-item")
    listItem.innerHTML = `
      ${todo.text}<button class="delete-btn">Delete</button>
      `
    listItem.dataset.text = todo.text
    DOM.todoList.appendChild(listItem)
  }
}

document.addEventListener("DOMContentLoaded", event => {
  DOM.todoList = document.getElementById("todo-list")
  DOM.addBtn = document.getElementById("add-btn")
  DOM.todoInput = document.getElementById("todo-input")

  DOM.addBtn.addEventListener("click", event => {
    const cmd = new Command(Commands.ADD)
    CommandExecuter.execute(cmd)
  })

  DOM.todoList.addEventListener("click", event => {
    if (event.target.classList.contains("delete-btn")) {
      const todoText = event.target.closest("li").dataset.text
      const cmd = new Command(Commands.DELETE, [todoText])
      CommandExecuter.execute(cmd)
    }
  })
})

document.addEventListener("DOMContentLoaded", event => {
  TodoList.getInstance().addObserver(renderList)
})


document.addEventListener("DOMContentLoaded", event => {
  LocalStorage.load()
})

document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key === "p") {
    event.preventDefault()
    const cmd = new Command(Commands.ADD)
    CommandExecuter.execute(cmd)
  }

  if (event.ctrlKey && event.key === "z") {
    const cmd = new Command(Commands.UNDO)
    CommandExecuter.execute(cmd)
  }

})
