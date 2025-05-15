import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');




  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleDoubleClick = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text); // oder wie dein Textfeld heißt
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
      setEditingText('');
    }
  };


  const handleCompleteAll = () => {
  const updatedTodos = todos.map((todo) => ({
    ...todo,
    completed: true
  }));
  setTodos(updatedTodos);
};

  const todoCounter = todos.filter((todo) => !todo.completed).length;


  return (
    <>
      <h1>TODO-LIST</h1>
      <button onClick={handleCompleteAll}>V</button>

      <input type="text"
        value={inputText}
        placeholder="Was steht an?"
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
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={handleEditKeyDown}
                onBlur={() => {
                  setEditingId(null);
                  setEditingText('');
                }}
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => handleDoubleClick(todo)}
                style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'gray' : 'black', cursor: 'pointer'
            }}
              >
                {todo.text}
              </span>
            )}
           
            <button onClick={() => handleDelete(todo.id)}>x</button>

          </li>
        ))}
      </ul>



      <div>
        <button onClick={() => setFilter('all')}>Alle</button>
        <button onClick={() => setFilter('active')}>Offene</button>
        <button onClick={() => setFilter('completed')}>Erledigte</button>
      </div>

      <button onClick={() => setTodos([])}>Clear All</button>



      <p>Es sind noch {todoCounter} Todos Offen.</p>

    </>
  )
}

export default App
