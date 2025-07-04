import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user.name || !user.email || !user.password) {
      return setError("All fields are required.");
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Registration successful!");
        setUser({ name: "", email: "", password: "" });
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred during registration.");
      console.error(err);
    }
  };

  const colors = {
    primary: "#007bff",
    primaryDark: "#0056b3",
    background: "#fafafa",
    border: "#ddd",
    text: "#333",
    success: "green",
    error: "red",
    disabled: "#ccc",
  };

  const spacing = {
    inputPadding: "0.6rem",
    borderRadius: "8px",
    marginBottom: "0.5rem",
  };

  const styles = {
    form: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "2rem",
      border: `1px solid ${colors.border}`,
      borderRadius: "12px",
      backgroundColor: colors.background,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
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
      marginBottom: "0.5rem",
      marginTop: "1rem",
    },
    input: {
      width: "100%",
      padding: spacing.inputPadding,
      border: `1px solid #ccc`,
      borderRadius: spacing.borderRadius,
      boxSizing: "border-box",
      fontSize: "1rem",
      marginBottom: spacing.marginBottom,
    },
    button: {
      width: "100%",
      padding: "0.8rem",
      backgroundColor: colors.primary,
      color: "white",
      border: "none",
      borderRadius: spacing.borderRadius,
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "1rem",
      transition: "background-color 0.3s ease",
    },
    disabledButton: {
      backgroundColor: colors.disabled,
      cursor: "not-allowed",
    },
    error: {
      color: colors.error,
      marginBottom: "1rem",
      textAlign: "center",
    },
    success: {
      color: colors.success,
      marginBottom: "1rem",
      textAlign: "center",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Register</h2>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <label htmlFor="name" style={styles.label}>
        Full Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={user.name}
        placeholder="John Doe"
        onChange={handleChange}
        style={styles.input}
      />

      <label htmlFor="email" style={styles.label}>
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={user.email}
        placeholder="john@example.com"
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

      <input
        type="submit"
        value={loading ? "Registering..." : "Register"}
        disabled={loading}
        style={{
          ...styles.button,
          ...(loading ? styles.disabledButton : {}),
        }}
      />
    </form>
  );
}
