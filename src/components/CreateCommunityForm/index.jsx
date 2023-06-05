import { useState } from "react";
import styles from "./index.module.css"

export default function CreateCommunityForm({ state, setState }) {

  const [name, setName] = useState()

  return state ? (
    <div className={styles["overlay"]} style={state ? {display: "block"} : {display: "none"}}>
      <div className={styles["container"]}>
        <button onClick={setState} className={styles["close-btn"]}>&times;</button>
        <h3>Create community</h3>
        <div className={styles["divider"]}></div>
        <div className={styles["form"]}>
          <form>
            <div className={styles["inputs"]}>
              <div className={styles["input-field"]}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <span className={styles["community-tag"]}>c/</span>
                <span>Community Name</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
