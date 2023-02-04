import {ITodoItem} from './store'
import {TodoItemEditor} from './TodoItemEditor'
import {createSignal, Show} from 'solid-js'

interface IProps {
  todo: ITodoItem
  onDelete?: (id: number) => void
  onToggle?: (id: number, completed: boolean) => void
  onEdit?: (id: number, title: string) => void
}

export function TodoItem(props: IProps) {
  const [isEditorOpen, setIsEditorOpen] = createSignal(false)
  const closeEditor = () => setIsEditorOpen(false)
  const openEditor = () => setIsEditorOpen(true)
  return (
    <li classList={{completed: props.todo.completed, editing: isEditorOpen()}}>
      <Show
        when={!isEditorOpen()}
        fallback={
          <TodoItemEditor
            todo={props.todo}
            onBlur={closeEditor}
            onSubmit={(text, prevText) => {
              if (text.trim() === '') {
                props.onDelete?.(props.todo.id)
              } else if (text !== prevText) {
                props.onEdit?.(props.todo.id, text)
              }
              closeEditor()
            }}
          />
        }
      >
        <div class="view">
          <input
            type="checkbox"
            class="toggle"
            checked={props.todo.completed}
            onChange={(e) => {
              props.onToggle?.(props.todo.id, e.currentTarget.checked)
            }}
          />
          <label onDblClick={openEditor}>{props.todo.title}</label>
          <button
            class="destroy"
            onClick={() => {
              props.onDelete?.(props.todo.id)
            }}
          />
        </div>
      </Show>
    </li>
  )
}
