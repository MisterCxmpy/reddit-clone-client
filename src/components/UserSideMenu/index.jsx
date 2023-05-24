import { forwardRef } from "react";
import styles from "./index.module.css"

const UserSideMenu = forwardRef(({ state }, ref) => {
  return state ? (
    <div ref={ref} className={styles["container"]}>
    </div>
  ) : null;
});

export default UserSideMenu;
