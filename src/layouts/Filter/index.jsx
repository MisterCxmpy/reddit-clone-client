import { BsFillFilterSquareFill } from "react-icons/bs"
import { RiLayout2Fill } from "react-icons/ri"
import styles from "./index.module.css"

export default function Filter() {
  return (
    <div className={styles["filter"]}>
      <div className={styles["tags"]}>
        <div className={styles["tag"]}>Gaming</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
        <div className={styles["tag"]}>Something</div>
      </div>
      <div className={styles["filter-options"]}>
        <RiLayout2Fill />
        <select className={styles["menu-btn"]}>
          <option value="Card">Card</option>
        </select>
        <BsFillFilterSquareFill />
        <select className={styles["filters"]}>
          <option value="New Posts">New Posts</option>
        </select>
      </div>
    </div>
  )
}
