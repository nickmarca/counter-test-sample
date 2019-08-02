/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useState } from 'react';

const containerCss = css`
  display: flex;
  width: 100vw;
  background: #fcf8eb;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const todosList = css`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [message, setMessage] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const todo = {
      message,
      id: todos.length + 1,
      completed: false,
    };

    setTodos([todo, ...todos]);
    setMessage('');
  };

  const changeTodoStatus = (index) => {
    const t = todos[index];
    todos[index] = {...t, completed: !t.completed};
    setTodos(todos.slice());
  };

  return (
    <div css={containerCss}>
      <div>
      <div css={todosList}>
        {todos.map((t, i) => (
          <div key={`id-${t.id}`} id={`id-${t.id}`}>{t.message} - {t.completed ? 'completed' : ' uncompleted'} <button id={`todo-button-${t.id}`} onClick={() => changeTodoStatus(i)}> {t.completed ? 'uncomplete' : ' complete'} </button> </div>
        ))}
      </div>

      <input type="text" value={message} onChange={({ target }) => setMessage(target.value)} />

      <button id="c1" onClick={addTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
