import { useState } from 'react';
import './App.css'; 

function App() {
  const [inputText, setInputText] = useState('');
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
    setEditingText(todo.text);
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
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputText.trim() !== '') {
              const newTodo = {
                id: Date.now(),
                text: inputText,
                completed: false
              };
              setTodos([...todos, newTodo]);
              setInputText('');
            }
          }}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={handleCompleteAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`${todo.completed ? 'completed' : ''} ${
                editingId === todo.id ? 'editing' : ''
              }`}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label onDoubleClick={() => handleDoubleClick(todo)}>
                  {todo.text}
                </label>
                <button
                  className="destroy"
                  onClick={() => handleDelete(todo.id)}
                ></button>
              </div>
              {editingId === todo.id && (
                <input
                  className="edit"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  onBlur={() => {
                    setEditingId(null);
                    setEditingText('');
                  }}
                  autoFocus
                />
              )}
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoCounter}</strong> item{todoCounter !== 1 ? 's' : ''} left
        </span>
        <ul className="filters">
          <li>
            <button
              className={filter === 'all' ? 'selected' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={filter === 'active' ? 'selected' : ''}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={filter === 'completed' ? 'selected' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </li>
        </ul>
        <button className="clear-completed" onClick={() => setTodos([])}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
