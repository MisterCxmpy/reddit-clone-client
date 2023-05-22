import styles from "./index.module.css"
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb"

export default function Content() {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["posts"]}>
          <div className={styles["post"]}>
            <div className={styles["votes"]}>
              <button><TbArrowBigUp /></button>
              <span>0</span>
              <button><TbArrowBigDown /></button>
            </div>
            <div className={styles["post-content"]}>
              <div className={styles["post-author"]}>
                <div className={styles["community-picture"]}></div>
                <span className={styles["community-name"]}>c/Gaming</span>
                <span style={{color: "#424242"}}>•</span>
                <span className={styles["author"]}>Posted by u/awesomeuser123 19 hours ago</span>
              </div>
              <div className={styles["post-message"]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor tempora delectus odit, veritatis eius facere, nemo reprehenderit temporibus dolorem officiis repudiandae enim corporis. Ea praesentium obcaecati repudiandae eveniet sint saepe?
              </div>
              <div className={styles["post-actions"]}>Posted by u/awesomeuser123 19 hours ago</div>
              
            </div>
          </div>
        </div>
        <div className={styles["community-summary"]}></div>
      </div>
    </div>
  )
}
