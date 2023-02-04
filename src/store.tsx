import {createStore} from 'solid-js/store'
import {createMemo} from 'solid-js'

export interface ITodoItem {
  id: string
  completed: boolean
  title: string
}

interface IStore {
  todos: ITodoItem[]
  filter: TodoFilter
}

export const enum TodoFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
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

function getFilterFromUrl(): TodoFilter {
  const hash = window.location.hash
  if (hash.endsWith(TodoFilter.Active)) {
    return TodoFilter.Active
  }
  if (hash.endsWith(TodoFilter.Completed)) {
    return TodoFilter.Completed
  }
  return TodoFilter.All
}

export function createAppStore() {
  const storedTodos = getTodosFromStorage()
  const filter = getFilterFromUrl()

  const [store, setStore] = createStore<IStore>({
    todos: storedTodos,
    filter,
  })

  window.addEventListener('popstate', () => {
    setStore('filter', getFilterFromUrl())
  })

  const deleteTodoItem = (id: string) => {
    setStore('todos', (todos) => todos.filter((todo) => todo.id !== id))
    save()
  }

  const addTodoItem = (title: string) => {
    setStore('todos', (todos) => [...todos, {id: Date.now().toString(10), completed: false, title}])
    save()
  }

  /**
   * Toggles all todos to the opposite of the current state.
   */
  const toggleAll = () => {
    setStore('todos', {}, {completed: !isAllComplete()})
    save()
  }

  /**
   * Toggles a single todo item.
   */
  const toggleItem = (id: string, completed: boolean) => {
    setStore('todos', (todo) => todo.id === id, {completed})
    save()
  }

  const save = () => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(store.todos))
  }

  const editTodoItem = (id: string, title: string) => {
    setStore('todos', (todo) => todo.id === id, {title})
    save()
  }

  const removeCompleted = () => {
    setStore('todos', (todos) => todos.filter((todo) => !todo.completed))
    save()
  }

  const isAllComplete = createMemo(() => store.todos.every((todo) => todo.completed))

  const isSomeComplete = createMemo(() => store.todos.some((todo) => todo.completed))

  const isFilterSelected = (filter: TodoFilter) => store.filter === filter

  const filteredTodos = createMemo(() => {
    switch (store.filter) {
      case TodoFilter.Active:
        return store.todos.filter((todo) => !todo.completed)
      case TodoFilter.Completed:
        return store.todos.filter((todo) => todo.completed)
      default:
        return store.todos
    }
  })

  return {
    addTodoItem,
    deleteTodoItem,
    editTodoItem,
    filteredTodos,
    isAllComplete,
    isFilterSelected,
    isSomeComplete,
    removeCompleted,
    store,
    toggleAll,
    toggleItem,
  }
}
