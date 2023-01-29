/* @refresh reload */
import {render} from 'solid-js/web'
import 'todomvc-app-css/index.css'
import {App} from './App'

render(() => <App />, document.getElementById('root') as HTMLElement)
