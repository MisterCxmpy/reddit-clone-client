import { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function LoginForm({ state, setState }) {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async e => {
    e.preventDefault()
    let payload = { username, password }

    try {
      await login(payload)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return state ? (
    <div className={styles["overlay"]} style={state ? {display: "block"} : {display: "none"}}>
      <div className={styles["container"]}>
        <button onClick={setState} className={styles["close-btn"]}>&times;</button>
        <h3>Log In</h3>
        <form onSubmit={submitForm} className={styles["login-form"]}>
          <div className={styles["inputs"]}>
            <div className={styles["input-field"]}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <span>Username</span>
            </div>
            <div className={styles["input-field"]}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span>Password</span>
            </div>
            <span className={styles["input-help"]}>Forgot your <a href="#">username</a> or <a href="#">password</a>?</span>
            <button type="submit" className={styles["submit"]}>Log In</button>
            <span className={styles["input-help"]}>New to App Name? <a href="#">Sign Up</a></span>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
