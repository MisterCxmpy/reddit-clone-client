import styles from "./index.module.css";

export default function LoginForm({ state }) {
  return state ? (
    <div className={styles["overlay"]} style={state ? {display: "block"} : {display: "none"}}>
      <div className={styles["container"]}>
        <h4>Log In</h4>
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
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
