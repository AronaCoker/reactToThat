import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([]);


  return (
    <>
      <h1>TODO-LIST</h1>
      <input type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && inputText.trim() !== '') {
            const newTodo = {
              id: Date.now(),
              text: inputText,
              completed: false
            }
            setTodos([...todos, newTodo])
            setInputText('')
          }
        }}

      />



      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={() => setTodos([])}>Clear All</button>
    </>
  )
}

export default App
