import styles from "./index.module.css"

export default function LoginForm() {
  return (
    <div className={styles["container"]}>
      <h4>Log In</h4>
      <form>
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
  )
}
