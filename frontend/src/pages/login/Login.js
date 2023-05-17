import React, { useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin()

  const addUserHandler = async (event) => {
    event.preventDefault();

    await login(email, password)
  }

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
      <form onSubmit={addUserHandler} action="POST">
            <input id="username" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="E-posta"/>
            <input id="password" onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder="Şifre"/>
            <a href="#">Şifre mi Unuttum?</a>
            <button disabled={isLoading} type="submit" className="login-btn">Giriş</button>
            {error && <div className="error">{error}</div>}
      </form>

    </div>
  );
}

export default Login;
