import React, { useState } from "react";
import style from "./Sidebar.module.css";
import { useNavigate, NavLink } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  return (
    <>
      <aside className={`${style.sidebar} ${collapsed ? style.collapsed : ""}`}>
        <div className={style.logoContainer}>
          <div className={style.sealEmblem}>🏛️</div>
          <h2 className={style.brandName}>
            PAPA <span className={style.goldText}>BARANGAY</span>
          </h2>
          <span className={style.govSubtag}>ADMIN PORTAL</span>
        </div>

        <nav className={style.navMenu}>
          <NavLink
            to="/AdminDashboard"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.link
            }
          >
            <svg
              className={style.svgIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
            <span className={style.linkText}>Dashboard</span>
          </NavLink>

          <NavLink
            to="/residents"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.link
            }
          >
            <svg
              className={style.svgIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className={style.linkText}>Residents Masterlist</span>
          </NavLink>

          <NavLink
            to="/RequestManagement"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.link
            }
          >
            <svg
              className={style.svgIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className={style.linkText}>Online Requests</span>
          </NavLink>

          <NavLink
            to="/Concern"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.link
            }
          >
            <svg
              className={style.svgIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className={style.linkText}>Incident Concerns</span>
          </NavLink>
        </nav>

        <div className={style.footer}>
          <div className={style.divider}></div>
          <button onClick={handleLogout} className={style.logoutBtn}>
            <svg
              className={style.svgIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className={style.linkText}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
