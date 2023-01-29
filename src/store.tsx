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
