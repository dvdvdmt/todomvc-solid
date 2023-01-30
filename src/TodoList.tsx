import {ITodoItem} from './store'
import {For} from 'solid-js'
import {TodoItem} from './TodoItem'

interface IProps {
  todos: ITodoItem[]
  onDelete?: (id: number) => void
}

export function TodoList(props: IProps) {
  return (
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <For each={props.todos}>{(item) => <TodoItem todo={item} onDelete={props.onDelete} />}</For>
      </ul>
      <footer class="footer">
        <span class="todo-count"></span>
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
  )
}
