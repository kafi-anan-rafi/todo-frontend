import Todo from './Todo';

export default function Todos({ todos, setTodos }) {
  const incompleteTodos = todos.filter((todo) => !todo.isComplete);
  const completeTodos = todos.filter((todo) => todo.isComplete);

  return (
    <div style={{ marginTop: "20px" }}>
      <section style={{ marginBottom: "20px" }}>
        <strong style={{ display: "block", marginBottom: "10px" }}>
          Incomplete Todos:
        </strong>
        {incompleteTodos.length > 0 ? (
          incompleteTodos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))
        ) : (
          <p style={{ color: "gray" }}>😄 No incomplete todos.</p>
        )}
      </section>

      <section>
        <strong style={{ display: "block", marginBottom: "10px" }}>
          Completed Todos:
        </strong>
        {completeTodos.length > 0 ? (
          completeTodos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))
        ) : (
          <p style={{ color: "gray" }}>😞 No completed todos.</p>
        )}
      </section>
    </div>
  );
}
