import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from "../redux/todoSlice";

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the action to create a new TODO item
    dispatch(createTodo({ id: 1, info: todoText }));

    // Clear the input field
    setTodoText('');
  };

  return (
    <div>
      <h2>Add a New TODO</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your TODO"
          value={todoText}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TodoForm;