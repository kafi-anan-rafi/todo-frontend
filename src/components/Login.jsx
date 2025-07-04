import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Login successful!");
        setUser({ email: "", password: "" });
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred during login.");
      console.error(err);
    }
  };

  const colors = {
    primary: "#007bff",
    disabled: "#ccc",
    error: "red",
    success: "green",
    bg: "#fafafa",
    text: "#333",
  };

  const spacing = {
    radius: "8px",
    marginBottom: "0.8rem",
    padding: "0.6rem",
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "2rem",
      backgroundColor: colors.bg,
      border: `1px solid #ddd`,
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "1rem",
      color: colors.text,
    },
    label: {
      fontWeight: "bold",
      display: "block",
      marginBottom: "0.4rem",
    },
    input: {
      width: "100%",
      padding: spacing.padding,
      borderRadius: spacing.radius,
      border: "1px solid #ccc",
      fontSize: "1rem",
      marginBottom: spacing.marginBottom,
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "0.8rem",
      backgroundColor: colors.primary,
      color: "#fff",
      border: "none",
      borderRadius: spacing.radius,
      fontSize: "1rem",
      cursor: "pointer",
    },
    disabledButton: {
      backgroundColor: colors.disabled,
      cursor: "not-allowed",
    },
    error: {
      color: colors.error,
      textAlign: "center",
      marginBottom: "1rem",
    },
    success: {
      color: colors.success,
      textAlign: "center",
      marginBottom: "1rem",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <label htmlFor="email" style={styles.label}>
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={user.email}
        placeholder="example@gmail.com"
        onChange={handleChange}
        style={styles.input}
      />

      <label htmlFor="password" style={styles.label}>
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        placeholder="********"
        onChange={handleChange}
        style={styles.input}
      />

      <button
        type="submit"
        style={{
          ...styles.button,
          ...(loading ? styles.disabledButton : {}),
        }}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
