import React, { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email. Please enter a valid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "Your account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "User not found. Please check your email or sign up for an account.";
          break;
        case "auth/wrong-password":
          errorMessage =
            "Wrong password. Please check your password and try again.";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
          break;
      }
      setErrorMsg(errorMessage);
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  };

  return (
    <div className="login">
      <div className="login-logo">
        <div className="word-container">
          <div className="word-left">
            <div className="bu">BU</div>
            <div className="ra">RA</div>
          </div>
          <div className="word-right">
            <div className="me">ME</div>
            <div className="NG">NG</div>
          </div>
        </div>
      </div>
      <form onSubmit={handleLogin} action="POST">
        <input
          id="username"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="E-posta"
        />
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Şifre"
        />
        <a href="#">Şifre mi Unuttum?</a>
        <button type="submit" className="login-btn">
          Giriş
        </button>
        {errorMsg && <div className="error">{errorMsg}</div>}
      </form>
    </div>
  );
}

export default Login;
