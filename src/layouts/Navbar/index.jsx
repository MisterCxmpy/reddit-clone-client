import React from "react";
import styles from "./index.module.css";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className={styles["navbar"]}>
        <AppInfo />
        <UserActions />
        <QuickAccess />
        <UserProfile />
      </div>
      <Outlet />
    </>
  );
}

function AppInfo() {
  return (
    <div className={styles["app-info"]}>
      <div className={styles["logo"]}></div>
      <span className={styles["title"]}>App Name</span>
    </div>
  );
}

function UserActions() {
  return (
    <div className={styles["user-actions"]}>
      <select className={styles["your-communities"]}>
        <option value="Your Communities">Your Communities</option>
      </select>
      <form className={styles["search-bar"]}>
        <input type="text" placeholder="Search For Anything" />
      </form>
    </div>
  );
}

function QuickAccessButton() {
  return <button className={styles["quick-access-btn"]}></button>;
}

function QuickAccess() {
  return (
    <div className={styles["quick-access"]}>
      <QuickAccessButton />
      <QuickAccessButton />
      <QuickAccessButton />
      <QuickAccessButton />
    </div>
  );
}

function UserProfile() {
  return (
    <div className={styles["user-profile"]}>
      <div className={styles["profile-picture"]}></div>
    </div>
  );
}