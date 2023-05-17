import React, { useState } from "react";
import "./SignUp.css";
import { useSignup } from "../../hooks/useSignup";

function SignUp() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup();
 
  const addnewUserHandler = async (event) => {
    event.preventDefault();

    await signup(email, password)
  };

  return (
    <>
      <form onSubmit={addnewUserHandler}>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="E-posta"
        />
        <input
          id="password"
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Şifre"
        />
        <button disabled={isLoading} type="submit" className="signup-btn">Giriş</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}

export default SignUp;
