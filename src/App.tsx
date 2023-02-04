import {For, onMount, Show} from 'solid-js'
import {createAppStore, TodoFilter} from './store'
import {TodoItem} from './TodoItem'

export function App() {
  const {
    addTodoItem,
    deleteTodoItem,
    editTodoItem,
    filteredTodos,
    isAllComplete,
    isSomeComplete,
    isFilterSelected,
    removeCompleted,
    store,
    toggleAll,
    toggleItem,
  } = createAppStore()
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
            e.currentTarget.value = ''
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
            onChange={toggleAll}
            checked={isAllComplete()}
          />
          <label for="toggle-all">Mark all as complete</label>
          <ul class="todo-list">
            <For each={filteredTodos()}>
              {(item) => (
                <TodoItem
                  todo={item}
                  onDelete={deleteTodoItem}
                  onToggle={toggleItem}
                  onEdit={editTodoItem}
                />
              )}
            </For>
          </ul>
          <footer class="footer">
            <span class="todo-count">{store.todos.length}</span>
            <ul class="filters">
              <li>
                <a href="#/" classList={{selected: isFilterSelected(TodoFilter.All)}}>
                  All
                </a>
              </li>
              <li>
                <a href="#/active" classList={{selected: isFilterSelected(TodoFilter.Active)}}>
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  classList={{selected: isFilterSelected(TodoFilter.Completed)}}
                >
                  Completed
                </a>
              </li>
            </ul>
            <Show when={isSomeComplete()}>
              <button class="clear-completed" onClick={removeCompleted}>
                Clear completed
              </button>
            </Show>
          </footer>
        </section>
      </Show>
    </section>
  )
}
