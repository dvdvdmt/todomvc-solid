import {ITodoItem} from './store'

interface IProps {
  todo: ITodoItem
  onDelete?: (id: number) => void
}

export function TodoItem(props: IProps) {
  function handleDelete() {
    props.onDelete?.(props.todo.id)
  }
  return (
    <li>
      <div class="view">
        <input type="checkbox" class="toggle" />
        <label>{props.todo.title}</label>
        <button class="destroy" onClick={handleDelete} />
      </div>
    </li>
  )
}
