import { useState } from 'react'
import './App.css'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Login from './components/Login';

const initialTodos = [
  {
    _id: 1,
    name: "Workout",
    details: "go to gym and workout for 30 min",
    isComplete: false
  },
  {
    _id: 2,
    name: "Study",
    details: "Study DSA for  1 Hour",
    isComplete: true
  },
  {
    _id: 3,
    name: "Coding",
    details: "Code for 30 min",
    isComplete: false
  },
]

function App() {
  const [todos, setTodos] = useState(initialTodos);
  function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
  return (
    <>
      <h1>{getGreeting()}, Kafi Anan!</h1>
      <AddTodo todos={todos} setTodos={setTodos}/>
      <Todos todos={todos} setTodos={setTodos} />
      {/* <Login /> */}
    </>
  )
}

export default App
