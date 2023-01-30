import {createStore} from 'solid-js/store'
import {ITodo} from '../src-old/app-model'

export interface ITodoItem {
  id: number
  completed: boolean
  title: string
}

interface IStore {
  todos: ITodoItem[]
}

const localStorageKey = 'todos'

function getTodosFromStorage(): ITodo[] {
  const json = localStorage.getItem(localStorageKey)
  if (!json) {
    return []
  }
  let result
  try {
    result = JSON.parse(json)
  } catch (e) {
    return []
  }
  if (!Array.isArray(result)) {
    return []
  }
  return result
}

export function createAppStore() {
  const storedTodos = getTodosFromStorage()
  const [store, setStore] = createStore<IStore>({
    todos: storedTodos,
    // todos: [{id: 1, completed: false, title: 'Todo 1'}],
  })
  return {store, setStore, deleteTodoItem, addTodoItem}

  function deleteTodoItem(id: number) {
    setStore('todos', (todos) => todos.filter((todo) => todo.id !== id))
    save()
  }

  function addTodoItem(title: string) {
    setStore('todos', (todos) => [...todos, {id: todos.length + 1, completed: false, title}])
    save()
  }

  function save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(store.todos))
  }
}
