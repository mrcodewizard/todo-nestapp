import logo from './logo.svg';
import './App.css';
import TodoForm from './todo/TodoForm';
import Login from './auth/Login';

function App() {
  return (
    <div className="App">
      <h3>Todo App</h3>
      <Login />
      <TodoForm />
    </div>
  );
}

export default App;
