import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Outlet } from "react-router-dom";
import { MdStars, MdNotificationsNone } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Filter from "../Filter";
import { useAuth } from "../../contexts/authContext";
import LoginForm from "../../components/LoginForm";
import UserSideMenu from "../../components/UserSideMenu";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <>
      <div className={styles["navbar"]}>
        <AppInfo />
        <UserActions />
        <QuickAccess />
        <UserProfile user={user} />
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
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);

    if (!showLogin) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  const disableScroll = () => {
    document.body.classList.add('no-scroll');
  };

  const enableScroll = () => {
    document.body.classList.remove('no-scroll');
  };

  return (
    <div className={styles["user-profile"]} style={user ? {justifyContent: "start"} : {justifyContent: "end"}}>
      {user ? (
        <UserInfo user={user} />
      ) : (
        <LoginSignupOptions showLogin={showLogin} toggleLogin={toggleLogin} />
      )}
    </div>
  );
}

function UserInfo({ user }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target !== menuRef.current.previousSibling
    ) {
      setShowUserMenu(false);
    }
  };
  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["user-info"]}>
      <button onClick={toggleMenu} className={styles["user-dropdown"]}>
        <span className={styles["outer-span"]}>
          <span>
            <div className={styles["profile-picture"]}></div>
            <span>
              <span>{user.username}</span>
              <span>{user.score} Score</span>
            </span>
          </span>
          <div className={styles["dropdown-icon"]} />
        </span>
      </button>
      <UserSideMenu state={showUserMenu} ref={menuRef} />
    </div>
  );
}

function LoginSignupOptions({ showLogin, toggleLogin }) {
  return (
    <div className={styles["login-signup-options"]}>
      <button className={styles["signup-btn"]}>Sign Up</button>
      <button onClick={toggleLogin} className={styles["login-btn"]}>Log In</button>
      <LoginForm state={showLogin} setState={toggleLogin} />
    </div>
  );
}