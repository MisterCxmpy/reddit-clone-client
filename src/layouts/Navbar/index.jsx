import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { MdStars, MdNotificationsNone } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuth } from "../../contexts/authContext";
import LoginForm from "../../components/LoginForm";
import UserSideMenu from "../../components/UserSideMenu";
import { useCommunity } from "../../contexts/communityContext";
import useUpperCase from "../../hooks/useUpperCase";

export default function Navbar() {
  const { user } = useAuth();
  const { GetDefaultCommunities, defaultCommunities } = useCommunity();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetDefaultCommunities();
    setLoading(false);
  }, []);

  return (
    <>
      <div className={styles["navbar"]}>
        <AppInfo />
        <UserActions
          defaultCommunities={defaultCommunities}
          loading={loading}
        />
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

function UserActions({ defaultCommunities, loading }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(
    localStorage.getItem("id")[0].toUpperCase() +
      localStorage.getItem("id").slice(1).toLowerCase()
  );
  const dropdownRef = useRef();

  const toggleDropdown = (event) => {
    if (!event.target.closest(`.${styles["dropdown"]}`)) {
      setShowDropdown((prevShowDropdown) => !prevShowDropdown);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest(`.${styles["select"]}`)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["user-actions"]}>
      <button onClick={toggleDropdown} className={styles["select"]}>
        <span className={styles["outer-span"]}>
          <span>
            <span>
              <span className={styles["current-title"]}>{activeDropdown}</span>
              <div
                ref={dropdownRef}
                className={styles["dropdown"]}
                style={{ display: showDropdown ? "block" : "none" }}
              >
                {!loading && defaultCommunities.length ? (
                  <>
                    <Section
                      title="Default Communities"
                      options={defaultCommunities}
                      setShowDropdown={setShowDropdown}
                      setActiveDropdown={setActiveDropdown}
                    />
                    {/* <Section title="Your Communities" options="Gaming" setShowDropdown={setShowDropdown} setActiveDropdown={setActiveDropdown} />; */}
                    ;
                  </>
                ) : null}
              </div>
            </span>
          </span>
          <div className={styles["dropdown-icon"]} />
        </span>
      </button>
      <form className={styles["search-bar"]}>
        <AiOutlineSearch />
        <input type="text" placeholder="Search For Anything" />
      </form>
    </div>
  );
}

function Section({ title, options, setShowDropdown, setActiveDropdown }) {
  const changeActive = (option) => {
    setActiveDropdown(option);
    setShowDropdown(false);
    localStorage.setItem("active", option);
  };

  return (
    <div className={styles["section"]}>
      <span className={styles["title"]}>{title}</span>
      {options.map((option) => (
        <span
          key={option.community_id}
          onClick={() => {
            changeActive(useUpperCase(option.community_name));
          }}
          className={styles["option"]}
        >
          <NavLink to={`/c/${option.community_name}`}>{useUpperCase(option.community_name)}</NavLink>
        </span>
      ))}
    </div>
  );
}

function QuickAccessButton({ icon }) {
  return <button className={styles["quick-access-btn"]}>{icon}</button>;
}

function QuickAccess() {
  const quickAccessButtons = [
    { icon: <MdStars /> },
    { icon: <BsChatDots /> },
    { icon: <MdNotificationsNone /> },
    { icon: <IoMdAdd /> },
  ];

  return (
    <div className={styles["quick-access"]}>
      {quickAccessButtons.map((button, index) => (
        <QuickAccessButton key={index} icon={button.icon} />
      ))}
    </div>
  );
}

function UserProfile({ user }) {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);

    if (!showLogin) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  const disableScroll = () => {
    document.body.classList.add("no-scroll");
  };

  const enableScroll = () => {
    document.body.classList.remove("no-scroll");
  };

  return (
    <div
      className={styles["user-profile"]}
      style={{ justifyContent: user ? "start" : "end" }}
    >
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
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setShowUserMenu((prevShowUserMenu) => !prevShowUserMenu);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target !== menuRef.current.previousSibling &&
      !event.target.closest(`.${styles["user-dropdown"]}`)
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
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={styles["user-dropdown"]}
      >
        <span className={styles["outer-span"]}>
          <span>
            <div className={styles["profile-picture"]}></div>
            <span className={styles["user-stats"]}>
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
      <button onClick={toggleLogin} className={styles["login-btn"]}>
        Log In
      </button>
      <LoginForm state={showLogin} setState={toggleLogin} />
    </div>
  );
}
