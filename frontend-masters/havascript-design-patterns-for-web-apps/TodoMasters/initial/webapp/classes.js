import { observerMixin } from "./mixin.js"

export class TodoItem {
  constructor(text) {
    this.text = text
  }
  equals(other) {
    return this.text == other.text
  }
}

export class TodoList {
  #data = new Set()

  get items() {
    return this.#data
  }

  // Singelton
  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() to access the list")
    }
  }

  static instance = null

  static {
    this.instance = new TodoList()
  }

  static getInstance() {
    return this.instance
  }

  // List behavior

  add(item) {
    const array = Array.from(this.#data)
    const todoExists = array.filter(t => t.equals(item)).length > 0
    if (!todoExists) {
      this.#data.add(item)
      this.notify()
    }
  }

  delete(todoText) {
    const array = Array.from(this.#data)
    // Todo: check for errors
    const todoToDelete = array.filter(t => t.text == todoText)[0]
    this.#data.delete(todoToDelete)
    this.notify()
  }

  find(todoText) {
    const array = Array.from(this.#data)
    return array.find(t => t.text == todoText)
  }

  replaceList(list) {
    this.#data = list
    this.notify()
  }

}

// Applying observer mixin to TodoList prototype
Object.assign(TodoList.prototype, observerMixin)
