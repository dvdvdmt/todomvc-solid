import {ITodoItem} from './store'

export function TodoItem(props: {todo: ITodoItem}) {
  console.log(props.todo)
  return <div>{props.todo.title}</div>
}
