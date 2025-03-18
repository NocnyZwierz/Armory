import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin: username, password }),
      });

      if (!response.ok) {
        throw new Error("Błędne dane logowania");
      }

      const data = await response.json();
      
      if (!data.token) {
        throw new Error("Nieprawidłowa odpowiedź serwera");
      }

      localStorage.setItem("adminToken", data.token);

      onLoginSuccess();

      navigate("/admin-panel");
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas logowania");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Logowanie do panelu admina</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Wprowadź hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Zaloguj się
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
