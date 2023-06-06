import { useRef, useState } from "react";
import styles from "./index.module.css"

export default function CreateCommunityForm({ state, setState }) {

  const formRef = useRef()

  const [name, setName] = useState("")
  const [summary, setSummary] = useState("")

  const exit = () => {
    setName("")
    setSummary("")
    
    setState()
  }

  return state ? (
    <div className={styles["overlay"]} style={state ? {display: "block"} : {display: "none"}}>
      <div className={styles["container"]}>
        <button onClick={exit} className={styles["close-btn"]}>&times;</button>
        <h3>Create community</h3>
        <div className={styles["divider"]}></div>
        <div className={styles["form"]}>
          <form ref={formRef}>
            <div className={styles["inputs"]}>
              <div className={`${styles["input-field"]} ${styles["community-name-field"]}`}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={22} required />
                <span>Community Name</span>
                <span className={styles["community-tag"]}>c/</span>
                <span className={styles["character-count"]}>{22 - name.length} Characters remaining</span>
              </div>
              <div className={`${styles["input-field"]} ${styles["community-summary-field"]}`}>
                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required />
                <span>Community Summary</span>
              </div>
              <div className={`${styles["input-field"]} ${styles["community-summary-field"]}`}>
                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required />
                <span>Community Rules</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
