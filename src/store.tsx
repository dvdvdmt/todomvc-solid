import {createStore} from 'solid-js/store'
import {createMemo} from 'solid-js'

export interface ITodoItem {
  id: string
  completed: boolean
  title: string
}

interface IStore {
  todos: ITodoItem[]
}

const localStorageKey = 'todos'

function getTodosFromStorage(): ITodoItem[] {
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
  const isAllComplete = createMemo(() => store.todos.every((todo) => todo.completed))
  return {
    addTodoItem,
    deleteTodoItem,
    editTodoItem,
    isAllComplete,
    removeCompleted,
    setStore,
    store,
    toggleAll,
    toggleItem,
  }

  function deleteTodoItem(id: string) {
    setStore('todos', (todos) => todos.filter((todo) => todo.id !== id))
    save()
  }

  function addTodoItem(title: string) {
    setStore('todos', (todos) => [...todos, {id: Date.now().toString(10), completed: false, title}])
    save()
  }

  /**
   * Toggles all todos to the opposite of the current state.
   */
  function toggleAll() {
    setStore('todos', {}, {completed: !isAllComplete()})
    save()
  }

  /**
   * Toggles a single todo item.
   */
  function toggleItem(id: string, completed: boolean) {
    setStore('todos', (todo) => todo.id === id, {completed})
    save()
  }

  function save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(store.todos))
  }

  function editTodoItem(id: string, title: string) {
    setStore('todos', (todo) => todo.id === id, {title})
    save()
  }

  function removeCompleted() {
    setStore('todos', (todos) => todos.filter((todo) => !todo.completed))
    save()
  }
}
