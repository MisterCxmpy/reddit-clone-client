import styles from "./index.module.css";

export default function LoginForm({ state, setState }) {
  return state ? (
    <div className={styles["overlay"]} style={state ? {display: "block"} : {display: "none"}}>
      <div className={styles["container"]}>
        <button onClick={setState} className={styles["close-btn"]}>&times;</button>
        <h3>Log In</h3>
        <form className={styles["login-form"]}>
          <div className={styles["inputs"]}>
            <div className={styles["input-field"]}>
              <input type="text" required />
              <span>Username</span>
            </div>
            <div className={styles["input-field"]}>
              <input type="password" required />
              <span>Password</span>
            </div>
            <span className={styles["input-help"]}>Forgot your <a href="#">username</a> or <a href="#">password</a>?</span>
            <button className={styles["submit"]}>Log In</button>
            <span className={styles["input-help"]}>New to App Name? <a href="#">Sign Up</a></span>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
