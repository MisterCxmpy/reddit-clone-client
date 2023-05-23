import React from "react";
import styles from "./index.module.css";
import { Outlet } from "react-router-dom";
import { MdStars, MdNotificationsNone } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Filter from "../Filter";
import { useAuth } from "../../contexts/authContext";

export default function Navbar() {
  const user = useAuth();

  return (
    <>
      <div className={styles["navbar"]}>
        <AppInfo />
        <UserActions />
        <QuickAccess />
        <UserProfile user={user} />
      </div>
      <div className={styles["filter"]}>
        <Filter />
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
        <option value="Home">Home</option>
      </select>
      <form className={styles["search-bar"]}>
        <AiOutlineSearch />
        <input type="text" placeholder="Search For Anything" />
      </form>
    </div>
  );
}

function QuickAccessButton({ icon }) {
  return <button className={styles["quick-access-btn"]}>{icon}</button>;
}

function QuickAccess() {
  return (
    <div className={styles["quick-access"]}>
      <QuickAccessButton icon={<MdStars />} />
      <QuickAccessButton icon={<BsChatDots />} />
      <QuickAccessButton icon={<MdNotificationsNone />} />
      <QuickAccessButton icon={<IoMdAdd />} />
    </div>
  );
}

function UserProfile({ user }) {
  return (
    <div className={styles["user-profile"]} style={user ? {justifyContent: "start"} : {justifyContent: "end"}}>
      {user ? (
        <>
          <button className={styles["dropdown"]}>▼</button>
          <div className={styles["user-info"]}>
            <span>Username</span>
            <span>Username</span>
          </div>
          <div className={styles["profile-picture"]}></div>
        </>
      ) : (
        <div className={styles["login-signup-options"]}>
          <button className={styles["signup-btn"]}>Sign Up</button>
          <button className={styles["login-btn"]}>Log In</button>
        </div>
      )}
    </div>
  );
}
