import {ITodoItem} from './store'

interface IProps {
  todo: ITodoItem
  onDelete?: (id: number) => void
  onToggle?: (id: number, completed: boolean) => void
}

export function TodoItem(props: IProps) {
  function handleDelete() {
    props.onDelete?.(props.todo.id)
  }
  return (
    <li classList={{completed: props.todo.completed}}>
      <div class="view">
        <input
          type="checkbox"
          class="toggle"
          checked={props.todo.completed}
          onChange={(e) => {
            props.onToggle?.(props.todo.id, e.currentTarget.checked)
          }}
        />
        <label>{props.todo.title}</label>
        <button class="destroy" onClick={handleDelete} />
      </div>
    </li>
  )
}
