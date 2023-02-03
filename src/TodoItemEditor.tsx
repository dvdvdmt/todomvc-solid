import {ITodoItem} from './store'
import {onMount} from 'solid-js'

interface IProps {
  todo: ITodoItem
  onSubmit?: (text: string, prevText: string) => void
  onBlur?: () => void
}

export function TodoItemEditor(props: IProps) {
  let inputRef: HTMLInputElement
  onMount(() => {
    inputRef.focus()
    inputRef.value = props.todo.title
  })
  return (
    <input
      ref={inputRef!}
      class="edit"
      value={props.todo.title} // sets the initial value of the input
      onChange={(e) => {
        props.onSubmit?.(e.currentTarget.value, props.todo.title)
      }}
      onBlur={() => {
        props.onBlur?.()
      }}
    />
  )
}
