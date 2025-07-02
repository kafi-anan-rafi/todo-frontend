import { useState } from "react";

export default function AddTodo({ todos, setTodos }) {
  const [todo, setTodo] = useState({
    _id: 0,
    name: "",
    details: "",
    isComplete: false,
  });

  const inputStyle = {
    width: "300px",
    height: "36px",
    marginRight: "10px",
    padding: "6px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    fontSize: "16px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "15px 40px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.name.trim() === "") return;

    const lastTodo = todos[todos.length - 1];
    const newId = lastTodo ? lastTodo._id + 1 : 1;

    const newTodo = { ...todo, _id: newId };
    setTodos([...todos, newTodo]);

    setTodo({ _id: 0, name: "", details: "", isComplete: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "10px 0" }}>
      <input
        style={inputStyle}
        type="text"
        name="name"
        placeholder="Enter todo title..."
        value={todo.name}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        type="text"
        name="details"
        placeholder="Enter todo details (optional)..."
        value={todo.details}
        onChange={handleChange}
      />
      <input style={buttonStyle} type="submit" value="Add" />
    </form>
  );
}
