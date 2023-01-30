import {onMount, Show} from 'solid-js'
import {TodoList} from './TodoList'
import {createAppStore} from './store'

export function App() {
  const {store, deleteTodoItem, addTodoItem} = createAppStore()
  let inputRef: HTMLInputElement
  onMount(() => {
    inputRef.focus()
  })

  return (
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => {
            addTodoItem(e.currentTarget.value)
          }}
          ref={inputRef!}
          autofocus
        />
      </header>
      <Show when={store.todos.length}>
        <TodoList todos={store.todos} onDelete={deleteTodoItem} />
      </Show>
    </section>
  )
}
