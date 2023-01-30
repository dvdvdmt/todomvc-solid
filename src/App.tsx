import {onMount, Show} from 'solid-js'
import {addTodoItem, deleteTodoItem, store} from './store'
import {TodoList} from './TodoList'

export function App() {
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
