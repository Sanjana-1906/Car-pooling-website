import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../config/firebase-configuration";
import './Login.css';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/home");
        } else {
          setErr("User not authenticated");
        }
      });
    } catch (error) {
      console.error(error);
      setErr("Failed to log in. Please check your email and password.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setErr("Failed to sign in with Google.");
    }
  };

  return (
    <div className="bro">
      <Header />
      <div className="login mx-auto m-5">
        <h1>Login</h1>
        <form className="mx-auto w-50 text-center" onSubmit={handleLogin}>
          <div className="input-box mx-auto">
            <input
              type="email"
              value={email}
              className="form-control"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box mx-auto">
            <input
              type="password"
              value={password}
              className="form-control"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn">Login</button>
          <div className="google">
            <p className="mx-auto text-center">or</p>
            <button className="btn  btn-primary p-2" onClick={signInWithGoogle}>
              <img className="gimg1 px-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJa5buc9fiulK6yl0O4o9WGa3FLrEINhyxcw&s"></img>Sign in with Google</button></div>
          <div>
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/signUp")}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
