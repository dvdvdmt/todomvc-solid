import {createEffect, For, onMount, Show} from 'solid-js'
import {createAppStore} from './store'
import {TodoItem} from './TodoItem'

export function App() {
  const {store, deleteTodoItem, addTodoItem, toggleAll, toggleItem} = createAppStore()
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
            addTodoItem(e.currentTarget.value.trim())
          }}
          ref={inputRef!}
          autofocus
        />
      </header>
      <Show when={store.todos.length}>
        <section class="main">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            onChange={(e) => {
              toggleAll(e.currentTarget.checked)
            }}
          />
          <label for="toggle-all">Mark all as complete</label>
          <ul class="todo-list">
            <For each={store.todos}>
              {(item) => <TodoItem todo={item} onDelete={deleteTodoItem} onToggle={toggleItem} />}
            </For>
          </ul>
          <footer class="footer">
            <span class="todo-count">{store.todos.length}</span>
            <ul class="filters">
              <li>
                <a href="#/" class="selected">
                  All
                </a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <button class="clear-completed">Clear completed</button>
          </footer>
        </section>
      </Show>
    </section>
  )
}
