import {createStore} from 'solid-js/store'

export interface ITodoItem {
  id: number
  completed: boolean
  title: string
}

interface IStore {
  todos: ITodoItem[]
}

const [store, setStore] = createStore<IStore>({
  // todos: [],
  todos: [{id: 1, completed: false, title: 'Todo 1'}],
})

export {store, setStore}

export function deleteTodoItem(id: number) {
  setStore('todos', (todos) => todos.filter((todo) => todo.id !== id))
}

export function addTodoItem(title: string) {
  setStore('todos', (todos) => [...todos, {id: todos.length + 1, completed: false, title}])
}
