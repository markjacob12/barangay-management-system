import React from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { MdComputer } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
const Sidebar = () => {
  const username = localStorage.getItem("username");
  return (
    <>
      <aside className={style.sidebar}>
        <div className={style.logoContainer}>
          <h2 className={style.brandName}>
            PAPA <span>BARANGAY</span>
          </h2>
        </div>
        <nav className={style["nav-bar"]}>
          <div className={style["user-section"]}>
            <div className={style["avatar-circle"]}>
              {username?.charAt(0).toUpperCase()}
            </div>
            <div className={style["username-info"]}>
              <span className={style["welcome-text"]}>Welcome,</span>
              <h3>{username}</h3>
            </div>
          </div>

          <hr className={style["divider"]} />

          <div className={style["nav-links"]}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <FaHouseUser />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/MyRequests"
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <MdComputer />
              <span>My Request</span>
            </NavLink>

            <NavLink
              to="/BarangayConcern"
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              <FaTriangleExclamation />
              <span>Barangay Concern</span>
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
