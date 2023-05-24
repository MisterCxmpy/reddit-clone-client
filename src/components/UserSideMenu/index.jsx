import { forwardRef, useEffect, useState } from "react";
import styles from "./index.module.css";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";

const UserSideMenu = forwardRef(({ state }, ref) => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return state ? (
    <div ref={ref} className={styles["container"]}>
      <MyInfo />
      <div className={styles["divider"]}></div>
      <ViewOptions darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  ) : null;
});

export default UserSideMenu;

function MyInfo() {
  return (
    <div className={styles["section"]}>
      <span className={styles["title"]}>
        <div className={styles["title-icon"]}><BiUserCircle /></div> My Info
      </span>
      <button className={styles["option"]}>Profile</button>
      <button className={styles["option"]}>User Settings</button>
    </div>
  )
}

function ViewOptions({ darkMode, setDarkMode}) {
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={styles['section']}>
      <span className={styles['title']}>
        <div className={styles['title-icon']}><HiOutlineEye /></div> View Options
      </span>
      <button className={styles['option']} onClick={toggleDarkMode}>
        <span>Dark Mode</span>
        <button className={`${styles.switch} ${darkMode ? styles.on : styles.off}`}></button>
      </button>
    </div>
  );
}