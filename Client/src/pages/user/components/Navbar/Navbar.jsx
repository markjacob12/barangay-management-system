import React, { useState } from "react";
import style from "./Navbar.module.css";
import Logo from "../../../../assets/Logo/Logo.png";
import { FaUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { replace, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const usernmae = localStorage.getItem("username");

  const navigate = useNavigate();

  const handleDropDown = () => {
    setDropDown(true);
  };
  const handleClose = () => {
    setDropDown(false);
  };
  const handleLagout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/", { replace: true });
  };
  return (
    <>
      <nav className={style["nav-bar"]}>
        <div className={style["logo"]}>
          <img src={Logo} />
        </div>
        <div className={style["icon"]}>
          <FaUser onClick={handleDropDown} />
        </div>
        {dropDown && (
          <div className={style.dropdown}>
            <ul className={style.dropdownMenu}>
              <div className={style.closeHeader}>
                <IoIosClose className={style.closeIcon} onClick={handleClose} />
              </div>

              <div className={style.profileSection}>
                <div className={style.logoWrapper}>
                  <img src={Logo} alt="Barangay Logo" />
                </div>
                <h3 className={style.profileName}>{usernmae}</h3>
                <span className={style.roleBadge}>Resident</span>
              </div>

              <hr className={style.divider} />

              <li className={style.menuItem}>
                <button className={style.logoutBtn} onClick={handleLagout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
