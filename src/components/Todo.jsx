export default function Todo({ todo, setTodos }) {
  const handleChange = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t._id === todo._id ? { ...t, isComplete: !t.isComplete } : t
      )
    );
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todo._id));
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    backgroundColor: "#fdfdfd",
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const checkboxStyle = {
    cursor: "pointer",
    width: "18px",
    height: "18px",
  };

  const nameStyle = {
    textDecoration: todo.isComplete ? "line-through" : "none",
  };

  const detailStyle = {
    fontStyle: "italic",
    fontSize: "0.9em",
    color: "#666",
  };

  const buttonStyle = {
    cursor: "pointer",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={todo.isComplete}
          style={checkboxStyle}
        />
        <div>
          <div style={nameStyle}>{todo.name}</div>
          <div style={detailStyle}>{todo.details}</div>
        </div>
      </div>
      <button onClick={handleDelete} style={buttonStyle}>
        Delete
      </button>
    </div>
  );    
}
