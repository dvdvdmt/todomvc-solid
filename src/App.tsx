import {Show} from 'solid-js'
import {store} from './store'
import {TodoList} from './TodoList'

export function App() {
  return (
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
      <Show when={store.todos.length}>
        <TodoList todos={store.todos} />
      </Show>
    </section>
  )
}
