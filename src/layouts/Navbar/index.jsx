import React from 'react'
import styles from "./index.module.css"
import { Outlet } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <div className={styles["navbar"]}>
        <div className={styles["app-info"]}></div>
        <div className={styles["user-actions"]}></div>
        <div className={styles["quick-access"]}></div>
        <div className={styles["user-profile"]}></div>
      </div>
      <Outlet />
    </>
  )
}
