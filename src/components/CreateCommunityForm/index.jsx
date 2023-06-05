import { useState } from "react";
import styles from "./index.module.css"

export default function CreateCommunityForm({ state, setState }) {

  return state ? (
    <div className={styles["overlay"]} style={state ? {display: "block"} : {display: "none"}}>
      <div className={styles["container"]}>
        <button onClick={setState} className={styles["close-btn"]}>&times;</button>
      </div>
    </div>
  ) : null;
}
