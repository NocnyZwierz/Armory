import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from './AdminLogin.module.scss'

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Login nie może być pusty!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (!password.trim()) {
      toast.error("Hasło nie może być puste!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

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

      toast.success("Zalogowano pomyślnie!", {
        position: "top-center",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          onLoginSuccess();
          navigate("/admin-panel");
        },
      });
    } catch (err: any) {
      toast.error(err.message || "Wystąpił błąd podczas logowania", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className={style.adminLoginContainer}>
      <h2>Logowanie do panelu admina</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Wprowadź hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className={style.submitButton}>
          Zaloguj się
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
